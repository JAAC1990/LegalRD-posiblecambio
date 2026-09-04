/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Archivo: src/app/(dashboard)/universidad/page.tsx
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
import {
  GraduationCap,
  BookOpen,
  Award,
  Sparkles,
  Scale,
  ArrowRight,
  CheckCircle2,
  FileText,
  Brain,
  Layers
} from 'lucide-react';

const ACADEMIC_MODULES = [
  {
    title: 'Laboratorio de Casos Hipotéticos',
    desc: 'Simulaciones prácticas de litigios dominicanos donde identificas problemas, normas, pruebas y tribunales con corrección inmediata.',
    url: '/laboratorio-casos',
    icon: Scale,
    badge: 'Interactivo',
    color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
  {
    title: 'Cuestionarios y Evaluaciones por Materia',
    desc: 'Bancos de preguntas sobre Código de Trabajo, Código Civil, Constitución y Derecho Procesal Dominicano.',
    url: '/estudiante',
    icon: Award,
    badge: 'Evaluación',
    color: 'bg-amber-50 text-amber-800 border-amber-200',
  },
  {
    title: 'Glosario y Fichas de Conceptos Jurídicos',
    desc: 'Fichas completas de prescripción, desahucio, astreinte, litis sobre derechos registrados y tutela judicial.',
    url: '/conceptos',
    icon: BookOpen,
    badge: 'Doctrina',
    color: 'bg-indigo-50 text-indigo-800 border-indigo-200',
  },
  {
    title: 'Doctrina Jurídica Dominicana',
    desc: 'Tratados, libros y monografías de juristas clásicos y contemporáneos de la República Dominicana.',
    url: '/doctrina',
    icon: FileText,
    badge: 'Bibliografía',
    color: 'bg-purple-50 text-purple-800 border-purple-200',
  },
  {
    title: 'Grafo Jurídico Interactivo',
    desc: 'Mapa mental de conexiones entre artículos, jurisprudencia de la SCJ y procedimientos procesales.',
    url: '/grafo',
    icon: Layers,
    badge: 'Mapas Mentales',
    color: 'bg-rose-50 text-rose-800 border-rose-200',
  },
  {
    title: 'Cuaderno de Investigación',
    desc: 'Organizador de monografías, tesis de grado, recopilación de artículos y generador de citas oficiales.',
    url: '/investigacion',
    icon: Brain,
    badge: 'Tesis y Artículos',
    color: 'bg-blue-50 text-blue-800 border-blue-200',
  },
];

/**
 * Componente Principal de Vista: `UniversidadHubPage`
 * Renderiza la interfaz de usuario interactiva y coordina el flujo operativo del módulo.
 * @returns Elemento JSX representativo de la página o vista
 */
export default function UniversidadHubPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full">
      {/* Cabecera */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" />
            <span>Modo Universidad — Entorno Académico Dominicano</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-white leading-tight">
            Portal Universitario de Derecho
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            Entorno integral diseñado para estudiantes de Derecho, docentes e investigadores. Combina laboratorios de casos prácticos, cuestionarios de autoevaluación, mapas conceptuales y asistencia pedagógica de Legal RD AI.
          </p>

          <div className="pt-2">
            <Link
              href="/asistente-ia?modo=estudiante"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-colors shadow-xs"
            >
              <Sparkles className="w-4 h-4" />
              <span>Abrir Legal RD AI en Modo Estudiante (Pedagógico)</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Grid de Módulos Universitarios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ACADEMIC_MODULES.map((mod, idx) => (
          <Link
            key={idx}
            href={mod.url}
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-md hover:border-amber-400 transition-all flex flex-col justify-between group space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-slate-900 text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <mod.icon className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${mod.color}`}>
                  {mod.badge}
                </span>
              </div>

              <h2 className="font-serif font-bold text-lg text-slate-900 group-hover:text-amber-700 transition-colors">
                {mod.title}
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                {mod.desc}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700 group-hover:text-amber-600">
              <span>Ingresar al módulo</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
