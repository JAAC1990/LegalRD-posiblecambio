/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Módulo: Sistema de Gestión de Usuarios y Permisos Administrativos
 * Ruta: src/lib/data/userManagement.ts
 * Ámbito Legal: Seguridad, Control de Acceso y Roles de Usuario
 * 
 * PROPÓSITO:
 * Administración de usuarios según roles (CIUDADANO, ESTUDIANTE, ABOGADO, SUPERADMIN), aprobaciones de colegiatura y solicitudes de acceso a la plataforma Legal RD.
 * 
 * FUNDAMENTOS NORMATIVOS:
 * Normas de privacidad y administración interna de cuentas.
 * 
 * REGLA FUNDAMENTAL DE PRESERVACIÓN ACUMULATIVA:
 * Este archivo forma parte del ecosistema integral de Legal RD.
 * No se permite eliminar, simplificar ni alterar la lógica preexistente.
 * ====================================================================
 */

﻿import { RoleType } from '@prisma/client';

/**
 * Tipo: `AccountStatus`
 * Define los valores admitidos para AccountStatus según las reglas del dominio dominicano.
 */
export type AccountStatus = 'PENDING_APPROVAL' | 'ACTIVE' | 'REJECTED' | 'SUSPENDED';

/**
 * Interfaz: `UserProfileData`
 * Modela la estructura de datos para UserProfileData en el ecosistema jurídico de Legal RD.
 */
export interface UserProfileData {
  exequaturNumber?: string;
  firmName?: string;
  courtJurisdiction?: string;
  specialties?: string[];
  university?: string;
  matricula?: string;
  academicYear?: string;
  institution?: string;
  idNumber?: string;
  phone?: string;
  bio?: string;
}

/**
 * Interfaz: `UserAccountItem`
 * Modela la estructura de datos para UserAccountItem en el ecosistema jurídico de Legal RD.
 */
export interface UserAccountItem {
  id: string;
  email: string;
  fullName: string;
  passwordHash: string;
  roleType: RoleType;
  status: AccountStatus;
  profile: UserProfileData;
  requestedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
}

// Almacén global en memoria persistente durante la ejecución
const globalUsersStore = globalThis as unknown as {
  __legalrd_users_store?: Map<string, UserAccountItem>;
};

if (!globalUsersStore.__legalrd_users_store) {
  globalUsersStore.__legalrd_users_store = new Map<string, UserAccountItem>();

  const initialUsers: UserAccountItem[] = [
    {
      id: 'usr-admin-1',
      email: 'admin@legalrd.do',
      fullName: 'Lic. Administrador Principal',
      passwordHash: '$2a$10$XoP5oU1s6MvW249zK2W9c.Kk683P31p3.WomG0r6oF8qZk66g4X3K',
      roleType: 'SUPER_ADMIN',
      status: 'ACTIVE',
      profile: {
        institution: 'Consejo Directivo Legal RD',
        phone: '+1 (809) 555-0100',
        bio: 'SuperAdministrador del Sistema y Auditor Legal.',
      },
      requestedAt: '2026-08-01T10:00:00Z',
      reviewedAt: '2026-08-01T10:00:00Z',
      reviewedBy: 'Sistema Autónomo',
    },
    {
      id: 'usr-lawyer-1',
      email: 'abogado@legalrd.do',
      fullName: 'Lic. Carlos Santana',
      passwordHash: '$2a$10$XoP5oU1s6MvW249zK2W9c.Kk683P31p3.WomG0r6oF8qZk66g4X3K',
      roleType: 'LAWYER',
      status: 'ACTIVE',
      profile: {
        exequaturNumber: 'CARD-12450-2018',
        firmName: 'Santana & Asociados - Bufete Jurídico',
        courtJurisdiction: 'Distrito Nacional (Corte de Apelación de Santo Domingo)',
        specialties: ['Derecho Laboral', 'Derecho Civil', 'Derecho Inmobiliario'],
        phone: '+1 (809) 555-0145',
        bio: 'Abogado litigante con más de 8 años de ejercicio profesional en materias civil, laboral y de tierras.',
      },
      requestedAt: '2026-08-10T14:30:00Z',
      reviewedAt: '2026-08-10T15:00:00Z',
      reviewedBy: 'admin@legalrd.do',
    },
    {
      id: 'usr-student-1',
      email: 'estudiante@legalrd.do',
      fullName: 'Ana Morales',
      passwordHash: '$2a$10$XoP5oU1s6MvW249zK2W9c.Kk683P31p3.WomG0r6oF8qZk66g4X3K',
      roleType: 'STUDENT',
      status: 'ACTIVE',
      profile: {
        university: 'Universidad Autónoma de Santo Domingo (UASD)',
        matricula: '10045234',
        academicYear: '4to Año (8vo Semestre)',
        specialties: ['Derecho Constitucional', 'Derecho Penal'],
        phone: '+1 (829) 555-0189',
        bio: 'Estudiante de término de la carrera de Derecho en la UASD.',
      },
      requestedAt: '2026-08-15T09:15:00Z',
      reviewedAt: '2026-08-15T10:00:00Z',
      reviewedBy: 'admin@legalrd.do',
    },
    // Solicitudes Pendientes para Aprobación del SuperAdmin
    {
      id: 'req-lawyer-2',
      email: 'lic.martinez@bufete.do',
      fullName: 'Lic. Roberto Martínez Peña',
      passwordHash: '$2a$10$XoP5oU1s6MvW249zK2W9c.Kk683P31p3.WomG0r6oF8qZk66g4X3K',
      roleType: 'LAWYER',
      status: 'PENDING_APPROVAL',
      profile: {
        exequaturNumber: 'CARD-8943-2022',
        firmName: 'Martínez & Martínez Abogados',
        courtJurisdiction: 'Departamento Judicial de Santiago',
        specialties: ['Derecho Penal', 'Derecho Procesal Penal', 'Lavado de Activos'],
        phone: '+1 (809) 580-2233',
        bio: 'Especialista en litigación penal y cumplimiento normativo.',
      },
      requestedAt: '2026-08-30T16:20:00Z',
    },
    {
      id: 'req-student-2',
      email: 'pedro.almonte@estudiantes.uasd.do',
      fullName: 'Pedro Almonte Rosario',
      passwordHash: '$2a$10$XoP5oU1s6MvW249zK2W9c.Kk683P31p3.WomG0r6oF8qZk66g4X3K',
      roleType: 'STUDENT',
      status: 'PENDING_APPROVAL',
      profile: {
        university: 'Pontificia Universidad Católica Madre y Maestra (PUCMM)',
        matricula: '2022-0419',
        academicYear: '3er Año',
        specialties: ['Derecho Comercial', 'Derecho Tributario'],
        phone: '+1 (809) 555-7890',
        bio: 'Estudiante de Derecho en PUCMM Campus Santo Domingo.',
      },
      requestedAt: '2026-08-31T11:45:00Z',
    },
    {
      id: 'req-reviewer-1',
      email: 'dra.valdez@pgr.gob.do',
      fullName: 'Dra. Carmen Valdez',
      passwordHash: '$2a$10$XoP5oU1s6MvW249zK2W9c.Kk683P31p3.WomG0r6oF8qZk66g4X3K',
      roleType: 'LEGAL_ADMIN',
      status: 'PENDING_APPROVAL',
      profile: {
        institution: 'Procuraduría General de la República (PGR)',
        exequaturNumber: 'CARD-4512-2010',
        specialties: ['Derecho Penal', 'Derecho Administrativo'],
        phone: '+1 (809) 533-3522',
        bio: 'Magistrada y analista de jurisprudencia en la PGR.',
      },
      requestedAt: '2026-08-31T18:10:00Z',
    },
  ];

  for (const u of initialUsers) {
    globalUsersStore.__legalrd_users_store.set(u.email.toLowerCase(), u);
    globalUsersStore.__legalrd_users_store.set(u.id, u);
  }
}

const usersMap = globalUsersStore.__legalrd_users_store;

/**
 * Función Operativa: `getAllUsers`
 * Procesa la lógica de negocio y reglas jurídicas correspondientes.
 */
export async function getAllUsers(): Promise<UserAccountItem[]> {
  const uniqueUsers = new Map<string, UserAccountItem>();
  for (const u of usersMap.values()) {
    uniqueUsers.set(u.id, u);
  }
  return Array.from(uniqueUsers.values()).sort(
    (a, b) => new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime()
  );
}

/**
 * Función Operativa: `getPendingRequests`
 * Procesa la lógica de negocio y reglas jurídicas correspondientes.
 */
export async function getPendingRequests(): Promise<UserAccountItem[]> {
  const all = await getAllUsers();
  return all.filter((u) => u.status === 'PENDING_APPROVAL');
}

/**
 * Función Operativa: `getPendingRequestsCount`
 * Procesa la lógica de negocio y reglas jurídicas correspondientes.
 */
export async function getPendingRequestsCount(): Promise<number> {
  const pending = await getPendingRequests();
  return pending.length;
}

/**
 * Función Operativa: `getUserByEmail`
 * Procesa la lógica de negocio y reglas jurídicas correspondientes.
 */
export async function getUserByEmail(email: string): Promise<UserAccountItem | null> {
  return usersMap.get(email.toLowerCase()) || null;
}

/**
 * Función Operativa: `getUserById`
 * Procesa la lógica de negocio y reglas jurídicas correspondientes.
 */
export async function getUserById(id: string): Promise<UserAccountItem | null> {
  return usersMap.get(id) || null;
}

/**
 * Función Operativa: `approveUserAccount`
 * Procesa la lógica de negocio y reglas jurídicas correspondientes.
 */
export async function approveUserAccount(userId: string, reviewerEmail: string): Promise<boolean> {
  const user = usersMap.get(userId);
  if (!user) return false;

  user.status = 'ACTIVE';
  user.reviewedAt = new Date().toISOString();
  user.reviewedBy = reviewerEmail;

  usersMap.set(user.id, user);
  usersMap.set(user.email.toLowerCase(), user);
  return true;
}

/**
 * Función Operativa: `rejectUserAccount`
 * Procesa la lógica de negocio y reglas jurídicas correspondientes.
 */
export async function rejectUserAccount(
  userId: string,
  reason: string,
  reviewerEmail: string
): Promise<boolean> {
  const user = usersMap.get(userId);
  if (!user) return false;

  user.status = 'REJECTED';
  user.rejectionReason = reason;
  user.reviewedAt = new Date().toISOString();
  user.reviewedBy = reviewerEmail;

  usersMap.set(user.id, user);
  usersMap.set(user.email.toLowerCase(), user);
  return true;
}

/**
 * Función Operativa: `registerNewAccountRequest`
 * Procesa la lógica de negocio y reglas jurídicas correspondientes.
 */
export async function registerNewAccountRequest(data: {
  fullName: string;
  email: string;
  passwordHash: string;
  roleType: RoleType;
  profile: UserProfileData;
}): Promise<UserAccountItem> {
  const newAccount: UserAccountItem = {
    id: 'usr-req-' + Date.now(),
    email: data.email.toLowerCase(),
    fullName: data.fullName,
    passwordHash: data.passwordHash,
    roleType: data.roleType,
    status: 'PENDING_APPROVAL',
    profile: data.profile,
    requestedAt: new Date().toISOString(),
  };

  usersMap.set(newAccount.id, newAccount);
  usersMap.set(newAccount.email, newAccount);

  return newAccount;
}

/**
 * Función Operativa: `updateUserProfile`
 * Procesa la lógica de negocio y reglas jurídicas correspondientes.
 */
export async function updateUserProfile(
  userId: string,
  data: {
    fullName?: string;
    profile: UserProfileData;
  }
): Promise<UserAccountItem | null> {
  const user = usersMap.get(userId);
  if (!user) return null;

  if (data.fullName) user.fullName = data.fullName;
  user.profile = { ...user.profile, ...data.profile };

  usersMap.set(user.id, user);
  usersMap.set(user.email.toLowerCase(), user);
  return user;
}