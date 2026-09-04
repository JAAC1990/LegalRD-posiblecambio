'use client';

/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Archivo: src/app/(public)/simulador-casos/page.tsx
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
  Sparkles,
  HelpCircle,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  Scale,
  Clock,
  Building2,
  FileCheck,
  RefreshCw
} from 'lucide-react';
import { analyzeCaseInput, CaseAnalysis13Steps } from '@/lib/data/caseBuilder';

/**
 * Componente Principal de Vista: `SimuladorCasosPage`
 * Renderiza la interfaz de usuario interactiva y coordina el flujo operativo del módulo.
 * @returns Elemento JSX representativo de la página o vista
 */
export default function SimuladorCasosPage() {
  const [step, setStep] = useState<number>(1);
  const [materia, setMateria] = useState<string>('laboral');
  const [hechos, setHechos] = useState<string>('');
  const [fechas, setFechas] = useState<string>('');
  const [personas, setPersonas] = useState<string>('');
  const [documentos, setDocumentos] = useState<string>('');
  const [contratoExiste, setContratoExiste] = useState<string>('si');
  const [resultado, setResultado] = useState<CaseAnalysis13Steps | null>(null);

  function handleSimulate() {
    const combinedFacts = `${hechos}. Fechas clave: ${fechas}. Personas involucradas: ${personas}. Documentos disponibles: ${documentos}. ¿Existe contrato escrito?: ${contratoExiste}. Materia: ${materia}.`;
    const analysis = analyzeCaseInput(combinedFacts);
    setResultado(analysis);
    setStep(3); // Mostrar resultado
  }

  function handleReset() {
    setStep(1);
    setResultado(null);
    setHechos('');
    setFechas('');
    setPersonas('');
    setDocumentos('');
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full">
      {/* Cabecera */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Inteligencia Jurídica Predictiva</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
          Simulador de Casos del Derecho Dominicano
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Describe tu situación fáctica. El simulador te guiará a través de preguntas específicas (hechos, fechas, contratos, personas, pruebas) para diagnosticar la viabilidad del caso y trazar una ruta legal fundada.
        </p>
      </div>

      {/* Flujo en Pasos */}
      {step === 1 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="font-serif font-bold text-lg text-slate-900">
              Paso 1: Descripción de la Situación y Materia
            </h2>
            <span className="text-xs font-semibold text-slate-400">Paso 1 de 2</span>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Materia Probable:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'laboral', label: 'Trabajo / Laboral' },
                  { id: 'civil', label: 'Civil / Contratos' },
                  { id: 'inmobiliario', label: 'Tierras / Inmuebles' },
                  { id: 'transito', label: 'Tránsito / Choques' },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMateria(m.id)}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      materia === m.id
                        ? 'bg-slate-900 text-amber-400 border-slate-900'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Describe lo ocurrido con el mayor detalle posible:
              </label>
              <textarea
                value={hechos}
                onChange={(e) => setHechos(e.target.value)}
                placeholder="Ejemplo: Laboré durante 3 años en una ferretería de Santo Domingo y el día de ayer el supervisor me notificó que estaba despedido verbalmente sin darme motivos ni carta de despido..."
                rows={5}
                className="w-full p-4 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-slate-900 focus:outline-hidden leading-relaxed"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setStep(2)}
              disabled={!hechos.trim()}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-amber-400 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <span>Continuar con Preguntas de Detalle</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="font-serif font-bold text-lg text-slate-900">
              Paso 2: Precisión de Fechas, Personas, Contratos y Pruebas
            </h2>
            <span className="text-xs font-semibold text-slate-400">Paso 2 de 2</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                Fechas Clave (Fecha de inicio y fecha del conflicto):
              </label>
              <input
                type="text"
                value={fechas}
                onChange={(e) => setFechas(e.target.value)}
                placeholder="Ej. Inicié en mayo 2022 y el hecho ocurrió el 20 de febrero 2026"
                className="w-full p-3 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-hidden"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                Personas o Entidades Involucradas:
              </label>
              <input
                type="text"
                value={personas}
                onChange={(e) => setPersonas(e.target.value)}
                placeholder="Ej. Empleador: Distribuidora X, S.R.L. / Trabajador: Juan Pérez"
                className="w-full p-3 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-hidden"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                ¿Existe contrato firmado u obligaciones escritas?
              </label>
              <select
                value={contratoExiste}
                onChange={(e) => setContratoExiste(e.target.value)}
                className="w-full p-3 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-hidden"
              >
                <option value="si">Sí, existe contrato escrito firmado</option>
                <option value="no">No, fue un acuerdo verbal o de hecho</option>
                <option value="no-seguro">No estoy seguro / solo tengo recibos</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                Documentos o Pruebas en tu Posesión:
              </label>
              <input
                type="text"
                value={documentos}
                onChange={(e) => setDocumentos(e.target.value)}
                placeholder="Ej. Recibos de nómina, cotizaciones de TSS, mensajes de WhatsApp, testigos..."
                className="w-full p-3 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Atrás
            </button>
            <button
              onClick={handleSimulate}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <Sparkles className="w-4 h-4" />
              <span>Simular y Construir Ruta Jurídica</span>
            </button>
          </div>
        </div>
      )}

      {step === 3 && resultado && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 sm:p-8 rounded-3xl shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-1">
                Diagnóstico de Viabilidad Jurídica
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
                Materia Diagnosticada: {resultado.areaDerecho.specialtyName}
              </h2>
            </div>

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer border border-slate-700 self-start md:self-auto"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Nueva Simulación</span>
            </button>
          </div>

          {/* Problemas Jurídicos y Normas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-xs">
              <h3 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
                <Scale className="w-4 h-4 text-amber-600" />
                <span>Problemas Jurídicos Identificados</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-700 list-disc pl-4">
                {resultado.problemasJuridicos.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-xs">
              <h3 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Normas y Artículos Aplicables</span>
              </h3>
              <div className="space-y-2 text-xs text-slate-800">
                {resultado.normasAplicables.map((n, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="font-bold text-slate-900 block">{n.normName} ({n.normNumber})</span>
                    <span className="text-[11px] text-amber-800">{n.articles.join(', ')}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tribunal y Plazos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-2 shadow-xs">
              <h3 className="font-serif font-bold text-sm text-slate-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-indigo-600" />
                <span>Tribunal Competente</span>
              </h3>
              <p className="text-xs font-bold text-indigo-950">{resultado.tribunalAutoridad.name}</p>
              <p className="text-[11px] text-slate-500">{resultado.tribunalAutoridad.competenceType}</p>
            </div>

            <div className="p-6 rounded-3xl bg-rose-50/60 border border-rose-200 space-y-2 shadow-xs">
              <h3 className="font-serif font-bold text-sm text-rose-950 flex items-center gap-2">
                <Clock className="w-4 h-4 text-rose-600" />
                <span>Plazo Crítico de Prescripción</span>
              </h3>
              <p className="text-xs font-bold text-rose-900">{resultado.plazos[0]?.title}: {resultado.plazos[0]?.duration}</p>
              <p className="text-[11px] text-rose-800">{resultado.plazos[0]?.warning}</p>
            </div>
          </div>

          {/* Ruta de Actuación Paso a Paso */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-lg text-slate-900">
              Ruta Recomendada de Actuación
            </h3>
            <div className="space-y-2.5">
              {resultado.rutaActuacion.map((step, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3 text-xs text-slate-800 font-medium">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-amber-400 font-bold flex items-center justify-center shrink-0 text-[11px]">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-3">
              <Link
                href="/construye-mi-caso"
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <span>Profundizar en "Construye Mi Caso" (13 Pasos)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/generador-documentos"
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>Generar Borrador de Documento</span>
                <FileCheck className="w-3.5 h-3.5 text-slate-500" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
