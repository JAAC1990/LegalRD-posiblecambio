'use client';

/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Archivo: src/app/(public)/construye-mi-caso/page.tsx
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
  Scale,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Building2,
  FileCheck,
  ArrowRight,
  Printer,
  ShieldCheck,
  Layers,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { analyzeCaseInput, CaseAnalysis13Steps, PREDEFINED_CASE_SCENARIOS } from '@/lib/data/caseBuilder';

/**
 * Componente Principal de Vista: `ConstruyeMiCasoPage`
 * Renderiza la interfaz de usuario interactiva y coordina el flujo operativo del módulo.
 * @returns Elemento JSX representativo de la página o vista
 */
export default function ConstruyeMiCasoPage() {
  const [inputText, setInputText] = useState<string>('Me chocaron el vehículo por detrás en un semáforo en rojo en Santo Domingo, el otro chofer no tiene seguro al día y se niega a cubrir los daños materiales de mi vehículo.');
  const [analysis, setAnalysis] = useState<CaseAnalysis13Steps>(() => analyzeCaseInput(inputText));
  const [activePreset, setActivePreset] = useState<string>('accidente-transito');

  function handleSelectPreset(key: string) {
    setActivePreset(key);
    const preset = PREDEFINED_CASE_SCENARIOS[key];
    if (preset) {
      setInputText(preset.hechos);
      setAnalysis(preset);
    }
  }

  function handleAnalyze() {
    if (!inputText.trim()) return;
    setAnalysis(analyzeCaseInput(inputText));
  }

  const stepsList = [
    { num: 1, title: 'HECHOS', desc: 'Sustrato fáctico y circunstancias probadas' },
    { num: 2, title: 'PROBLEMAS JURÍDICOS', desc: 'Dilemas de derecho a resolver' },
    { num: 3, title: 'ÁREA DEL DERECHO', desc: 'Ramas jurídicas aplicables' },
    { num: 4, title: 'NORMAS APLICABLES', desc: 'Leyes, códigos y artículos' },
    { num: 5, title: 'JURISPRUDENCIA', desc: 'Precedentes SCJ y TC vinculantes' },
    { num: 6, title: 'PRUEBAS', desc: 'Medios probatorios a acreditar' },
    { num: 7, title: 'ARGUMENTOS', desc: 'Tesis jurídicas a favor' },
    { num: 8, title: 'CONTRAARGUMENTOS', desc: 'Posibles defensas de la contraparte' },
    { num: 9, title: 'PROCEDIMIENTO', desc: 'Etapas de la instancia judicial' },
    { num: 10, title: 'TRIBUNAL / AUTORIDAD', desc: 'Competencia territorial y de atribución' },
    { num: 11, title: 'PLAZOS', desc: 'Prescripción y caducidades procesales' },
    { num: 12, title: 'DOCUMENTOS', desc: 'Borradores y piezas instrumentales' },
    { num: 13, title: 'RUTA DE ACTUACIÓN', desc: 'Plan de acción cronológico' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full">
      {/* Cabecera */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold uppercase tracking-wider">
          <Scale className="w-4 h-4 text-amber-600" />
          <span>Estructuración Estratégica de Casos</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
          Construye Mi Caso (Flujo Integral de 13 Etapas)
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Ingresa los hechos de tu conflicto. El motor de razonamiento jurídico estructurará tu caso a través de las 13 dimensiones obligatorias de la práctica profesional dominicana, vinculando cada conclusión con su fundamento legal y jurisprudencial.
        </p>
      </div>

      {/* Selector Rápido de Casos Guía */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block">
          Casos Guía Preconfigurados:
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleSelectPreset('accidente-transito')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activePreset === 'accidente-transito'
                ? 'bg-slate-900 text-amber-400'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            🚗 Accidente de Tránsito y Negativa de Pago
          </button>
          <button
            onClick={() => handleSelectPreset('despido-injustificado')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activePreset === 'despido-injustificado'
                ? 'bg-slate-900 text-amber-400'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            💼 Despido Injustificado y Reclamación Laboral
          </button>
        </div>

        {/* Input de Hechos Personalizados */}
        <div className="space-y-2 pt-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Edita o ingresa los hechos de tu caso:
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={3}
            className="w-full p-4 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-slate-900 focus:outline-hidden"
          />
          <div className="flex justify-end">
            <button
              onClick={handleAnalyze}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Analizar y Construir las 13 Etapas</span>
            </button>
          </div>
        </div>
      </div>

      {/* Visualización del Flujo de 13 Etapas */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h2 className="font-serif font-bold text-xl text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-600" />
            <span>Expediente Estructurado en 13 Etapas</span>
          </h2>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir Expediente</span>
          </button>
        </div>

        {/* 1. HECHOS */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-lg bg-slate-900 text-amber-400 font-bold flex items-center justify-center text-xs">1</span>
            <h3 className="font-serif font-bold text-base text-slate-900">HECHOS CIRCUNSTANCIADOS</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 font-serif leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            {analysis.hechos}
          </p>
        </div>

        {/* 2. PROBLEMAS JURÍDICOS */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-lg bg-slate-900 text-amber-400 font-bold flex items-center justify-center text-xs">2</span>
            <h3 className="font-serif font-bold text-base text-slate-900">PROBLEMAS JURÍDICOS</h3>
          </div>
          <ul className="space-y-2 text-xs text-slate-700 list-disc pl-5">
            {analysis.problemasJuridicos.map((p, i) => (
              <li key={i} className="leading-relaxed font-semibold">{p}</li>
            ))}
          </ul>
        </div>

        {/* 3. ÁREA DEL DERECHO */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-lg bg-slate-900 text-amber-400 font-bold flex items-center justify-center text-xs">3</span>
            <h3 className="font-serif font-bold text-base text-slate-900">ÁREA DEL DERECHO APLICABLE</h3>
          </div>
          <span className="inline-block px-3.5 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-300 font-bold text-xs">
            {analysis.areaDerecho.specialtyName}
          </span>
        </div>

        {/* 4. NORMAS APLICABLES */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-lg bg-slate-900 text-amber-400 font-bold flex items-center justify-center text-xs">4</span>
            <h3 className="font-serif font-bold text-base text-slate-900">NORMAS Y ARTÍCULOS APLICABLES</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {analysis.normasAplicables.map((n, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1 text-xs">
                <span className="font-bold text-slate-900 block">{n.normName} ({n.normNumber})</span>
                <p className="text-amber-800 font-mono text-[11px]">{n.articles.join(' • ')}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. JURISPRUDENCIA */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-lg bg-slate-900 text-amber-400 font-bold flex items-center justify-center text-xs">5</span>
            <h3 className="font-serif font-bold text-base text-slate-900">JURISPRUDENCIA VINCULANTE (SCJ / TC)</h3>
          </div>
          <div className="space-y-3">
            {analysis.jurisprudencia.map((j, i) => (
              <div key={i} className="p-4 rounded-2xl bg-purple-50/50 border border-purple-200 space-y-1 text-xs">
                <span className="font-bold text-purple-950 block">{j.sentenceNumber} — {j.tribunal} ({j.year})</span>
                <p className="font-serif text-slate-800 italic">«{j.doctrine}»</p>
              </div>
            ))}
          </div>
        </div>

        {/* 6. PRUEBAS */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-lg bg-slate-900 text-amber-400 font-bold flex items-center justify-center text-xs">6</span>
            <h3 className="font-serif font-bold text-base text-slate-900">MEDIOS DE PRUEBA EXIGIBLES</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {analysis.pruebas.map((pr, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{pr.name}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">{pr.type}</span>
                </div>
                <p className="text-[11px] text-slate-500">{pr.relevance}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 7 y 8. ARGUMENTOS Y CONTRAARGUMENTOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-emerald-50/50 border border-emerald-200 space-y-3 shadow-xs">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-emerald-700 text-white font-bold flex items-center justify-center text-xs">7</span>
              <h3 className="font-serif font-bold text-base text-emerald-950">ARGUMENTOS PRINCIPALES</h3>
            </div>
            <ul className="space-y-2 text-xs text-emerald-950 list-disc pl-5">
              {analysis.argumentos.map((a, i) => (
                <li key={i} className="leading-relaxed">{a}</li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-3xl bg-rose-50/50 border border-rose-200 space-y-3 shadow-xs">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-rose-700 text-white font-bold flex items-center justify-center text-xs">8</span>
              <h3 className="font-serif font-bold text-base text-rose-950">POSIBLES CONTRAARGUMENTOS</h3>
            </div>
            <ul className="space-y-2 text-xs text-rose-950 list-disc pl-5">
              {analysis.contraargumentos.map((c, i) => (
                <li key={i} className="leading-relaxed">{c}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* 9. PROCEDIMIENTO */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-lg bg-slate-900 text-amber-400 font-bold flex items-center justify-center text-xs">9</span>
            <h3 className="font-serif font-bold text-base text-slate-900">VÍA PROCESAL Y ETAPAS</h3>
          </div>
          <span className="font-bold text-xs text-indigo-950 block">{analysis.procedimiento.name}</span>
          <div className="space-y-1.5">
            {analysis.procedimiento.stages.map((st, i) => (
              <p key={i} className="text-xs text-slate-600">{st}</p>
            ))}
          </div>
        </div>

        {/* 10. TRIBUNAL Y AUTORIDAD */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-lg bg-slate-900 text-amber-400 font-bold flex items-center justify-center text-xs">10</span>
            <h3 className="font-serif font-bold text-base text-slate-900">TRIBUNAL / AUTORIDAD COMPETENTE</h3>
          </div>
          <p className="text-sm font-bold text-slate-900">{analysis.tribunalAutoridad.name}</p>
          <p className="text-xs text-slate-500">{analysis.tribunalAutoridad.competenceType} • {analysis.tribunalAutoridad.location}</p>
        </div>

        {/* 11. PLAZOS */}
        <div className="p-6 rounded-3xl bg-rose-50/60 border border-rose-200 space-y-3 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-lg bg-rose-700 text-white font-bold flex items-center justify-center text-xs">11</span>
            <h3 className="font-serif font-bold text-base text-rose-950">PLAZOS DE PRESCRIPCIÓN Y CADUCIDAD</h3>
          </div>
          {analysis.plazos.map((pl, i) => (
            <div key={i} className="text-xs text-rose-950 space-y-1">
              <p><strong>{pl.title}:</strong> {pl.duration} a partir de {pl.startsAt}</p>
              <p className="font-semibold text-rose-800">⚠️ {pl.warning}</p>
            </div>
          ))}
        </div>

        {/* 12. DOCUMENTOS */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-lg bg-slate-900 text-amber-400 font-bold flex items-center justify-center text-xs">12</span>
            <h3 className="font-serif font-bold text-base text-slate-900">DOCUMENTOS Y PIEZAS A INSTRUMENTAR</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {analysis.documentos.map((d, i) => (
              <Link
                key={i}
                href={d.urlTemplate || '/generador-documentos'}
                className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-blue-200"
              >
                <FileCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>{d.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* 13. RUTA DE ACTUACIÓN */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 text-white shadow-xl space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-lg bg-amber-400 text-slate-950 font-bold flex items-center justify-center text-xs">13</span>
            <h3 className="font-serif font-bold text-lg text-amber-400">RUTA CRONOLÓGICA DE ACTUACIÓN</h3>
          </div>
          <div className="space-y-2">
            {analysis.rutaActuacion.map((ra, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center gap-3 text-xs text-slate-200 font-medium">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center shrink-0 text-[10px]">
                  {i + 1}
                </span>
                <span>{ra}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
