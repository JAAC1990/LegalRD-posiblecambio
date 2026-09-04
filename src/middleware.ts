import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(
  process.env.AUTH_SECRET || 'legal_rd_super_secret_jwt_key_2026_dominican_republic'
);

const PROTECTED_USER_ROUTES = ['/dashboard', '/favoritos', '/notas', '/carpetas', '/estudiante', '/perfil'];
const ADMIN_ROUTES = ['/admin'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('legalrd_session')?.value;

  let sessionUser: { roleType: string; id: string; email: string } | null = null;

  if (token) {
    try {
      const { payload } = await jwtVerify(token, SECRET_KEY);
      sessionUser = {
        id: payload.id as string,
        email: payload.email as string,
        roleType: payload.roleType as string,
      };
    } catch {
      sessionUser = null;
    }
  }

  // 1. Si ya está logueado e intenta entrar a login o registro -> enviar a dashboard
  if (sessionUser && (pathname === '/login' || pathname === '/registro')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 2. Proteger rutas de usuario (/dashboard, /favoritos, etc.)
  const isProtectedUser = PROTECTED_USER_ROUTES.some((route) => pathname.startsWith(route));
  if (isProtectedUser && !sessionUser) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Proteger rutas de administración (/admin)
  const isAdminRoute = ADMIN_ROUTES.some((route) => pathname.startsWith(route));
  if (isAdminRoute) {
    if (!sessionUser) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (sessionUser.roleType !== 'SUPER_ADMIN' && sessionUser.roleType !== 'LEGAL_ADMIN') {
      // Usuario autenticado pero sin rol administrativo
      return NextResponse.redirect(new URL('/dashboard?error=unauthorized', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/favoritos/:path*',
    '/notas/:path*',
    '/carpetas/:path*',
    '/estudiante/:path*',
    '/perfil/:path*',
    '/admin/:path*',
    '/login',
    '/registro',
  ],
};
