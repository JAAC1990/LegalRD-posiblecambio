'use client';

/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Archivo: src/app/(dashboard)/laboratorio-casos/page.tsx
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
import { useState } from 'react';
import Link from 'next/link';
import {
  DOMINICAN_CASE_LAB_SCENARIOS,
  HypotheticalCaseItem
} from '@/lib/data/caseLab';
import {
  GraduationCap,
  Scale,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  HelpCircle,
  RotateCcw
} from 'lucide-react';

/**
 * Componente Principal de Vista: `LaboratorioCasosPage`
 * Renderiza la interfaz de usuario interactiva y coordina el flujo operativo del módulo.
 * @returns Elemento JSX representativo de la página o vista
 */
export default function LaboratorioCasosPage() {
  const [selectedCase, setSelectedCase] = useState<HypotheticalCaseItem>(DOMINICAN_CASE_LAB_SCENARIOS[0]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentStep = selectedCase.steps[currentStepIndex];

  function handleSelectOption(optId: string) {
    if (hasAnswered) return;
    setSelectedOptionId(optId);
    setHasAnswered(true);

    const chosen = currentStep.options.find((o) => o.id === optId);
    if (chosen?.isCorrect) {
      setScore((s) => s + 1);
    }
  }

  function handleNextStep() {
    if (currentStepIndex < selectedCase.steps.length - 1) {
      setCurrentStepIndex((i) => i + 1);
      setSelectedOptionId(null);
      setHasAnswered(false);
    } else {
      setIsFinished(true);
    }
  }

  function handleRestart() {
    setCurrentStepIndex(0);
    setSelectedOptionId(null);
    setHasAnswered(false);
    setScore(0);
    setIsFinished(false);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full">
      {/* Botón Volver */}
      <Link
        href="/universidad"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-2xs hover:bg-slate-50 transition-colors w-fit"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver al Portal Universidad</span>
      </Link>

      {/* Cabecera */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
          <GraduationCap className="w-4 h-4 text-emerald-600" />
          <span>Formación Práctica de Litigación</span>
        </div>
        <h1 className="text-3xl font-serif font-bold text-slate-900">
          Laboratorio de Casos Hipotéticos
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Analiza el caso real planteado. Identifica paso a paso el problema jurídico, la norma aplicable, el tribunal competente y las pruebas necesarias con retroalimentación docente en tiempo real.
        </p>
      </div>

      {/* Caso Fáctico Planteado */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
            {selectedCase.specialtyName}
          </span>
          <span className="text-xs font-bold text-slate-500 uppercase">
            Nivel: {selectedCase.difficulty}
          </span>
        </div>

        <h2 className="font-serif font-bold text-xl text-slate-900">
          {selectedCase.title}
        </h2>

        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 font-serif text-xs sm:text-sm text-slate-800 leading-relaxed space-y-2">
          <span className="font-sans font-bold text-xs uppercase tracking-wider text-slate-500 block">
            Relación de los Hechos:
          </span>
          <p>{selectedCase.factsScenario}</p>
        </div>
      </div>

      {/* Módulo Interactivo de Pasos */}
      {!isFinished && currentStep ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="font-serif font-bold text-sm text-amber-700">
              {currentStep.stepTitle}
            </span>
            <span className="text-xs font-mono text-slate-400">
              Fase {currentStepIndex + 1} de {selectedCase.steps.length}
            </span>
          </div>

          <p className="font-bold text-sm text-slate-900">
            {currentStep.prompt}
          </p>

          <div className="space-y-3">
            {currentStep.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              let style = 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-300';

              if (hasAnswered) {
                if (opt.isCorrect) {
                  style = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-medium';
                } else if (isSelected && !opt.isCorrect) {
                  style = 'bg-rose-50 border-rose-400 text-rose-950';
                }
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  disabled={hasAnswered}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 text-xs leading-relaxed ${style}`}
                >
                  <span className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                    {hasAnswered && opt.isCorrect ? '✓' : hasAnswered && isSelected ? '✕' : ''}
                  </span>
                  <span>{opt.text}</span>
                </button>
              );
            })}
          </div>

          {/* Retroalimentación Didáctica Inmediata */}
          {hasAnswered && (
            <div className="space-y-4 pt-2">
              {(() => {
                const chosen = currentStep.options.find((o) => o.id === selectedOptionId);
                return (
                  <div
                    className={`p-4 rounded-2xl border text-xs space-y-1.5 ${
                      chosen?.isCorrect
                        ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                        : 'bg-amber-50/80 border-amber-300 text-amber-950'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold">
                      {chosen?.isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <HelpCircle className="w-4 h-4 text-amber-600" />
                      )}
                      <span>Fundamentación del Razonamiento:</span>
                    </div>
                    <p>{chosen?.feedback}</p>
                    <p className="text-[11px] text-slate-600 italic mt-1 pt-1 border-t border-slate-200/60">
                      💡 Consejo Pedagógico: {currentStep.pedagogicalTip}
                    </p>
                  </div>
                );
              })()}

              <div className="flex justify-end">
                <button
                  onClick={handleNextStep}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>
                    {currentStepIndex < selectedCase.steps.length - 1 ? 'Siguiente Fase del Caso' : 'Ver Veredicto Final'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Caso Finalizado con Dictamen */
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-1">
                Laboratorio Concluido
              </span>
              <h2 className="text-2xl font-serif font-bold text-white">
                Dictamen Jurídico Docente
              </h2>
            </div>
            <div className="px-4 py-2 rounded-2xl bg-amber-500 text-slate-950 font-bold text-sm">
              Puntuación Obtenida: {score} de {selectedCase.steps.length}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif font-bold text-base text-amber-300">
              Solución Jurídica y Sentencia Aplicable:
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-serif leading-relaxed bg-slate-800 p-4 rounded-2xl border border-slate-700">
              {selectedCase.finalLegalVerdictSummary}
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block">
              Fundamentos Normativos Obligatorios:
            </span>
            <ul className="space-y-1 text-xs text-slate-300 list-disc pl-5">
              {selectedCase.normativeBasis.map((nb, i) => (
                <li key={i}>{nb}</li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              onClick={handleRestart}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Repetir Laboratorio de Casos</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
