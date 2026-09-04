import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import {
  ShieldAlert,
  LayoutDashboard,
  Award,
  BookOpen,
  Scale,
  FolderKanban,
  Users,
  ShieldCheck,
  History,
  ArrowLeft
} from 'lucide-react';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  if (session.roleType !== 'SUPER_ADMIN' && session.roleType !== 'LEGAL_ADMIN') {
    redirect('/dashboard?error=unauthorized');
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Barra Superior Administrativa */}
      <div className="bg-slate-900 text-white border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-900 flex items-center justify-center font-bold">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <span className="font-serif font-bold text-sm text-white">Legal RD — Panel Administrativo</span>
            <span className="block text-[10px] text-amber-400">
              Sesión activa: {session.fullName} ({session.roleType})
            </span>
          </div>
        </div>

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al Workspace</span>
        </Link>
      </div>

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Administrativo */}
        <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-4 space-y-6">
          <div>
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-3">
              Gestión Jurídica
            </h4>
            <nav className="space-y-1">
              <Link
                href="/admin"
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4 text-slate-400" />
                <span>Dashboard Admin</span>
              </Link>
              <Link
                href="/admin/especialidades"
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                <Award className="w-4 h-4 text-slate-400" />
                <span>Especialidades (19)</span>
              </Link>
              <Link
                href="/admin/normas"
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                <BookOpen className="w-4 h-4 text-slate-400" />
                <span>Códigos y Leyes</span>
              </Link>
              <Link
                href="/admin/jurisprudencia"
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                <Scale className="w-4 h-4 text-slate-400" />
                <span>Jurisprudencia</span>
              </Link>
              <Link
                href="/admin/procedimientos"
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                <FolderKanban className="w-4 h-4 text-slate-400" />
                <span>Procedimientos</span>
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-3">
              Control & Auditoría
            </h4>
            <nav className="space-y-1">
              <Link
                href="/admin/usuarios"
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                <Users className="w-4 h-4 text-slate-400" />
                <span>Usuarios & Roles</span>
              </Link>
              <Link
                href="/admin/auditoria"
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                <History className="w-4 h-4 text-slate-400" />
                <span>Logs de Auditoría</span>
              </Link>
            </nav>
          </div>
        </aside>

        {/* Contenido Principal */}
        <main className="flex-1 p-6 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
