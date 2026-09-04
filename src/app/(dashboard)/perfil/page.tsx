import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getUserByEmail, getUserById } from '@/lib/data/userManagement';
import { updateProfileDirectAction } from '@/lib/actions/auth';
import {
  User,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  Scale,
  Award,
  Building,
  Mail,
  Phone,
  Calendar,
  Save,
  CheckCircle2,
  FileText,
  Bookmark,
  FolderKanban,
  Sparkles,
  Lock
} from 'lucide-react';

export default async function MiPerfilPage() {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }

  const userAccount = (await getUserById(session.id)) || (await getUserByEmail(session.email));
  const roleType = session.roleType;

  const isLawyer = roleType === 'LAWYER';
  const isStudent = roleType === 'STUDENT';
  const isSuperAdmin = roleType === 'SUPER_ADMIN';
  const isLegalAdmin = roleType === 'LEGAL_ADMIN';

  const roleTitle = isSuperAdmin
    ? 'SuperAdministrador del Sistema'
    : isLegalAdmin
    ? 'Editor Jurídico Oficial'
    : isLawyer
    ? 'Abogado Pro Habilitado'
    : isStudent
    ? 'Estudiante de Derecho'
    : 'Usuario Particular';

  const roleBadgeColor = isSuperAdmin
    ? 'bg-purple-100 text-purple-900 border-purple-300'
    : isLawyer
    ? 'bg-amber-100 text-amber-900 border-amber-300'
    : isStudent
    ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
    : 'bg-blue-100 text-blue-900 border-blue-300';

  return (
    <div className="max-w-5xl mx-auto space-y-10 w-full">
      {/* Cabecera del Perfil */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-serif font-extrabold text-2xl shadow-md shrink-0">
              {session.fullName.charAt(0).toUpperCase()}
            </div>
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  {session.fullName}
                </h1>
                <span className={`text-xs font-bold px-3 py-1 rounded-xl border ${roleBadgeColor}`}>
                  {roleTitle}
                </span>
              </div>
              <p className="text-xs text-slate-300 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{session.email}</span>
                <span className="text-slate-500">•</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Cuenta Verificada</span>
                </span>
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[11px] font-mono text-slate-400 block">ID Usuario:</span>
            <span className="text-xs font-mono text-amber-300">{session.id}</span>
          </div>
        </div>

        {/* Resumen de Capacidades Específicas por Rol */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-800 text-xs">
          {isLawyer && (
            <>
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
                <strong className="text-amber-400 block">Exequátur Habilitado:</strong>
                <span className="text-slate-200">{userAccount?.profile?.exequaturNumber || 'CARD-12450-2018'}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
                <strong className="text-amber-400 block">Bufete / Despacho:</strong>
                <span className="text-slate-200">{userAccount?.profile?.firmName || 'Santana & Asociados'}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
                <strong className="text-amber-400 block">Jurisdicción:</strong>
                <span className="text-slate-200">{userAccount?.profile?.courtJurisdiction || 'Distrito Nacional'}</span>
              </div>
            </>
          )}

          {isStudent && (
            <>
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
                <strong className="text-emerald-400 block">Universidad:</strong>
                <span className="text-slate-200">{userAccount?.profile?.university || 'UASD'}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
                <strong className="text-emerald-400 block">Matrícula:</strong>
                <span className="text-slate-200">{userAccount?.profile?.matricula || '10045234'}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
                <strong className="text-emerald-400 block">Simulador Cuestionarios:</strong>
                <span className="text-slate-200">Acceso Ilimitado con Respuestas Fundamentadas</span>
              </div>
            </>
          )}

          {isSuperAdmin && (
            <>
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
                <strong className="text-purple-400 block">Privilegio:</strong>
                <span className="text-slate-200">Control Total del Sistema & RBAC</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
                <strong className="text-purple-400 block">Aprobación de Cuentas:</strong>
                <span className="text-slate-200">Habilitado con Notificaciones en Vivo</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
                <strong className="text-purple-400 block">Auditoría Inmutable:</strong>
                <span className="text-slate-200">Trazabilidad de Cambios Activa</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Formulario de Edición de Datos del Perfil */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-2xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
            <User className="w-5 h-5 text-amber-600" />
            <span>Editar Información del Perfil</span>
          </h2>
          <span className="text-xs text-slate-400">Actualización en tiempo real</span>
        </div>

        <form action={updateProfileDirectAction} className="space-y-6 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Nombre Completo:</label>
              <input
                type="text"
                name="fullName"
                defaultValue={session.fullName}
                className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-slate-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Correo Electrónico (No modificable):</label>
              <input
                type="email"
                disabled
                value={session.email}
                className="w-full p-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Teléfono de Contacto:</label>
              <input
                type="text"
                name="phone"
                defaultValue={userAccount?.profile?.phone || '+1 (809) 555-0145'}
                placeholder="+1 (809) 000-0000"
                className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-slate-900"
              />
            </div>

            {isLawyer && (
              <>
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">No. de Exequátur / Colegiatura CARD:</label>
                  <input
                    type="text"
                    name="exequaturNumber"
                    defaultValue={userAccount?.profile?.exequaturNumber || 'CARD-12450-2018'}
                    className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="font-semibold text-slate-700">Firma o Bufete Jurídico:</label>
                  <input
                    type="text"
                    name="firmName"
                    defaultValue={userAccount?.profile?.firmName || 'Santana & Asociados'}
                    className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </>
            )}

            {isStudent && (
              <>
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="font-semibold text-slate-700">Universidad / Escuela de Derecho:</label>
                  <input
                    type="text"
                    name="university"
                    defaultValue={userAccount?.profile?.university || 'Universidad Autónoma de Santo Domingo (UASD)'}
                    className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </>
            )}

            <div className="sm:col-span-2 space-y-1.5">
              <label className="font-semibold text-slate-700">Biografía Profesional / Resumen de Práctica:</label>
              <textarea
                rows={4}
                name="bio"
                defaultValue={userAccount?.profile?.bio || 'Profesional del Derecho enfocado en el estudio y aplicación del ordenamiento jurídico dominicano.'}
                className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Cambios del Perfil</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}