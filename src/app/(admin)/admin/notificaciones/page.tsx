/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Archivo: src/app/(admin)/admin/notificaciones/page.tsx
 * Área: Panel de Administración y Control Gubernativo
 * 
 * DESCRIPCIÓN:
 * Panel Central de Notificaciones del SuperUsuario para visualización,
 * auditoría y otorgamiento de acceso a nuevos usuarios con período de
 * prueba activo de 15 días.
 * ====================================================================
 */

import Link from 'next/link';
import { getAllUsers, getTrialInfo, UserAccountItem } from '@/lib/data/userManagement';
import { approveUserAction, rejectUserAction, extendTrialAction } from '@/lib/actions/auth';
import {
  Bell,
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
  Sparkles,
  Phone,
  Mail,
  Calendar,
  Layers,
  Search,
  Filter
} from 'lucide-react';

interface Props {
  searchParams: Promise<{ tab?: string }>;
}

export default async function AdminNotificacionesPage({ searchParams }: Props) {
  const { tab = 'pendientes' } = await searchParams;
  const allUsers = await getAllUsers();

  const pendingUsers = allUsers.filter((u) => u.status === 'PENDING_APPROVAL');
  const activeUsers = allUsers.filter((u) => u.status === 'ACTIVE');
  const usersWithTrial = activeUsers.filter((u) => {
    const trial = getTrialInfo(u);
    return trial.isTrialActive;
  });
  const expiringSoon = usersWithTrial.filter((u) => {
    const trial = getTrialInfo(u);
    return trial.daysRemaining <= 3 && !trial.isTrialExpired;
  });

  const displayedUsers =
    tab === 'pendientes'
      ? pendingUsers
      : tab === 'prueba-activa'
      ? usersWithTrial
      : tab === 'todos'
      ? allUsers
      : pendingUsers;

  return (
    <div className="space-y-8 max-w-6xl w-full">
      {/* Cabecera Principal con Notificación Animada */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold mb-2 shadow-2xs">
            <Bell className="w-3.5 h-3.5 fill-amber-500 text-amber-600 animate-bounce" />
            <span>Centro de Notificaciones y Solicitudes de Ingreso</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            Nuevos Usuarios & Autorización de Accesos
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Como SuperUsuario, autoriza el ingreso de nuevos miembros y activa su <strong>período de prueba de 15 días</strong> con acceso total al ordenamiento dominicano.
          </p>
        </div>

        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-2xs hover:bg-slate-50 transition-colors w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Dashboard</span>
        </Link>
      </div>

      {/* Tarjetas Resumen de Métricas de Notificaciones */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-amber-300 shadow-xs space-y-2 bg-gradient-to-br from-amber-50/50 to-white">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
              Solicitudes Pendientes
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs shadow-xs">
              <Bell className="w-4 h-4 fill-slate-950" />
            </div>
          </div>
          <div className="text-3xl font-serif font-bold text-slate-900">{pendingUsers.length}</div>
          <p className="text-[11px] text-amber-900 font-medium">Requieren tu aprobación inmediata</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-indigo-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700">
              En Prueba (15 Días)
            </span>
            <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-serif font-bold text-slate-900">{usersWithTrial.length}</div>
          <p className="text-[11px] text-slate-500">Usuarios explorando la plataforma</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-rose-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700">
              Pruebas por Vencer
            </span>
            <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-serif font-bold text-slate-900">{expiringSoon.length}</div>
          <p className="text-[11px] text-rose-600 font-medium">3 días o menos para finalizar</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Total de Cuentas
            </span>
            <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-serif font-bold text-slate-900">{allUsers.length}</div>
          <p className="text-[11px] text-slate-500">Registros en el sistema</p>
        </div>
      </div>

      {/* Barra de Filtros y Pestañas */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-2xs text-xs">
        <Link
          href="/admin/notificaciones?tab=pendientes"
          className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 ${
            tab === 'pendientes'
              ? 'bg-slate-900 text-amber-400 shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Solicitudes Nuevas ({pendingUsers.length})</span>
        </Link>

        <Link
          href="/admin/notificaciones?tab=prueba-activa"
          className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 ${
            tab === 'prueba-activa'
              ? 'bg-slate-900 text-amber-400 shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Con Prueba Activa ({usersWithTrial.length})</span>
        </Link>

        <Link
          href="/admin/notificaciones?tab=todos"
          className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 ${
            tab === 'todos'
              ? 'bg-slate-900 text-amber-400 shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Todos los Usuarios ({allUsers.length})</span>
        </Link>
      </div>

      {/* Lista de Solicitudes y Usuarios */}
      {displayedUsers.length > 0 ? (
        <div className="space-y-4">
          {displayedUsers.map((user) => {
            const isPending = user.status === 'PENDING_APPROVAL';
            const trial = getTrialInfo(user);
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
                className={`bg-white rounded-3xl p-6 sm:p-8 border transition-all space-y-6 shadow-2xs hover:shadow-md ${
                  isPending ? 'border-amber-300 bg-amber-50/10' : 'border-slate-200'
                }`}
              >
                {/* Cabecera del Usuario */}
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

                        {isPending && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold animate-pulse">
                            <Bell className="w-3 h-3 fill-amber-500" />
                            <span>¡Nueva Solicitud!</span>
                          </span>
                        )}
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

                  {/* Estado del Período de Prueba de 15 Días */}
                  <div className="shrink-0 flex flex-col sm:items-end gap-1.5">
                    {user.status === 'ACTIVE' && (
                      <div className="text-right">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold border ${
                          trial.daysRemaining <= 3 && !trial.isTrialExpired
                            ? 'bg-amber-100 text-amber-900 border-amber-300'
                            : trial.isTrialExpired
                            ? 'bg-rose-100 text-rose-900 border-rose-300'
                            : 'bg-indigo-50 text-indigo-900 border-indigo-200'
                        }`}>
                          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                          <span>
                            {trial.isTrialExpired
                              ? 'Prueba Vencida'
                              : `Prueba: ${trial.daysRemaining} días restantes`}
                          </span>
                        </span>
                        <span className="block text-[10px] text-slate-400 mt-0.5">
                          Vence: {new Date(trial.trialEndsAt).toLocaleDateString('es-DO')}
                        </span>
                      </div>
                    )}

                    {isPending && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span>Esperando Aprobación</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Datos de Acreditación Dominicana */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
                  {user.profile?.exequaturNumber && (
                    <div>
                      <span className="text-slate-400 block mb-0.5 font-medium">Exequátur / Carnet CARD:</span>
                      <strong className="text-slate-900 font-mono">{user.profile.exequaturNumber}</strong>
                    </div>
                  )}

                  {user.profile?.firmName && (
                    <div>
                      <span className="text-slate-400 block mb-0.5 font-medium">Firma / Despacho:</span>
                      <strong className="text-slate-900">{user.profile.firmName}</strong>
                    </div>
                  )}

                  {user.profile?.courtJurisdiction && (
                    <div>
                      <span className="text-slate-400 block mb-0.5 font-medium">Jurisdicción Ordinaria:</span>
                      <strong className="text-slate-900">{user.profile.courtJurisdiction}</strong>
                    </div>
                  )}

                  {user.profile?.university && (
                    <div>
                      <span className="text-slate-400 block mb-0.5 font-medium">Universidad:</span>
                      <strong className="text-slate-900">{user.profile.university}</strong>
                    </div>
                  )}

                  {user.profile?.matricula && (
                    <div>
                      <span className="text-slate-400 block mb-0.5 font-medium">Matrícula Estudiantil:</span>
                      <strong className="text-slate-900 font-mono">{user.profile.matricula}</strong>
                    </div>
                  )}

                  {user.profile?.specialties && user.profile.specialties.length > 0 && (
                    <div className="sm:col-span-2">
                      <span className="text-slate-400 block mb-0.5 font-medium">Especialidades Declaradas:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {user.profile.specialties.map((s, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-semibold text-slate-700">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Barra de Acciones del SuperUsuario */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Control Directo de Acceso — SuperUsuario</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* Botón Principal: Dar Acceso y Activar 15 Días de Prueba */}
                    {isPending && (
                      <>
                        <form action={rejectUserAction} className="flex items-center gap-1.5">
                          <input type="hidden" name="userId" value={user.id} />
                          <input
                            type="text"
                            name="reason"
                            placeholder="Motivo de declinación..."
                            className="px-2.5 py-1.5 rounded-xl border border-slate-300 text-xs w-44 focus:ring-2 focus:ring-rose-500 bg-white"
                          />
                          <button
                            type="submit"
                            className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <UserX className="w-3.5 h-3.5" />
                            <span>Declinar</span>
                          </button>
                        </form>

                        <form action={approveUserAction}>
                          <input type="hidden" name="userId" value={user.id} />
                          <input type="hidden" name="trialDays" value="15" />
                          <button
                            type="submit"
                            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
                          >
                            <UserCheck className="w-4 h-4 text-amber-400" />
                            <span>✅ Dar Acceso y Activar 15 Días de Prueba</span>
                          </button>
                        </form>
                      </>
                    )}

                    {/* Extender Prueba para usuarios ya activos */}
                    {!isPending && user.status === 'ACTIVE' && (
                      <form action={extendTrialAction} className="flex items-center gap-1.5">
                        <input type="hidden" name="userId" value={user.id} />
                        <input type="hidden" name="days" value="15" />
                        <button
                          type="submit"
                          className="px-4 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 font-bold text-xs border border-indigo-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                          <span>Otorgar +15 Días Extra de Prueba</span>
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 rounded-3xl bg-white border border-slate-200 text-center space-y-3">
          <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
          <h3 className="font-serif font-bold text-lg text-slate-900">
            {tab === 'pendientes'
              ? 'No hay nuevas notificaciones de solicitudes'
              : 'No hay usuarios en este criterio'}
          </h3>
          <p className="text-xs text-slate-500">
            {tab === 'pendientes'
              ? 'Todas las solicitudes de nuevos miembros han sido evaluadas y autorizadas con sus 15 días de prueba.'
              : 'Cambia de pestaña para revisar el resto de los usuarios.'}
          </p>
        </div>
      )}
    </div>
  );
}
