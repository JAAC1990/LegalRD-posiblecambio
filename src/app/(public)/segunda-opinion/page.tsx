'use client';

/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Archivo: src/app/(public)/segunda-opinion/page.tsx
 * Área: Módulo Público de Litigio e Investigación
 * 
 * DESCRIPCIÓN:
 * Herramientas de consulta abierta, cálculo de plazos, simuladores, fichas de conceptos y asistente jurídico.
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
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Scale,
  FileCheck,
  RefreshCw,
  Award
} from 'lucide-react';
import { evaluateLegalStrategy, SecondOpinionAudit } from '@/lib/data/caseBuilder';

/**
 * Componente Principal de Vista: `SegundaOpinionPage`
 * Renderiza la interfaz de usuario interactiva y coordina el flujo operativo del módulo.
 * @returns Elemento JSX representativo de la página o vista
 */
export default function SegundaOpinionPage() {
  const [caseFacts, setCaseFacts] = useState<string>(
    'Cliente contrató con una empresa constructora la remodelación de su local comercial. La constructora paralizó los trabajos sin justificación tras recibir el 70% del anticipo y se niega a devolver el dinero o reiniciar labores.'
  );
  const [lawyerStrategy, setLawyerStrategy] = useState<string>(
    'Propongo trabar inmediatamente un embargo retentivo u oposiciones en las cuentas bancarias de la constructora sin avisar, y luego demandar en cobro de pesos por incumplimiento contractual.'
  );

  const [auditResult, setAuditResult] = useState<SecondOpinionAudit | null>(null);
  const [isAuditing, setIsAuditing] = useState<boolean>(false);

  function handleAudit() {
    setIsAuditing(true);
    setTimeout(() => {
      const res = evaluateLegalStrategy(caseFacts, lawyerStrategy);
      setAuditResult(res);
      setIsAuditing(false);
    }, 400);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full">
      {/* Cabecera */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-semibold uppercase tracking-wider">
          <Award className="w-4 h-4 text-purple-600" />
          <span>Auditoría Procesal y Control de Calidad Jurídica</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
          Segunda Opinión Jurídica
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Introduce los hechos y la estrategia procesal planeada por tu equipo legal. Legal RD auditará el planteamiento, detectando debilidades, normas posiblemente omitidas, precedentes contrarios, riesgos procesales y pruebas indispensables.
        </p>
      </div>

      {/* Formulario de Entrada */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            1. Sustrato Fáctico del Caso:
          </label>
          <textarea
            value={caseFacts}
            onChange={(e) => setCaseFacts(e.target.value)}
            rows={3}
            className="w-full p-3.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-slate-900 focus:outline-hidden"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            2. Estrategia o Análisis Jurídico a Auditar:
          </label>
          <textarea
            value={lawyerStrategy}
            onChange={(e) => setLawyerStrategy(e.target.value)}
            rows={3}
            className="w-full p-3.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-slate-900 focus:outline-hidden"
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleAudit}
            disabled={isAuditing || !caseFacts.trim() || !lawyerStrategy.trim()}
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-amber-400 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-xs"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isAuditing ? 'Auditando Estrategia...' : 'Ejecutar Auditoría Jurídica'}</span>
          </button>
        </div>
      </div>

      {/* Resultados de la Auditoría */}
      {auditResult && (
        <div className="space-y-6">
          {/* Veredicto General */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-1">
                  Dictamen de Segunda Opinión
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  {auditResult.finalVerdict}
                </h2>
              </div>
              <div className="px-4 py-2 rounded-2xl bg-amber-500 text-slate-950 font-bold text-sm">
                Solidez Evaluada: {auditResult.recommendationScore} / 100
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Aviso Legal Ético:</strong> Esta herramienta apoya el análisis crítico profesional y no constituye sustituto de la postulación letrada de un abogado en ejercicio.
              </span>
            </div>
          </div>

          {/* Argumentos a Favor vs. Debilidades */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-emerald-50/60 border border-emerald-200 space-y-3 shadow-xs">
              <h3 className="font-serif font-bold text-base text-emerald-950 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Argumentos y Puntos Fuertes a Favor</span>
              </h3>
              <ul className="space-y-2 text-xs text-emerald-950 list-disc pl-5">
                {auditResult.favorableArguments.map((arg, i) => (
                  <li key={i} className="leading-relaxed">{arg}</li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-rose-50/60 border border-rose-200 space-y-3 shadow-xs">
              <h3 className="font-serif font-bold text-base text-rose-950 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Debilidades Procesales Detectadas</span>
              </h3>
              <ul className="space-y-2 text-xs text-rose-950 list-disc pl-5">
                {auditResult.vulnerabilitiesAndFlaws.map((flaw, i) => (
                  <li key={i} className="leading-relaxed">{flaw}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Normas Posiblemente Omitidas */}
          {auditResult.omittedNorms.length > 0 && (
            <div className="p-6 rounded-3xl bg-amber-50/60 border border-amber-300 space-y-3 shadow-xs">
              <h3 className="font-serif font-bold text-base text-amber-950 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Normas Jurídicas Posiblemente Omitidas en la Estrategia</span>
              </h3>
              <div className="space-y-2">
                {auditResult.omittedNorms.map((om, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white border border-amber-200 text-xs text-slate-800 space-y-1">
                    <span className="font-bold text-slate-900">{om.normName} — {om.articleRef}</span>
                    <p className="text-[11px] text-slate-600">{om.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Jurisprudencia Favorable y Contraria */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-xs">
              <h3 className="font-serif font-bold text-sm text-slate-900 flex items-center gap-2">
                <Scale className="w-4 h-4 text-purple-600" />
                <span>Precedentes Favorables (SCJ / TC)</span>
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-700 list-disc pl-5">
                {auditResult.favorableCaseLaw.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-xs">
              <h3 className="font-serif font-bold text-sm text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Precedentes Contrarios a Sortear</span>
              </h3>
              {auditResult.contraryCaseLaw.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No se identificaron precedentes restrictivos directos.</p>
              ) : (
                <ul className="space-y-1.5 text-xs text-rose-950 list-disc pl-5">
                  {auditResult.contraryCaseLaw.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Pruebas Faltantes y Riesgos Procesales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-xs">
              <h3 className="font-serif font-bold text-sm text-slate-900 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-blue-600" />
                <span>Pruebas Necesarias Faltantes</span>
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-700 list-disc pl-5">
                {auditResult.missingEvidence.map((ev, i) => (
                  <li key={i}>{ev}</li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-xs">
              <h3 className="font-serif font-bold text-sm text-slate-900 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>Riesgos Procesales Identificados</span>
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-700 list-disc pl-5">
                {auditResult.proceduralRisks.map((risk, i) => (
                  <li key={i}>{risk}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
