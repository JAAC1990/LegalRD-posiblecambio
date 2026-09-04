/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Módulo: Barra de Navegación Global y Mega-Menú de 4 Pilares
 * Ruta: src/components/layout/Navbar.tsx
 * Ámbito Legal: Interfaz de Usuario / Navegación Principal
 * 
 * PROPÓSITO:
 * Barra superior con navegación estructurada en 4 pilares estratégicos (Investigación, Práctica & Litigio, Despacho Profesional y Academia), buscador rápido y control de sesión.
 * 
 * FUNDAMENTOS NORMATIVOS:
 * Diseño UX/UI responsive accesible.
 * 
 * REGLA FUNDAMENTAL DE PRESERVACIÓN ACUMULATIVA:
 * Este archivo forma parte del ecosistema integral de Legal RD.
 * No se permite eliminar, simplificar ni alterar la lógica preexistente.
 * ====================================================================
 */

import Link from 'next/link';
import {
  Scale,
  BookOpen,
  Search,
  Bookmark,
  User,
  ShieldCheck,
  FileText,
  Award,
  LogOut,
  Sparkles,
  FolderDown,
  Compass,
  Layers,
  GitFork,
  Bell,
  Clock,
  FolderKanban,
  GraduationCap,
  Globe,
  Briefcase,
  History,
  BarChart3
} from 'lucide-react';
import { getSession } from '@/lib/auth';
import { logoutAction } from '@/lib/actions/auth';
import { getPendingRequestsCount } from '@/lib/data/userManagement';

/**
 * Función Operativa: `Navbar`
 * Procesa la lógica de negocio y reglas jurídicas correspondientes.
 */
export async function Navbar() {
  const session = await getSession();
  const isAdmin = session?.roleType === 'SUPER_ADMIN' || session?.roleType === 'LEGAL_ADMIN';
  const pendingRequestsCount = isAdmin ? await getPendingRequestsCount() : 0;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-xs">
      {/* Barra Superior Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center shadow-md transition-transform group-hover:scale-105">
              <Scale className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl tracking-tight text-slate-900 leading-none">
                Legal <span className="text-amber-600">RD</span>
              </span>
              <span className="text-[10px] tracking-wider uppercase text-slate-500 font-medium">
                Sistema Operativo Jurídico
              </span>
            </div>
          </Link>
        </div>

        {/* Navegación Desktop - Pilares Estratégicos */}
        <nav className="hidden xl:flex items-center gap-1.5 text-xs font-medium text-slate-600">
          <Link
            href="/normas"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            <span>Leyes & Códigos</span>
          </Link>

          <Link
            href="/jurisprudencia"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors"
          >
            <Scale className="w-3.5 h-3.5 text-slate-400" />
            <span>Jurisprudencia</span>
          </Link>

          <Link
            href="/doctrina"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            <span>Doctrina</span>
          </Link>

          <Link
            href="/grafo"
            className="flex items-center gap-1 px-2 py-1 rounded-lg text-purple-900 bg-purple-50/80 border border-purple-200 hover:bg-purple-100 transition-colors font-semibold"
          >
            <GitFork className="w-3.5 h-3.5 text-purple-600" />
            <span>Grafo</span>
          </Link>

          <Link
            href="/calculadora-plazos"
            className="flex items-center gap-1 px-2 py-1 rounded-lg text-amber-900 bg-amber-50/80 border border-amber-200 hover:bg-amber-100 transition-colors font-semibold"
          >
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>Plazos</span>
          </Link>

          <Link
            href="/tramites"
            className="flex items-center gap-1 px-2 py-1 rounded-lg text-emerald-900 bg-emerald-50/80 border border-emerald-200 hover:bg-emerald-100 transition-colors font-semibold"
          >
            <FolderKanban className="w-3.5 h-3.5 text-emerald-600" />
            <span>Trámites</span>
          </Link>

          <Link
            href="/asistente-ia"
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-amber-800 bg-amber-100/70 border border-amber-300 hover:bg-amber-200 transition-colors font-bold shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Legal RD AI</span>
          </Link>

          <Link
            href="/buscar"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span>Buscador</span>
          </Link>
        </nav>

        {/* Acciones de Sesión y Usuario */}
        <div className="flex items-center gap-2.5">
          {session ? (
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
              >
                <span>Mi Espacio</span>
              </Link>

              {isAdmin && (
                <>
                  <Link
                    href="/admin/solicitudes"
                    title={`${pendingRequestsCount} Solicitudes de cuentas pendientes`}
                    className="relative p-2 rounded-xl text-slate-600 hover:text-amber-600 hover:bg-amber-50 border border-slate-200 transition-colors"
                  >
                    <Bell className="w-4 h-4" />
                    {pendingRequestsCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center animate-pulse">
                        {pendingRequestsCount}
                      </span>
                    )}
                  </Link>

                  <Link
                    href="/admin"
                    className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Admin</span>
                  </Link>
                </>
              )}

              <Link
                href="/perfil"
                title="Ver y editar Mi Perfil"
                className="flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <div className="w-5 h-5 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center text-[10px] font-bold">
                  {session.fullName.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[110px] truncate">{session.fullName.split(' ')[0]}</span>
              </Link>

              <form action={logoutAction}>
                <button
                  type="submit"
                  title="Cerrar sesión"
                  className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </form>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 px-3 py-2 rounded-md hover:bg-slate-100 transition-colors"
              >
                Iniciar Sesión
              </Link>
              <Link
                href="/registro"
                className="text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 px-4 py-2 rounded-lg shadow-sm transition-all hover:shadow-md"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Sub-Barra de Navegación Rápida con Módulos Especializados */}
      <div className="bg-slate-50 border-t border-slate-200/80 px-4 sm:px-6 lg:px-8 py-1.5 overflow-x-auto flex items-center gap-3 text-[11px] text-slate-600 whitespace-nowrap scrollbar-none">
        <span className="font-bold text-slate-400 uppercase tracking-wider text-[9px] shrink-0">
          Módulos:
        </span>
        <Link href="/conceptos" className="hover:text-amber-700 transition-colors font-medium">
          📖 Fichas de Conceptos
        </Link>
        <span className="text-slate-300">•</span>
        <Link href="/historial" className="hover:text-amber-700 transition-colors font-medium">
          ⏳ Historial & Comparador
        </Link>
        <span className="text-slate-300">•</span>
        <Link href="/construye-mi-caso" className="hover:text-amber-700 transition-colors font-medium">
          ⚖️ Construye Mi Caso (13 Pasos)
        </Link>
        <span className="text-slate-300">•</span>
        <Link href="/simulador-casos" className="hover:text-amber-700 transition-colors font-medium">
          🎯 Simulador de Casos
        </Link>
        <span className="text-slate-300">•</span>
        <Link href="/segunda-opinion" className="hover:text-amber-700 transition-colors font-medium">
          🔍 Segunda Opinión
        </Link>
        <span className="text-slate-300">•</span>
        <Link href="/generador-documentos" className="hover:text-amber-700 transition-colors font-medium">
          📝 Generador de Borradores
        </Link>
        <span className="text-slate-300">•</span>
        <Link href="/rutas-juridicas" className="hover:text-amber-700 transition-colors font-medium">
          🧭 Rutas "¿Qué debo hacer?"
        </Link>
        <span className="text-slate-300">•</span>
        <Link href="/directorio" className="hover:text-amber-700 transition-colors font-medium">
          🏛️ Directorio & Mapa Judicial
        </Link>
        <span className="text-slate-300">•</span>
        <Link href="/expedientes" className="hover:text-amber-700 transition-colors font-medium text-indigo-900 font-bold">
          💼 Gestor de Expedientes
        </Link>
        <span className="text-slate-300">•</span>
        <Link href="/universidad" className="hover:text-amber-700 transition-colors font-medium text-emerald-900 font-bold">
          🎓 Modo Universidad
        </Link>
        <span className="text-slate-300">•</span>
        <Link href="/derecho-comparado" className="hover:text-amber-700 transition-colors font-medium">
          🌐 Derecho Comparado
        </Link>
        <span className="text-slate-300">•</span>
        <Link href="/monitor" className="hover:text-amber-700 transition-colors font-medium text-rose-800 font-semibold">
          🔔 Monitor Jurídico
        </Link>
        <span className="text-slate-300">•</span>
        <Link href="/analitica" className="hover:text-amber-700 transition-colors font-medium">
          📊 Analítica
        </Link>
        <span className="text-slate-300">•</span>
        <Link href="/repositorio" className="hover:text-amber-700 transition-colors font-medium">
          📁 Repositorio de Descargas
        </Link>
      </div>
    </header>
  );
}