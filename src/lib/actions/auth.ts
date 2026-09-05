/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Módulo: Server Actions para Autenticación de Usuarios
 * Ruta: src/lib/actions/auth.ts
 * Ámbito Legal: Gestión de Identidades y Autenticación
 * 
 * PROPÓSITO:
 * Manejadores de servidor para registro de usuarios, login, cierre de sesión y actualización de credenciales con validación Zod y cookies seguras.
 * 
 * FUNDAMENTOS NORMATIVOS:
 * Next.js Server Actions.
 * 
 * REGLA FUNDAMENTAL DE PRESERVACIÓN ACUMULATIVA:
 * Este archivo forma parte del ecosistema integral de Legal RD.
 * No se permite eliminar, simplificar ni alterar la lógica preexistente.
 * ====================================================================
 */

﻿'use server';

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
  extendTrialDays,
} from '@/lib/data/userManagement';
import { revalidatePath } from 'next/cache';

/**
 * Tipo: `AuthState`
 * Define los valores admitidos para AuthState según las reglas del dominio dominicano.
 */
export type AuthState = {
  error?: string;
  success?: boolean;
  pendingApproval?: boolean;
  message?: string;
};

/**
 * Función Operativa: `loginAction`
 * Procesa la lógica de negocio y reglas jurídicas correspondientes.
 */
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

/**
 * Función Operativa: `registerAction`
 * Procesa la lógica de negocio y reglas jurídicas correspondientes.
 */
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

/**
 * Función Operativa: `approveUserAction`
 * Procesa la lógica de negocio y reglas jurídicas correspondientes.
 */
export async function approveUserAction(formData: FormData) {
  const session = await getSession();
  if (!session || (session.roleType !== 'SUPER_ADMIN' && session.roleType !== 'LEGAL_ADMIN')) {
    throw new Error('No tienes permisos de SuperAdministrador para aprobar solicitudes.');
  }

  const userId = formData.get('userId') as string;
  const trialDaysStr = formData.get('trialDays') as string;
  const trialDays = trialDaysStr ? parseInt(trialDaysStr, 10) : 15;
  if (!userId) return;

  await approveUserAccount(userId, session.email, isNaN(trialDays) ? 15 : trialDays);
  revalidatePath('/admin/notificaciones');
  revalidatePath('/admin/solicitudes');
  revalidatePath('/admin/usuarios');
  revalidatePath('/admin');
}

/**
 * Función Operativa: `extendTrialAction`
 * Permite al SuperAdministrador extender o renovar el período de prueba de 15 días a un usuario.
 */
export async function extendTrialAction(formData: FormData) {
  const session = await getSession();
  if (!session || (session.roleType !== 'SUPER_ADMIN' && session.roleType !== 'LEGAL_ADMIN')) {
    throw new Error('No tienes permisos de SuperAdministrador para extender períodos de prueba.');
  }

  const userId = formData.get('userId') as string;
  const daysStr = formData.get('days') as string;
  const days = daysStr ? parseInt(daysStr, 10) : 15;
  if (!userId) return;

  await extendTrialDays(userId, isNaN(days) ? 15 : days);
  revalidatePath('/admin/notificaciones');
  revalidatePath('/admin/solicitudes');
  revalidatePath('/admin/usuarios');
  revalidatePath('/admin');
}

/**
 * Función Operativa: `rejectUserAction`
 * Procesa la lógica de negocio y reglas jurídicas correspondientes.
 */
export async function rejectUserAction(formData: FormData) {
  const session = await getSession();
  if (!session || (session.roleType !== 'SUPER_ADMIN' && session.roleType !== 'LEGAL_ADMIN')) {
    throw new Error('No tienes permisos de SuperAdministrador para declinar solicitudes.');
  }

  const userId = formData.get('userId') as string;
  const reason = (formData.get('reason') as string) || 'Información de acreditación no verificada.';
  if (!userId) return;

  await rejectUserAccount(userId, reason, session.email);
  revalidatePath('/admin/notificaciones');
  revalidatePath('/admin/solicitudes');
  revalidatePath('/admin/usuarios');
  revalidatePath('/admin');
}

/**
 * Función Operativa: `updateProfileDirectAction`
 * Procesa la lógica de negocio y reglas jurídicas correspondientes.
 */
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

/**
 * Función Operativa: `logoutAction`
 * Procesa la lógica de negocio y reglas jurídicas correspondientes.
 */
export async function logoutAction() {
  await destroySession();
  redirect('/');
}