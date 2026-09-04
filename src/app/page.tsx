/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Módulo: Página de Inicio / Centro de Mando Principal de Legal RD
 * Ruta: src/app/page.tsx
 * Ámbito Legal: Portal de Entrada y Accesos Directos
 * 
 * PROPÓSITO:
 * Portada completa con buscador semántico prominente, Centro de Mando de 11 Accesos Rápidos (Sección 45), catálogo de 42 especialidades, novedades y accesos a herramientas interactivas.
 * 
 * FUNDAMENTOS NORMATIVOS:
 * Presentación del ecosistema jurídico dominicano.
 * 
 * REGLA FUNDAMENTAL DE PRESERVACIÓN ACUMULATIVA:
 * Este archivo forma parte del ecosistema integral de Legal RD.
 * No se permite eliminar, simplificar ni alterar la lógica preexistente.
 * ====================================================================
 */

import Link from 'next/link';
import {
  Search,
  BookOpen,
  Scale,
  FileText,
  ArrowRight,
  ShieldCheck,
  History,
  FolderKanban,
  GraduationCap,
  Sparkles,
  Clock,
  Briefcase,
  GitFork,
  Bookmark,
  Brain,
  Award,
  Globe,
  Bell,
  Compass,
  Building2,
  FileCheck
} from 'lucide-react';

const INITIAL_SPECIALTIES = [
  { name: "Derecho Laboral", slug: "derecho-laboral", desc: "Código de Trabajo (Ley 16-92), contratos, desahucio, prestaciones y jurisprudencia laboral." },
  { name: "Derecho Penal", slug: "derecho-penal", desc: "Código Penal, tipos penales, sanciones, medidas y doctrina punitiva." },
  { name: "Derecho Procesal Penal", slug: "derecho-procesal-penal", desc: "Código Procesal Penal (Ley 76-02), medidas de coerción y juicio oral." },
  { name: "Derecho Civil", slug: "derecho-civil", desc: "Código Civil, obligaciones, contratos, responsabilidad civil y derechos reales." },
  { name: "Derecho Procesal Civil", slug: "derecho-procesal-civil", desc: "Código de Procedimiento Civil, Ley 2-23 de Casación, demandas, incidentes y embargos." },
  { name: "Derecho Inmobiliario", slug: "derecho-inmobiliario", desc: "Ley 108-05 de Registro Inmobiliario, deslindes, transferencias y títulos de propiedad." },
  { name: "Derecho Constitucional", slug: "derecho-constitucional", desc: "Constitución Dominicana de 2015/2024, acciones de amparo y sentencias del Tribunal Constitucional." },
  { name: "Derecho Comercial y Societario", slug: "derecho-comercial", desc: "Ley 479-08 de Sociedades Comerciales, empresas individuales y contratos mercantiles." },
];

/**
 * Componente Principal de Vista: `HomePage`
 * Renderiza la interfaz de usuario interactiva y coordina el flujo operativo del módulo.
 * @returns Elemento JSX representativo de la página o vista
 */
export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section con Buscador Prominente */}
      <section className="relative bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Plataforma y Sistema Operativo del Derecho Dominicano
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold tracking-tight text-white leading-tight">
            Consulta, estudio y gestión estructurada del <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">Derecho Dominicano</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Ecosistema jurídico digital integral: leyes, jurisprudencia, plazos, trámites, expedientes, inteligencia artificial con fuentes obligatorias y formación académica.
          </p>

          {/* Barra de Búsqueda Principal */}
          <div className="pt-4 max-w-3xl mx-auto">
            <form action="/buscar" method="GET" className="relative flex items-center shadow-2xl rounded-2xl bg-white p-2">
              <Search className="w-6 h-6 text-slate-400 ml-3 shrink-0" />
              <input
                type="text"
                name="q"
                placeholder="Busca por ley, artículo, palabra clave o lenguaje natural (ej. 'me chocaron el vehículo', 'Art. 80', 'Ley 2-23')..."
                className="w-full px-4 py-3 text-slate-900 placeholder-slate-400 bg-transparent focus:outline-hidden text-sm sm:text-base"
              />
              <button
                type="submit"
                className="bg-slate-900 hover:bg-slate-800 text-amber-400 font-semibold px-6 py-3 rounded-xl transition-all flex items-center gap-2 shrink-0 text-sm sm:text-base cursor-pointer shadow-md"
              >
                <span>Buscar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-slate-400">
              <span className="font-medium text-slate-300">Búsquedas frecuentes:</span>
              <Link href="/buscar?q=Ley+16-92" className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-amber-300 transition-colors">
                Ley 16-92 (Trabajo)
              </Link>
              <Link href="/buscar?q=desahucio" className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-amber-300 transition-colors">
                Desahucio
              </Link>
              <Link href="/buscar?q=Ley+2-23" className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-amber-300 transition-colors">
                Ley 2-23 (Casación)
              </Link>
              <Link href="/buscar?q=Ley+108-05" className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-amber-300 transition-colors">
                Ley 108-05 (Inmobiliario)
              </Link>
              <Link href="/buscar?q=amparo" className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-amber-300 transition-colors">
                Acción de Amparo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 45: DASHBOARD PRINCIPAL — 11 ACCESOS RÁPIDOS */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-xs uppercase tracking-widest text-amber-600 font-bold mb-1">
              Centro de Mando del Derecho Dominicano
            </h2>
            <h3 className="text-2xl font-serif font-bold text-slate-900">
              11 Accesos Rápidos a los Módulos Fundamentales
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 text-center">
            {/* 1. Buscar una ley */}
            <Link
              href="/buscar?type=norm"
              className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 hover:border-amber-400 transition-all flex flex-col items-center justify-center gap-2 group shadow-2xs"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Search className="w-5 h-5" />
              </div>
              <span className="font-bold text-xs text-slate-900">1. Buscar una ley</span>
            </Link>

            {/* 2. Buscar un artículo */}
            <Link
              href="/normas/codigo-de-trabajo-ley-16-92"
              className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 hover:border-amber-400 transition-all flex flex-col items-center justify-center gap-2 group shadow-2xs"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-bold text-xs text-slate-900">2. Buscar un artículo</span>
            </Link>

            {/* 3. Buscar jurisprudencia */}
            <Link
              href="/jurisprudencia"
              className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 hover:border-amber-400 transition-all flex flex-col items-center justify-center gap-2 group shadow-2xs"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                <Scale className="w-5 h-5" />
              </div>
              <span className="font-bold text-xs text-slate-900">3. Jurisprudencia SCJ/TC</span>
            </Link>

            {/* 4. Consultar una materia */}
            <Link
              href="/especialidades"
              className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 hover:border-amber-400 transition-all flex flex-col items-center justify-center gap-2 group shadow-2xs"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                <Award className="w-5 h-5" />
              </div>
              <span className="font-bold text-xs text-slate-900">4. Las 42 Especialidades</span>
            </Link>

            {/* 5. Preguntar a Legal RD AI */}
            <Link
              href="/asistente-ia"
              className="p-4 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-300 transition-all flex flex-col items-center justify-center gap-2 group shadow-2xs"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-bold text-xs text-amber-950">5. Legal RD AI</span>
            </Link>

            {/* 6. Construir un caso */}
            <Link
              href="/construye-mi-caso"
              className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 hover:border-amber-400 transition-all flex flex-col items-center justify-center gap-2 group shadow-2xs"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                <Scale className="w-5 h-5" />
              </div>
              <span className="font-bold text-xs text-slate-900">6. Construir un caso</span>
            </Link>

            {/* 7. Calcular un plazo */}
            <Link
              href="/calculadora-plazos"
              className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 hover:border-amber-400 transition-all flex flex-col items-center justify-center gap-2 group shadow-2xs"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                <Clock className="w-5 h-5" />
              </div>
              <span className="font-bold text-xs text-slate-900">7. Calcular un plazo</span>
            </Link>

            {/* 8. Consultar trámites */}
            <Link
              href="/tramites"
              className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 hover:border-amber-400 transition-all flex flex-col items-center justify-center gap-2 group shadow-2xs"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                <FolderKanban className="w-5 h-5" />
              </div>
              <span className="font-bold text-xs text-slate-900">8. Consultar trámites</span>
            </Link>

            {/* 9. Mis favoritos */}
            <Link
              href="/favoritos"
              className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 hover:border-amber-400 transition-all flex flex-col items-center justify-center gap-2 group shadow-2xs"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                <Bookmark className="w-5 h-5" />
              </div>
              <span className="font-bold text-xs text-slate-900">9. Mis favoritos</span>
            </Link>

            {/* 10. Mis investigaciones */}
            <Link
              href="/investigacion"
              className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 hover:border-amber-400 transition-all flex flex-col items-center justify-center gap-2 group shadow-2xs"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                <Brain className="w-5 h-5" />
              </div>
              <span className="font-bold text-xs text-slate-900">10. Mis investigaciones</span>
            </Link>

            {/* 11. Mis expedientes */}
            <Link
              href="/expedientes"
              className="p-4 rounded-2xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-all flex flex-col items-center justify-center gap-2 group shadow-2xs col-span-2 sm:col-span-1"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-900 text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="font-bold text-xs text-indigo-950">11. Mis expedientes</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Relación Estructurada del Sistema */}
      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-xs uppercase tracking-widest text-amber-600 font-bold mb-2">Arquitectura del Conocimiento</h2>
            <h3 className="text-2xl font-serif font-bold text-slate-900">Estructura Jerárquica Integral</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 text-center">
            {[
              { title: "Materia", icon: BookOpen, color: "bg-slate-100 text-slate-800" },
              { title: "Especialidad", icon: Scale, color: "bg-amber-50 text-amber-800" },
              { title: "Fuente Oficial", icon: ShieldCheck, color: "bg-blue-50 text-blue-800" },
              { title: "Código / Ley", icon: FileText, color: "bg-indigo-50 text-indigo-800" },
              { title: "Artículos", icon: BookOpen, color: "bg-emerald-50 text-emerald-800" },
              { title: "Jurisprudencia", icon: Scale, color: "bg-purple-50 text-purple-800" },
              { title: "Procedimientos", icon: FolderKanban, color: "bg-rose-50 text-rose-800" },
            ].map((step, idx) => (
              <div key={idx} className={`p-4 rounded-xl border border-slate-200/80 ${step.color} flex flex-col items-center justify-center gap-2 shadow-2xs`}>
                <step.icon className="w-5 h-5 opacity-80" />
                <span className="font-semibold text-xs">{step.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Especialidades Jurídicas Destacadas */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="text-xs uppercase tracking-widest text-amber-600 font-bold mb-2">Especialidades del Derecho Dominicano</h2>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">Explora por Rama Jurídica</h3>
          </div>
          <Link href="/especialidades" className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-800 hover:text-amber-600 transition-colors">
            <span>Ver las 42 especialidades</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INITIAL_SPECIALTIES.map((spec) => (
            <Link
              key={spec.slug}
              href={`/especialidades/${spec.slug}`}
              className="group p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-lg hover:border-amber-500/40 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-900 group-hover:bg-amber-600 text-amber-400 group-hover:text-white flex items-center justify-center mb-4 transition-colors">
                  <Scale className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-lg text-slate-900 group-hover:text-amber-700 transition-colors mb-2">
                  {spec.name}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {spec.desc}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600 group-hover:text-amber-600">
                <span>Explorar normas</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Características del Sistema para Profesionales y Estudiantes */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-2">Capacidades del Sistema</h2>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">Herramientas Profesionales para el Ámbito Jurídico</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/historial" className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-4 hover:border-amber-400 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 group-hover:scale-105 transition-transform">
                <History className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-serif font-bold text-white group-hover:text-amber-300">Historial y Comparador ANTES vs. DESPUÉS</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Trazabilidad de modificaciones legislativas (Ley 2-23 vs 3726 de casación, Ley 4-23 de registro civil). Visualiza qué cambió exactamente sin perder el texto histórico.
              </p>
            </Link>

            <Link href="/expedientes" className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-4 hover:border-blue-400 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30 group-hover:scale-105 transition-transform">
                <Briefcase className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-serif font-bold text-white group-hover:text-blue-300">Gestor Profesional de Expedientes</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Control de clientes, audiencias fijadas, vencimientos perentorios, notas confidenciales de litigio y documentos adjuntos aislados por cuenta.
              </p>
            </Link>

            <Link href="/universidad" className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-4 hover:border-emerald-400 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-serif font-bold text-white group-hover:text-emerald-300">Modo Universidad & Laboratorio</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Casos prácticos simulados donde identificas problemas jurídicos, normas, tribunales y pruebas, con retroalimentación docente y cuestionarios oficiales.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
