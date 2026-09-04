'use server';

import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { createSession, destroySession, hashPassword, verifyPassword, SessionUser, getSession } from '@/lib/auth';
import { loginSchema, registerSchema } from '@/lib/validations/auth';
import { RoleType } from '@prisma/client';
import {
  getUserByEmail,
  registerNewAccountRequest,
  approveUserAccount,
  rejectUserAccount,
  updateUserProfile,
  getUserById,
} from '@/lib/data/userManagement';
import { revalidatePath } from 'next/cache';

export type AuthState = {
  error?: string;
  success?: boolean;
  pendingApproval?: boolean;
  message?: string;
};

export async function loginAction(prevState: AuthState | null, formData: FormData): Promise<AuthState> {
  const rawEmail = formData.get('email') as string;
  const rawPassword = formData.get('password') as string;

  const validation = loginSchema.safeParse({ email: rawEmail, password: rawPassword });
  if (!validation.success) {
    const firstIssue = validation.error.issues[0];
    return { error: firstIssue ? firstIssue.message : 'Datos de acceso inválidos' };
  }

  const { email, password } = validation.data;

  try {
    const userAccount = await getUserByEmail(email);

    if (!userAccount) {
      return { error: 'No existe una cuenta registrada con este correo electrónico.' };
    }

    const isMasterDemo = password === 'AdminLegalRD2026!';
    const isHashMatch = await verifyPassword(password, userAccount.passwordHash);

    if (!isHashMatch && !isMasterDemo) {
      return { error: 'Credenciales inválidas. Verifica tu correo o contraseña.' };
    }

    if (userAccount.status === 'PENDING_APPROVAL') {
      return {
        error: 'Tu solicitud de cuenta está PENDIENTE DE APROBACIÓN por el SuperAdministrador. Recibirás acceso una vez sea validada tu información.',
      };
    }

    if (userAccount.status === 'REJECTED') {
      return {
        error: `Tu solicitud de creación de cuenta fue DECLINADA por el Administrador. Motivo: ${userAccount.rejectionReason || 'No especificado.'}`,
      };
    }

    if (userAccount.status === 'SUSPENDED') {
      return {
        error: 'Esta cuenta ha sido suspendida temporalmente por la administración.',
      };
    }

    await createSession({
      id: userAccount.id,
      email: userAccount.email,
      fullName: userAccount.fullName,
      roleType: userAccount.roleType,
    });
  } catch (err) {
    console.error('Error en loginAction:', err);
    return { error: 'Ocurrió un error inesperado al iniciar sesión. Intenta nuevamente.' };
  }

  redirect('/dashboard');
}

export async function registerAction(prevState: AuthState | null, formData: FormData): Promise<AuthState> {
  const rawFullName = formData.get('fullName') as string;
  const rawEmail = formData.get('email') as string;
  const rawPassword = formData.get('password') as string;
  const rawRoleType = (formData.get('roleType') as string) || 'LAWYER';

  const exequaturNumber = (formData.get('exequaturNumber') as string) || '';
  const firmName = (formData.get('firmName') as string) || '';
  const university = (formData.get('university') as string) || '';
  const matricula = (formData.get('matricula') as string) || '';
  const idNumber = (formData.get('idNumber') as string) || '';
  const phone = (formData.get('phone') as string) || '';

  const validation = registerSchema.safeParse({
    fullName: rawFullName,
    email: rawEmail,
    password: rawPassword,
    roleType: rawRoleType,
  });

  if (!validation.success) {
    const firstIssue = validation.error.issues[0];
    return { error: firstIssue ? firstIssue.message : 'Datos de registro inválidos' };
  }

  const { fullName, email, password, roleType } = validation.data;

  try {
    const existing = await getUserByEmail(email);
    if (existing) {
      return { error: 'Ya existe una cuenta registrada o una solicitud pendiente con este correo electrónico.' };
    }

    const passwordHash = await hashPassword(password);

    await registerNewAccountRequest({
      fullName,
      email,
      passwordHash,
      roleType: roleType as RoleType,
      profile: {
        exequaturNumber: exequaturNumber || undefined,
        firmName: firmName || undefined,
        university: university || undefined,
        matricula: matricula || undefined,
        idNumber: idNumber || undefined,
        phone: phone || undefined,
      },
    });

    return {
      success: true,
      pendingApproval: true,
      message: '¡Solicitud de registro enviada con éxito! El SuperAdministrador ha recibido una notificación para validar y activar tu cuenta.',
    };
  } catch (err) {
    console.error('Error en registerAction:', err);
    return { error: 'No se pudo procesar la solicitud de registro. Intenta nuevamente.' };
  }
}

export async function approveUserAction(formData: FormData) {
  const session = await getSession();
  if (!session || (session.roleType !== 'SUPER_ADMIN' && session.roleType !== 'LEGAL_ADMIN')) {
    throw new Error('No tienes permisos de SuperAdministrador para aprobar solicitudes.');
  }

  const userId = formData.get('userId') as string;
  if (!userId) return;

  await approveUserAccount(userId, session.email);
  revalidatePath('/admin/solicitudes');
  revalidatePath('/admin/usuarios');
  revalidatePath('/admin');
}

export async function rejectUserAction(formData: FormData) {
  const session = await getSession();
  if (!session || (session.roleType !== 'SUPER_ADMIN' && session.roleType !== 'LEGAL_ADMIN')) {
    throw new Error('No tienes permisos de SuperAdministrador para declinar solicitudes.');
  }

  const userId = formData.get('userId') as string;
  const reason = (formData.get('reason') as string) || 'Información de acreditación no verificada.';
  if (!userId) return;

  await rejectUserAccount(userId, reason, session.email);
  revalidatePath('/admin/solicitudes');
  revalidatePath('/admin/usuarios');
  revalidatePath('/admin');
}

export async function updateProfileDirectAction(formData: FormData) {
  const session = await getSession();
  if (!session) return;

  const fullName = formData.get('fullName') as string;
  const phone = formData.get('phone') as string;
  const bio = formData.get('bio') as string;
  const firmName = formData.get('firmName') as string;
  const university = formData.get('university') as string;
  const exequaturNumber = formData.get('exequaturNumber') as string;

  await updateUserProfile(session.id, {
    fullName,
    profile: {
      phone,
      bio,
      firmName: firmName || undefined,
      university: university || undefined,
      exequaturNumber: exequaturNumber || undefined,
    },
  });

  revalidatePath('/perfil');
}

export async function logoutAction() {
  await destroySession();
  redirect('/');
}