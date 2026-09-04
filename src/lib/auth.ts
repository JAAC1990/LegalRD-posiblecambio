/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Módulo: Módulo de Seguridad, Criptografía y Sesiones JWT
 * Ruta: src/lib/auth.ts
 * Ámbito Legal: Seguridad de la Información y Control de Acceso
 * 
 * PROPÓSITO:
 * Funciones de hashing seguro de contraseñas (bcrypt), firma y verificación de tokens JWT, lectura de cookies HTTP-only y verificación de roles.
 * 
 * FUNDAMENTOS NORMATIVOS:
 * Estándares de seguridad de datos web y control RBAC (Role-Based Access Control).
 * 
 * REGLA FUNDAMENTAL DE PRESERVACIÓN ACUMULATIVA:
 * Este archivo forma parte del ecosistema integral de Legal RD.
 * No se permite eliminar, simplificar ni alterar la lógica preexistente.
 * ====================================================================
 */

﻿import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import * as bcrypt from 'bcryptjs';
import { RoleType } from '@prisma/client';

const SECRET_KEY = new TextEncoder().encode(
  process.env.AUTH_SECRET || 'legal_rd_super_secret_jwt_key_2026_dominican_republic'
);

/**
 * Interfaz: `SessionUser`
 * Modela la estructura de datos para SessionUser en el ecosistema jurídico de Legal RD.
 */
export interface SessionUser {
  id: string;
  email: string;
  fullName: string;
  roleType: RoleType;
  sessionId?: string;
}

// Almacén global en memoria de sesiones activas (Unicidad de Sesión por Usuario)
// Mapea userId -> sessionId más reciente.
// Si un usuario inicia sesión en el Dispositivo B, sobreescribe el sessionId activo,
// provocando que el Dispositivo A sea cerrado automáticamente en su próxima petición.
const globalActiveSessions = globalThis as unknown as {
  __legalrd_active_sessions?: Map<string, string>;
};

if (!globalActiveSessions.__legalrd_active_sessions) {
  globalActiveSessions.__legalrd_active_sessions = new Map<string, string>();
}

const activeSessions = globalActiveSessions.__legalrd_active_sessions;

/**
 * Función Operativa: `hashPassword`
 * Procesa la lógica de negocio y reglas jurídicas correspondientes.
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

/**
 * Función Operativa: `verifyPassword`
 * Procesa la lógica de negocio y reglas jurídicas correspondientes.
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Función Operativa: `createSession`
 * Procesa la lógica de negocio y reglas jurídicas correspondientes.
 */
export async function createSession(user: SessionUser) {
  // Generar identificador único de sesión para este inicio de sesión
  const sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);

  // Registrar como la única sesión válida activa para este usuario
  activeSessions.set(user.id, sessionId);
  activeSessions.set(user.email.toLowerCase(), sessionId);

  const token = await new SignJWT({
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    roleType: user.roleType,
    sessionId: sessionId,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET_KEY);

  const cookieStore = await cookies();
  cookieStore.set('legalrd_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return token;
}

/**
 * Función Operativa: `getSession`
 * Procesa la lógica de negocio y reglas jurídicas correspondientes.
 */
export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('legalrd_session')?.value;
    if (!token) return null;

    const { payload } = await jwtVerify(token, SECRET_KEY);
    const userId = payload.id as string;
    const userEmail = (payload.email as string)?.toLowerCase();
    const tokenSessionId = payload.sessionId as string;

    // Validación de Sesión Única Concurrente:
    // Si el usuario inició sesión desde otro dispositivo, activeSessions tendrá un sessionId diferente.
    const activeSessionId = activeSessions.get(userId) || (userEmail ? activeSessions.get(userEmail) : null);

    if (activeSessionId && tokenSessionId && activeSessionId !== tokenSessionId) {
      // Se detectó inicio de sesión posterior en otro dispositivo -> Cerrar esta sesión inmediatamente
      cookieStore.delete('legalrd_session');
      return null;
    }

    // Si aún no estaba en el mapa (reinicio de servidor), asegurarlo
    if (userId && tokenSessionId && !activeSessionId) {
      activeSessions.set(userId, tokenSessionId);
    }

    return {
      id: userId,
      email: payload.email as string,
      fullName: payload.fullName as string,
      roleType: payload.roleType as RoleType,
      sessionId: tokenSessionId,
    };
  } catch {
    return null;
  }
}

/**
 * Función Operativa: `destroySession`
 * Procesa la lógica de negocio y reglas jurídicas correspondientes.
 */
export async function destroySession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('legalrd_session')?.value;
    if (token) {
      try {
        const { payload } = await jwtVerify(token, SECRET_KEY);
        if (payload.id) {
          activeSessions.delete(payload.id as string);
        }
      } catch {
        // Ignorar error al destruir
      }
    }
    cookieStore.delete('legalrd_session');
  } catch {
    // Ignorar
  }
}