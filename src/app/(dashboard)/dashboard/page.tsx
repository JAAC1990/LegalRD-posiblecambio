/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Archivo: src/app/(dashboard)/dashboard/page.tsx
 * Área: Área Profesional y Privada (Despacho / Universidad)
 * 
 * DESCRIPCIÓN:
 * Gestión privada de causas judiciales, audiencias, clientes, expedientes y laboratorio de casos académicos.
 * 
 * CONTEXTO DE APLICACIÓN:
 * Diseñado conforme a las normas procesales y sustantivas vigentes
 * en la República Dominicana (Código Civil, Código de Trabajo,
 * Código de Procedimiento Civil, Ley 108-05, Ley 2-23, Ley 137-11).
 * ====================================================================
 */

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { logoutAction } from '@/lib/actions/auth';
import {
  BookOpen,
  Bookmark,
  FileEdit,
  FolderKanban,
  GraduationCap,
  Scale,
  ShieldCheck,
  Search,
  LogOut,
  User,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const ROLE_LABELS: Record<string, { label: string; color: string }> = {
  SUPER_ADMIN: { label: 'Super Administrador', color: 'bg-rose-100 text-rose-800 border-rose-200' },
  LEGAL_ADMIN: { label: 'Administrador Jurídico', color: 'bg-purple-100 text-purple-800 border-purple-200' },
  LAWYER: { label: 'Abogado Colegiado', color: 'bg-amber-100 text-amber-800 border-amber-200' },
  STUDENT: { label: 'Estudiante de Derecho', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  FREE_USER: { label: 'Usuario Gratuito', color: 'bg-slate-100 text-slate-800 border-slate-200' },
  PREMIUM_USER: { label: 'Usuario Premium', color: 'bg-blue-100 text-blue-800 border-blue-200' },
};

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  const roleInfo = ROLE_LABELS[session.roleType] || ROLE_LABELS.FREE_USER;
  const isAdmin = session.roleType === 'SUPER_ADMIN' || session.roleType === 'LEGAL_ADMIN';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
      {/* Cabecera del Usuario */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 text-amber-400 flex items-center justify-center font-serif text-2xl font-bold shadow-md shrink-0">
            {session.fullName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                {session.fullName}
              </h1>
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${roleInfo.color}`}>
                {roleInfo.label}
              </span>
            </div>
            <p className="text-xs text-slate-500">{session.email}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {isAdmin && (
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-900 text-xs font-bold shadow-xs transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Panel de Control Admin</span>
            </Link>
          )}

          <form action={logoutAction}>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-slate-400" />
              <span>Cerrar Sesión</span>
            </button>
          </form>
        </div>
      </div>

      {/* Accesos Rápidos del Espacio de Trabajo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Link
          href="/favoritos"
          className="p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-amber-500/40 hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Bookmark className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-slate-900">Mis Favoritos</h3>
            <p className="text-xs text-slate-500">
              Leyes, artículos y sentencias guardadas para consulta inmediata.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-600">
            <span>Ver guardados</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/notas"
          className="p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-500/40 hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <FileEdit className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-slate-900">Notas Privadas</h3>
            <p className="text-xs text-slate-500">
              Anotaciones doctrinales vinculadas directamente a preceptos legales.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
            <span>Abrir libreta</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/carpetas"
          className="p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-purple-500/40 hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <FolderKanban className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-slate-900">Carpetas de Casos</h3>
            <p className="text-xs text-slate-500">
              Organiza expedientes, normas y jurisprudencia por caso o materia.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-purple-600">
            <span>Gestionar expedientes</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/estudiante"
          className="p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-500/40 hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-slate-900">Modo Estudiante</h3>
            <p className="text-xs text-slate-500">
              Cuestionarios jurídicos clasificados por materia con base legal.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-600">
            <span>Practicar quizzes</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* Sección de Consulta Rápida */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Motor de Consulta Jurídica Dominicana</span>
          </div>
          <h2 className="text-2xl font-serif font-bold">
            ¿Necesitas consultar un artículo o ley específica?
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Busca en tiempo real entre el Código de Trabajo, Código Civil, Ley Inmobiliaria, sentencias de la SCJ y más.
          </p>
        </div>
        <Link
          href="/buscar"
          className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-sm shadow-md transition-all flex items-center gap-2 shrink-0"
        >
          <Search className="w-4 h-4" />
          <span>Ir al Buscador Avanzado</span>
        </Link>
      </div>
    </div>
  );
}
