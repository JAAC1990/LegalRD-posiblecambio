/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Archivo: src/app/(admin)/admin/page.tsx
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
import { getPendingRequestsCount } from '@/lib/data/userManagement';
import {
  Award,
  BookOpen,
  Scale,
  FolderKanban,
  Users,
  ShieldCheck,
  History,
  ArrowRight,
  TrendingUp,
  FileCheck2,
  UploadCloud,
  Layers,
  GitFork,
  Sparkles,
  Bell
} from 'lucide-react';

const ADMIN_METRICS = [
  { title: 'Ramas Jurídicas Registradas', value: '42', desc: 'Taxonomía del Derecho Dominicano', icon: Award, href: '/especialidades', color: 'text-amber-600 bg-amber-50' },
  { title: 'Fuentes del Derecho', value: '19', desc: 'Constitución, Leyes, Decretos, Reglamentos', icon: Layers, href: '/fuentes', color: 'text-blue-600 bg-blue-50' },
  { title: 'Artículos Estructurados', value: '738', desc: 'Código de Trabajo (Ley 16-92)', icon: FileCheck2, href: '/normas/codigo-de-trabajo-ley-16-92', color: 'text-emerald-600 bg-emerald-50' },
  { title: 'Relaciones Normativas', value: '8', desc: 'Derogaciones, Modificaciones y Decretos', icon: GitFork, href: '/relaciones', color: 'text-purple-600 bg-purple-50' },
  { title: 'Jurisprudencia Vinculada', value: 'SCJ & TC', desc: 'Tribunales de casación y garantías', icon: Scale, href: '/jurisprudencia', color: 'text-indigo-600 bg-indigo-50' },
  { title: 'Eventos de Auditoría', value: 'Inmutable', desc: 'Registro de cambios de contenido', icon: History, href: '/admin/auditoria', color: 'text-rose-600 bg-rose-50' },
];

/**
 * Componente Principal de Vista: `AdminDashboardPage`
 * Renderiza la interfaz de usuario interactiva y coordina el flujo operativo del módulo.
 * @returns Elemento JSX representativo de la página o vista
 */
export default async function AdminDashboardPage() {
  const pendingCount = await getPendingRequestsCount();

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900">Dashboard Administrativo</h1>
          <p className="text-xs text-slate-500 mt-1">
            Monitoreo, ingesta y administración del repositorio legal estructurado de la República Dominicana.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/notificaciones"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span>Notificaciones de Usuarios</span>
            {pendingCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-slate-950 text-amber-300 text-[11px] font-extrabold animate-pulse">
                {pendingCount}
              </span>
            )}
          </Link>

          <Link
            href="/admin/importar"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs shadow-md transition-all cursor-pointer w-fit"
          >
            <UploadCloud className="w-4 h-4" />
            <span>⚡ Importar & Parser de Leyes</span>
          </Link>
        </div>
      </div>

      {/* Tarjeta de Alerta y Notificación Directa para el SuperUsuario */}
      <div className={`p-6 rounded-3xl border transition-all shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 ${
        pendingCount > 0
          ? 'bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-white border-amber-300 ring-1 ring-amber-400/30'
          : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${
            pendingCount > 0 ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 text-slate-600'
          }`}>
            <Bell className={`w-6 h-6 ${pendingCount > 0 ? 'animate-bounce' : ''}`} />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                pendingCount > 0 ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-slate-100 text-slate-700'
              }`}>
                Centro de Notificaciones & Control de Acceso
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Período de Prueba de 15 Días
              </span>
            </div>
            <h2 className="text-lg font-serif font-bold text-slate-900">
              {pendingCount > 0
                ? `Tienes ${pendingCount} ${pendingCount === 1 ? 'nueva solicitud de acceso pendiente' : 'nuevas solicitudes de acceso pendientes'}`
                : 'Sin solicitudes pendientes de aprobación'}
            </h2>
            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
              {pendingCount > 0
                ? 'Nuevos profesionales y estudiantes de derecho solicitan unirse a Legal RD. Revisa sus credenciales de colegiatura (CARD / Universidad) y concédeles acceso con 15 días de prueba gratuita.'
                : 'Todas las solicitudes han sido gestionadas. Puedes consultar la lista de usuarios activos, monitorear el consumo de sus 15 días de prueba u otorgar extensiones adicionales.'}
            </p>
          </div>
        </div>

        <Link
          href="/admin/notificaciones"
          className={`px-5 py-3 rounded-2xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 shrink-0 ${
            pendingCount > 0
              ? 'bg-slate-900 hover:bg-slate-800 text-amber-400'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
          }`}
        >
          <span>{pendingCount > 0 ? 'Revisar & Dar Acceso (15 Días)' : 'Ver Notificaciones'}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Tarjetas de Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {ADMIN_METRICS.map((metric, idx) => (
          <Link
            key={idx}
            href={metric.href}
            className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-amber-500/40 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${metric.color}`}>
                  <metric.icon className="w-5 h-5" />
                </div>
                <span className="text-2xl font-bold font-serif text-slate-900">{metric.value}</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 text-sm">{metric.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{metric.desc}</p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600 group-hover:text-amber-600">
              <span>Gestionar módulo</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      {/* Acceso Destacado al Importador */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-8 border border-slate-700 shadow-md space-y-4 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Motor Automatizado de Ingesta</span>
          </div>
          <h2 className="font-serif font-bold text-xl text-white">
            ¿Deseas agregar una nueva ley o código dominicano?
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed font-serif">
            Usa el Importador y Parser OCR para pegar o cargar el texto legal de la Gaceta Oficial. El motor detectará los Libros, Títulos, Capítulos, Artículos y Párrafos de forma automática.
          </p>
        </div>

        <Link
          href="/admin/importar"
          className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 shrink-0 self-start sm:self-center"
        >
          <span>Abrir Importador</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}