'use client';

/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Archivo: src/app/(public)/calculadora-plazos/page.tsx
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
import {
  DOMINICAN_DEADLINE_CATALOG,
  computeDominicanDeadline,
  DeadlineCalculationResult
} from '@/lib/data/deadlines';
import {
  Clock,
  Calendar,
  AlertTriangle,
  Scale,
  ShieldAlert,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';

/**
 * Componente Principal de Vista: `CalculadoraPlazosPage`
 * Renderiza la interfaz de usuario interactiva y coordina el flujo operativo del módulo.
 * @returns Elemento JSX representativo de la página o vista
 */
export default function CalculadoraPlazosPage() {
  const [selectedCatalogId, setSelectedCatalogId] = useState<string>(DOMINICAN_DEADLINE_CATALOG[0].id);
  const [startDate, setStartDate] = useState<string>(() => {
    return new Date().toISOString().split('T')[0];
  });

  const selectedItem = DOMINICAN_DEADLINE_CATALOG.find((d) => d.id === selectedCatalogId) || DOMINICAN_DEADLINE_CATALOG[0];

  const result: DeadlineCalculationResult | null = computeDominicanDeadline(selectedCatalogId, startDate);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full">
      {/* Cabecera */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold uppercase tracking-wider">
          <Clock className="w-4 h-4 text-amber-600" />
          <span>Motor de Cómputo Procesal Dominicano</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
          Calculadora Jurídica de Plazos y Caducidades
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Calcula con rigor técnico el vencimiento exacto de plazos procesales dominicanos: días calendarios, días hábiles judiciales, plazos francos (Art. 1033 CPC) y plazos de prescripción de fecha a fecha.
        </p>
      </div>

      {/* Formulario Interactivo */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Selección de Tipo de Plazo */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              1. Selecciona el Plazo Procesal a Computar:
            </label>
            <select
              value={selectedCatalogId}
              onChange={(e) => setSelectedCatalogId(e.target.value)}
              className="w-full p-3.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-slate-900 focus:outline-hidden font-medium text-slate-900"
            >
              {DOMINICAN_DEADLINE_CATALOG.map((item) => (
                <option key={item.id} value={item.id}>
                  [{item.specialtyName}] {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Fecha de Notificación o Hecho Generador */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              2. Fecha de Notificación o Evento Generador:
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-3.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-slate-900 focus:outline-hidden font-mono font-medium text-slate-900"
            />
          </div>
        </div>

        {/* Descripción del Plazo Seleccionado */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-bold text-slate-900">{selectedItem.name}</span>
            <span className="text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-full font-bold text-[10px]">
              Base Legal: {selectedItem.legalBasis}
            </span>
          </div>
          <p className="text-slate-600 leading-relaxed">{selectedItem.description}</p>
          <p className="text-[11px] text-slate-500">
            <strong>Punto de Partida (Dies a quo):</strong> {selectedItem.triggerEvent}
          </p>
        </div>
      </div>

      {/* Resultado del Cómputo */}
      {result && (
        <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-1">
                Resultado Oficial del Cómputo
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
                Vencimiento Calculado: <span className="text-amber-300 font-mono">{result.calculatedDueDate}</span>
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div
                className={`px-4 py-2 rounded-2xl font-bold text-xs flex items-center gap-1.5 shadow-md ${
                  result.isExpired
                    ? 'bg-rose-500 text-white'
                    : result.daysRemaining <= 3
                    ? 'bg-amber-500 text-slate-950 animate-pulse'
                    : 'bg-emerald-500 text-white'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>
                  {result.isExpired
                    ? `Plazo Vencido hace ${Math.abs(result.daysRemaining)} días`
                    : `${result.daysRemaining} días restantes`}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
              <span className="text-[11px] text-slate-400 block font-medium">Fecha de Inicio</span>
              <span className="text-sm font-bold text-white font-mono">{result.startDate}</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
              <span className="text-[11px] text-slate-400 block font-medium">Régimen de Cómputo</span>
              <span className="text-xs font-semibold text-amber-300 block">{result.calculationTypeDescription}</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
              <span className="text-[11px] text-slate-400 block font-medium">Total de Días Corridos</span>
              <span className="text-sm font-bold text-emerald-400 font-mono">+{result.totalDaysAdded} días</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700 space-y-1 text-xs text-slate-300 font-mono">
            <span className="text-[11px] text-amber-400 font-bold block">Fórmula de Cómputo Aplicada:</span>
            <p>{result.legalFormula}</p>
          </div>

          {/* Advertencias Procesales Críticas */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>Advertencias Procesales y Reglas Clave</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {result.warnings.map((w, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-400 shrink-0 mt-0.5">•</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Acción Procesal Recomendada */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="text-amber-400 font-bold block">Acción Jurídica para evitar la caducidad:</span>
              <span className="text-slate-200">{selectedItem.remedyAction}</span>
            </div>
            <a
              href={`/asistente-ia?pregunta=${encodeURIComponent('¿Cómo se interpone ' + selectedItem.remedyAction + ' según las leyes de RD?')}`}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shrink-0 transition-colors shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Consultar en Legal RD AI</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
