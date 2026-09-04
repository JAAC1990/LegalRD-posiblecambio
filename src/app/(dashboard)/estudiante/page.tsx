/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Archivo: src/app/(dashboard)/estudiante/page.tsx
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
import { DOMINICAN_QUIZZES } from '@/lib/data/quizzes';
import { GraduationCap, BookOpen, Play } from 'lucide-react';

/**
 * Componente Principal de Vista: `EstudiantePage`
 * Renderiza la interfaz de usuario interactiva y coordina el flujo operativo del módulo.
 * @returns Elemento JSX representativo de la página o vista
 */
export default function EstudiantePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
          <GraduationCap className="w-4 h-4 text-emerald-600" />
          <span>Módulo Educativo Jurídico Dominicano</span>
        </div>
        <h1 className="text-3xl font-serif font-bold text-slate-900">
          Cuestionarios de Evaluación con Base Legal
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Practica con cuestionarios interactivos basados en artículos de leyes dominicanas con retroalimentación inmediata y fundamento legal directo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {DOMINICAN_QUIZZES.map((quiz) => (
          <div
            key={quiz.id}
            className="p-7 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
                  {quiz.specialty}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {quiz.difficulty} • {quiz.questions.length} Preguntas
                </span>
              </div>

              <h2 className="font-serif font-bold text-xl text-slate-900">
                {quiz.title}
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed">
                {quiz.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                <span>Tiempo sugerido: {quiz.timeLimitMinutes} min</span>
              </div>

              <Link
                href={'/estudiante/cuestionario/' + quiz.id}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs font-bold shadow-xs transition-colors"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Iniciar Cuestionario</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
