'use client';

/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Archivo: src/app/(dashboard)/estudiante/cuestionario/[id]/page.tsx
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
import { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getQuizById } from '@/lib/data/quizzes';
import {
  ArrowLeft,
  Award,
  BookOpen,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  XCircle,
  ExternalLink
} from 'lucide-react';

interface Props {
  params: Promise<{ id: string }>;
}

/**
 * Componente Principal de Vista: `QuizRunnerPage`
 * Renderiza la interfaz de usuario interactiva y coordina el flujo operativo del módulo.
 * @returns Elemento JSX representativo de la página o vista
 */
export default function QuizRunnerPage({ params }: Props) {
  const { id } = use(params);
  const quiz = getQuizById(id);

  if (!quiz) {
    notFound();
  }

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = quiz.questions[currentQuestionIdx];
  const totalQuestions = quiz.questions.length;
  const isSelected = !!selectedAnswers[currentQ.id];

  function handleSelectOption(optionId: string) {
    if (isCompleted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId,
    }));
  }

  function handleNext() {
    if (currentQuestionIdx < totalQuestions - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  }

  function handlePrev() {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx((prev) => prev - 1);
    }
  }

  function handleRestart() {
    setSelectedAnswers({});
    setCurrentQuestionIdx(0);
    setIsCompleted(false);
  }

  const correctCount = quiz.questions.filter(
    (q) => selectedAnswers[q.id] === q.correctOption
  ).length;
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);
  const isPassed = scorePercent >= 70;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full">
      <div className="flex items-center justify-between">
        <Link
          href="/estudiante"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-2xs hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Banco de Cuestionarios</span>
        </Link>
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
          {quiz.specialty}
        </span>
      </div>

      {!isCompleted ? (
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-8">
          <div className="space-y-4 border-b border-slate-100 pb-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                {quiz.title}
              </h1>
              <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-xl">
                Pregunta {currentQuestionIdx + 1} de {totalQuestions}
              </span>
            </div>

            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-amber-500 h-full rounded-full transition-all duration-300"
                style={{ width: ((currentQuestionIdx + 1) / totalQuestions) * 100 + '%' }}
              ></div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-base sm:text-lg font-serif font-bold text-slate-900 leading-relaxed">
              {currentQ.questionText}
            </h2>

            <div className="space-y-3">
              {currentQ.options.map((opt) => {
                const isChosen = selectedAnswers[currentQ.id] === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectOption(opt.id)}
                    className={'w-full text-left p-4 sm:p-5 rounded-2xl border transition-all flex items-start gap-4 cursor-pointer ' + (
                      isChosen
                        ? 'border-amber-600 bg-amber-50/70 text-slate-900 font-semibold ring-2 ring-amber-500/30'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                    )}
                  >
                    <div
                      className={'w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ' + (
                        isChosen
                          ? 'bg-slate-900 text-amber-400'
                          : 'bg-slate-100 text-slate-500'
                      )}
                    >
                      {opt.id}
                    </div>
                    <span className="text-xs sm:text-sm leading-relaxed mt-0.5">
                      {opt.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentQuestionIdx === 0}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Anterior
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!isSelected}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs font-bold shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <span>{currentQuestionIdx === totalQuestions - 1 ? 'Finalizar y Calificar' : 'Siguiente Pregunta'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm text-center space-y-6">
            <div className="inline-flex p-4 rounded-3xl bg-amber-50 border border-amber-200">
              <Award className="w-12 h-12 text-amber-600" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                {isPassed ? '¡Evaluación Aprobada con Éxito!' : 'Evaluación Completada'}
              </h2>
              <p className="text-xs text-slate-500">
                {isPassed
                  ? 'Has demostrado un sólido dominio de la legislación dominicana aplicable.'
                  : 'Revisa las justificaciones jurídicas y los artículos de ley a continuación para reforzar tus conocimientos.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 inline-block min-w-[240px]">
              <span className="text-xs text-slate-500 block uppercase font-semibold tracking-wider">
                Puntuación Obtenida
              </span>
              <span className="text-4xl sm:text-5xl font-serif font-extrabold text-slate-900 mt-1 block">
                {scorePercent}%
              </span>
              <span className="text-xs text-slate-600 mt-1 block">
                {correctCount} de {totalQuestions} respuestas correctas
              </span>
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <button
                type="button"
                onClick={handleRestart}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Repetir Cuestionario</span>
              </button>
              <Link
                href="/estudiante"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs font-bold shadow-md transition-colors"
              >
                <span>Otro Cuestionario</span>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-serif font-bold text-slate-900 px-1">
              Desglose y Fundamentación Jurídica
            </h3>

            {quiz.questions.map((q, idx) => {
              const userChoice = selectedAnswers[q.id];
              const isCorrect = userChoice === q.correctOption;

              return (
                <div
                  key={q.id}
                  className={'p-6 sm:p-7 rounded-3xl bg-white border shadow-2xs space-y-4 ' + (
                    isCorrect ? 'border-emerald-200' : 'border-rose-200'
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-[11px] font-mono font-bold text-slate-400">
                        Pregunta {idx + 1}
                      </span>
                      <h4 className="font-serif font-bold text-base text-slate-900">
                        {q.questionText}
                      </h4>
                    </div>

                    <div className="shrink-0 mt-1">
                      {isCorrect ? (
                        <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Correcta</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-xl border border-rose-200">
                          <XCircle className="w-4 h-4" />
                          <span>Incorrecta</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                    <span className="font-bold text-slate-800 block">
                      Fundamento Legal:
                    </span>
                    <p className="text-slate-700 leading-relaxed font-serif">
                      {q.explanation}
                    </p>
                    <div className="pt-2 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-2 text-slate-600">
                      <span>Base: <strong>{q.legalBasis}</strong></span>
                      {q.articleUrl && (
                        <Link
                          href={q.articleUrl}
                          className="inline-flex items-center gap-1 text-amber-600 hover:text-amber-700 font-semibold"
                        >
                          <span>Consultar Artículo en Legal RD</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
