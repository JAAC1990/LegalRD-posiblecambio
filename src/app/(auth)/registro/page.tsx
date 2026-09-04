'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Scale,
  Lock,
  Mail,
  User,
  ArrowRight,
  AlertCircle,
  Briefcase,
  GraduationCap,
  Globe,
  Building,
  CheckCircle2,
  Phone,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { registerAction } from '@/lib/actions/auth';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [roleType, setRoleType] = useState<'LAWYER' | 'STUDENT' | 'FREE_USER' | 'LEGAL_ADMIN'>('LAWYER');

  // Campos por rol
  const [exequaturNumber, setExequaturNumber] = useState('');
  const [firmName, setFirmName] = useState('');
  const [university, setUniversity] = useState('');
  const [matricula, setMatricula] = useState('');
  const [institution, setInstitution] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSuccessPending, setIsSuccessPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phone', phone);
    formData.append('roleType', roleType);

    if (roleType === 'LAWYER') {
      formData.append('exequaturNumber', exequaturNumber);
      formData.append('firmName', firmName);
    } else if (roleType === 'STUDENT') {
      formData.append('university', university);
      formData.append('matricula', matricula);
    } else if (roleType === 'LEGAL_ADMIN') {
      formData.append('institution', institution);
    }

    const res = await registerAction(null, formData);
    if (res?.error) {
      setError(res.error);
      setLoading(false);
    } else if (res?.success) {
      setIsSuccessPending(true);
      setLoading(false);
    }
  }

  if (isSuccessPending) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-lg">
          <div className="bg-white py-10 px-8 shadow-2xl rounded-3xl sm:px-12 border border-slate-200 text-center space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto shadow-md animate-bounce">
              <Clock className="w-8 h-8 text-amber-600" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200 inline-block">
                Solicitud en Revisión
              </span>
              <h2 className="text-2xl font-serif font-bold text-slate-900">
                ¡Solicitud de Cuenta Enviada con Éxito!
              </h2>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 leading-relaxed font-serif text-left space-y-2">
              <p>
                Hemos recibido tu solicitud de registro como <strong>{fullName}</strong> para el perfil de{' '}
                <strong className="text-amber-800">
                  {roleType === 'LAWYER'
                    ? 'Abogado Litigante'
                    : roleType === 'STUDENT'
                    ? 'Estudiante de Derecho'
                    : roleType === 'LEGAL_ADMIN'
                    ? 'Editor Jurídico'
                    : 'Usuario Particular'}
                </strong>.
              </p>
              <p className="pt-2 border-t border-slate-200">
                🔔 <strong>Notificación al SuperAdministrador:</strong> El Administrador Principal del Sistema ha recibido la notificación con tus datos de acreditación para validar y activar tu cuenta.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <Link
                href="/login"
                className="w-full inline-flex justify-center items-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              >
                <span>Ir a Iniciar Sesión</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/"
                className="block text-xs font-semibold text-slate-500 hover:text-slate-700"
              >
                Volver a la Página Principal
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <div className="w-12 h-12 rounded-xl bg-slate-800 border border-amber-500/30 text-amber-400 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <Scale className="w-7 h-7" />
          </div>
          <span className="font-serif font-bold text-2xl text-white">
            Legal <span className="text-amber-400">RD</span>
          </span>
        </Link>
        <h2 className="text-2xl font-serif font-bold text-white tracking-tight">
          Solicitud de Cuenta Jurídica
        </h2>
        <p className="text-xs text-slate-400">
          Registro por rol con validación y aprobación por el SuperAdministrador.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-6 shadow-2xl rounded-3xl sm:px-10 border border-slate-200">
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Selección de Tipo de Perfil */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Selecciona tu Perfil Profesional / Académico
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setRoleType('LAWYER')}
                  className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all text-center cursor-pointer ${
                    roleType === 'LAWYER'
                      ? 'border-amber-600 bg-amber-50 text-amber-950 font-bold ring-2 ring-amber-500/30'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Briefcase className="w-5 h-5 text-amber-600" />
                  <span className="text-xs">Abogado</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRoleType('STUDENT')}
                  className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all text-center cursor-pointer ${
                    roleType === 'STUDENT'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/30'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <GraduationCap className="w-5 h-5 text-emerald-600" />
                  <span className="text-xs">Estudiante</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRoleType('FREE_USER')}
                  className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all text-center cursor-pointer ${
                    roleType === 'FREE_USER'
                      ? 'border-blue-600 bg-blue-50 text-blue-950 font-bold ring-2 ring-blue-500/30'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Globe className="w-5 h-5 text-blue-600" />
                  <span className="text-xs">Particular</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRoleType('LEGAL_ADMIN')}
                  className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all text-center cursor-pointer ${
                    roleType === 'LEGAL_ADMIN'
                      ? 'border-purple-600 bg-purple-50 text-purple-950 font-bold ring-2 ring-purple-500/30'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Building className="w-5 h-5 text-purple-600" />
                  <span className="text-xs">Editor</span>
                </button>
              </div>
            </div>

            {/* Datos Generales */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nombre y Apellidos
                </label>
                <div className="relative rounded-lg shadow-xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ej. Lic. Manuel de Jesús Troncoso"
                    className="block w-full pl-9 pr-3 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 bg-slate-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Teléfono / WhatsApp
                </label>
                <div className="relative rounded-lg shadow-xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (809) 000-0000"
                    className="block w-full pl-9 pr-3 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 bg-slate-50/50"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Correo Electrónico
              </label>
              <div className="relative rounded-lg shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nombre@ejemplo.do"
                  className="block w-full pl-9 pr-3 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 bg-slate-50/50"
                />
              </div>
            </div>

            {/* Campos Contextuales por Rol */}
            {roleType === 'LAWYER' && (
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
                <span className="text-xs font-bold text-amber-900 block">
                  Acreditación de Abogado (Colegio de Abogados de RD)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      No. de Exequátur / Colegiatura CARD:
                    </label>
                    <input
                      type="text"
                      required
                      value={exequaturNumber}
                      onChange={(e) => setExequaturNumber(e.target.value)}
                      placeholder="Ej. CARD-12345-2020"
                      className="block w-full p-2.5 text-xs border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Bufete o Firma Jurídica:
                    </label>
                    <input
                      type="text"
                      value={firmName}
                      onChange={(e) => setFirmName(e.target.value)}
                      placeholder="Ej. Troncoso & Asociados"
                      className="block w-full p-2.5 text-xs border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>
              </div>
            )}

            {roleType === 'STUDENT' && (
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3">
                <span className="text-xs font-bold text-emerald-900 block">
                  Acreditación Universitaria
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Universidad (UASD, PUCMM, UNIBE, etc.):
                    </label>
                    <input
                      type="text"
                      required
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      placeholder="Ej. UASD Sede Central"
                      className="block w-full p-2.5 text-xs border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Matrícula Estudiantil:
                    </label>
                    <input
                      type="text"
                      required
                      value={matricula}
                      onChange={(e) => setMatricula(e.target.value)}
                      placeholder="Ej. 10058912"
                      className="block w-full p-2.5 text-xs border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>
              </div>
            )}

            {roleType === 'LEGAL_ADMIN' && (
              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-3">
                <span className="text-xs font-bold text-purple-900 block">
                  Institución u Órgano del Estado
                </span>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Institución (Poder Judicial, PGR, Congreso Nacional):
                  </label>
                  <input
                    type="text"
                    required
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="Ej. Suprema Corte de Justicia"
                    className="block w-full p-2.5 text-xs border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Contraseña (Mínimo 8 caracteres)
              </label>
              <div className="relative rounded-lg shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-9 pr-3 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 bg-slate-50/50"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-xl shadow-md text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 focus:outline-hidden focus:ring-2 focus:ring-slate-900 transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <span>Enviando solicitud...</span>
              ) : (
                <>
                  <span>Enviar Solicitud de Registro al SuperAdmin</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500">
            ¿Ya tienes una cuenta aprobada?{' '}
            <Link href="/login" className="font-semibold text-amber-600 hover:text-amber-700">
              Inicia sesión aquí
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}