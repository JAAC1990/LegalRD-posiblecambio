/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Archivo: src/app/(admin)/admin/solicitudes/page.tsx
 * Área: Panel de Administración y Control Gubernativo
 * 
 * DESCRIPCIÓN:
 * Gestión centralizada de normas, especialidades, auditoría de eventos y aprobación de cuentas de abogados.
 * 
 * CONTEXTO DE APLICACIÓN:
 * Diseñado conforme a las normas procesales y sustantivas vigentes
 * en la República Dominicana (Código Civil, Código de Trabajo,
 * Código de Procedimiento Civil, Ley 108-05, Ley 2-23, Ley 137-11).
 * ====================================================================
 */

﻿import Link from 'next/link';
import { getAllUsers, getPendingRequests } from '@/lib/data/userManagement';
import { approveUserAction, rejectUserAction } from '@/lib/actions/auth';
import {
  ShieldCheck,
  UserCheck,
  UserX,
  Clock,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  GraduationCap,
  Scale,
  Users,
  ArrowLeft,
  Building,
  Award,
  Bell,
  Mail,
  Phone
} from 'lucide-react';

interface Props {
  searchParams: Promise<{ tab?: string }>;
}

export default async function AdminSolicitudesPage({ searchParams }: Props) {
  const { tab = 'pendientes' } = await searchParams;
  const allUsers = await getAllUsers();

  const pendingUsers = allUsers.filter((u) => u.status === 'PENDING_APPROVAL');
  const activeUsers = allUsers.filter((u) => u.status === 'ACTIVE');
  const rejectedUsers = allUsers.filter((u) => u.status === 'REJECTED');

  const displayedUsers =
    tab === 'pendientes'
      ? pendingUsers
      : tab === 'activas'
      ? activeUsers
      : rejectedUsers;

  return (
    <div className="space-y-8 max-w-6xl w-full">
      {/* Cabecera con Notificación */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-serif font-bold text-slate-900">
              Solicitudes de Creación de Cuentas
            </h1>
            {pendingUsers.length > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-xs font-bold animate-pulse shadow-xs">
                <Bell className="w-3 h-3 fill-slate-950" />
                <span>{pendingUsers.length} Nuevas</span>
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Revisión, validación de acreditaciones (Exequátur, Universidad) y autorización de acceso al sistema.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/notificaciones"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 px-3.5 py-2 rounded-xl shadow-xs transition-colors w-fit"
          >
            <Bell className="w-4 h-4" />
            <span>Centro de Notificaciones (15 Días)</span>
          </Link>

          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-2xs hover:bg-slate-50 transition-colors w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Dashboard</span>
          </Link>
        </div>
      </div>

      {/* Selector de Pestañas */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-2xs text-xs">
        <Link
          href="/admin/solicitudes?tab=pendientes"
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
            tab === 'pendientes'
              ? 'bg-slate-900 text-amber-400 shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Pendientes de Aprobación ({pendingUsers.length})</span>
        </Link>

        <Link
          href="/admin/solicitudes?tab=activas"
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
            tab === 'activas'
              ? 'bg-slate-900 text-amber-400 shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Cuentas Aprobadas ({activeUsers.length})</span>
        </Link>

        <Link
          href="/admin/solicitudes?tab=declinadas"
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
            tab === 'declinadas'
              ? 'bg-slate-900 text-amber-400 shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <UserX className="w-4 h-4" />
          <span>Declinadas ({rejectedUsers.length})</span>
        </Link>
      </div>

      {/* Listado de Solicitudes */}
      {displayedUsers.length > 0 ? (
        <div className="space-y-4">
          {displayedUsers.map((user) => {
            const isPending = user.status === 'PENDING_APPROVAL';
            const isLawyer = user.roleType === 'LAWYER';
            const isStudent = user.roleType === 'STUDENT';
            const isAdminRole = user.roleType === 'SUPER_ADMIN' || user.roleType === 'LEGAL_ADMIN';

            const roleBadgeColor = isLawyer
              ? 'bg-amber-50 text-amber-900 border-amber-300'
              : isStudent
              ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
              : isAdminRole
              ? 'bg-purple-50 text-purple-900 border-purple-300'
              : 'bg-slate-100 text-slate-700 border-slate-200';

            const roleLabel = isLawyer
              ? 'Abogado Litigante'
              : isStudent
              ? 'Estudiante de Derecho'
              : user.roleType === 'SUPER_ADMIN'
              ? 'SuperAdministrador'
              : user.roleType === 'LEGAL_ADMIN'
              ? 'Editor Jurídico'
              : 'Usuario Particular';

            return (
              <div
                key={user.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs hover:shadow-md transition-all space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold font-serif text-lg shrink-0 shadow-xs">
                      {user.fullName.charAt(0).toUpperCase()}
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="font-serif font-bold text-lg text-slate-900">
                          {user.fullName}
                        </h2>
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-lg border ${roleBadgeColor}`}>
                          {roleLabel}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <span>{user.email}</span>
                        </span>
                        {user.profile?.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                            <span>{user.profile.phone}</span>
                          </span>
                        )}
                        <span className="text-[11px] text-slate-400">
                          Solicitada: {new Date(user.requestedAt).toLocaleDateString('es-DO', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Estado Actual */}
                  <div className="shrink-0">
                    {user.status === 'PENDING_APPROVAL' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span>Pendiente de Decisión</span>
                      </span>
                    )}
                    {user.status === 'ACTIVE' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Cuenta Activa / Aprobada</span>
                      </span>
                    )}
                    {user.status === 'REJECTED' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-rose-50 border border-rose-300 text-rose-900 text-xs font-bold">
                        <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                        <span>Solicitud Declinada</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Datos de Acreditación Específicos del Rol */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                  {user.profile?.exequaturNumber && (
                    <div>
                      <span className="text-slate-400 block mb-0.5 font-medium">No. de Exequátur / CARD:</span>
                      <strong className="text-slate-900 font-mono">{user.profile.exequaturNumber}</strong>
                    </div>
                  )}

                  {user.profile?.firmName && (
                    <div>
                      <span className="text-slate-400 block mb-0.5 font-medium">Firma / Bufete Jurídico:</span>
                      <strong className="text-slate-900">{user.profile.firmName}</strong>
                    </div>
                  )}

                  {user.profile?.courtJurisdiction && (
                    <div>
                      <span className="text-slate-400 block mb-0.5 font-medium">Departamento Judicial:</span>
                      <span className="text-slate-800">{user.profile.courtJurisdiction}</span>
                    </div>
                  )}

                  {user.profile?.university && (
                    <div>
                      <span className="text-slate-400 block mb-0.5 font-medium">Universidad / Centro Académico:</span>
                      <strong className="text-slate-900">{user.profile.university}</strong>
                    </div>
                  )}

                  {user.profile?.matricula && (
                    <div>
                      <span className="text-slate-400 block mb-0.5 font-medium">Matrícula Estudiantil:</span>
                      <strong className="text-slate-900 font-mono">{user.profile.matricula}</strong>
                    </div>
                  )}

                  {user.profile?.institution && (
                    <div>
                      <span className="text-slate-400 block mb-0.5 font-medium">Institución Jurídica:</span>
                      <strong className="text-slate-900">{user.profile.institution}</strong>
                    </div>
                  )}
                </div>

                {/* Botones de Acción para el SuperAdministrador */}
                {isPending && (
                  <div className="flex flex-wrap items-center justify-end gap-3 pt-2 border-t border-slate-100">
                    <form action={rejectUserAction} className="flex items-center gap-2">
                      <input type="hidden" name="userId" value={user.id} />
                      <input
                        type="text"
                        name="reason"
                        placeholder="Motivo de declinación (opcional)..."
                        className="px-3 py-2 rounded-xl border border-slate-300 text-xs w-56 sm:w-64 focus:ring-2 focus:ring-rose-500 bg-white"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <UserX className="w-4 h-4" />
                        <span>Declinar</span>
                      </button>
                    </form>

                    <form action={approveUserAction}>
                      <input type="hidden" name="userId" value={user.id} />
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <UserCheck className="w-4 h-4" />
                        <span>✅ Aceptar y Habilitar Acceso</span>
                      </button>
                    </form>
                  </div>
                )}

                {user.reviewedBy && (
                  <div className="text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-100 pt-3">
                    <span>Revisada por: <strong>{user.reviewedBy}</strong></span>
                    {user.reviewedAt && (
                      <span>Fecha: {new Date(user.reviewedAt).toLocaleDateString('es-DO')}</span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 rounded-3xl bg-white border border-slate-200 text-center space-y-3">
          <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
          <h3 className="font-serif font-bold text-lg text-slate-900">
            {tab === 'pendientes' ? 'No hay solicitudes pendientes' : 'No hay cuentas en esta sección'}
          </h3>
          <p className="text-xs text-slate-500">
            {tab === 'pendientes'
              ? 'Todas las solicitudes de registro han sido procesadas por el SuperAdministrador.'
              : 'Selecciona otra pestaña para ver los registros.'}
          </p>
        </div>
      )}
    </div>
  );
}