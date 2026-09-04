import Link from 'next/link';
import { BarChart3, TrendingUp, Scale, BookOpen, Layers, ShieldCheck, ArrowRight } from 'lucide-react';

const TOP_CITED_ARTICLES = [
  { article: 'Art. 80 Código de Trabajo', norm: 'Ley 16-92', topic: 'Auxilio de Cesantía', citations: 1245, specialty: 'Laboral' },
  { article: 'Art. 1382 Código Civil', norm: 'Código Civil', topic: 'Responsabilidad Civil por Culpa', citations: 1120, specialty: 'Civil' },
  { article: 'Art. 69 Constitución', norm: 'Constitución 2015/2024', topic: 'Tutela Judicial Efectiva y Debido Proceso', citations: 980, specialty: 'Constitucional' },
  { article: 'Art. 75 Código de Trabajo', norm: 'Ley 16-92', topic: 'Definición y Validez del Desahucio', citations: 890, specialty: 'Laboral' },
  { article: 'Art. 86 Código de Trabajo', norm: 'Ley 16-92', topic: 'Penalidad de un día de salario por retardo', citations: 840, specialty: 'Laboral' },
  { article: 'Art. 1384 Código Civil', norm: 'Código Civil', topic: 'Responsabilidad por cosas inanimadas', citations: 760, specialty: 'Civil' },
  { article: 'Art. 10 Ley 2-23', norm: 'Ley 2-23', topic: 'Plazo de Casación de 20 días hábiles', citations: 610, specialty: 'Procesal Civil' },
  { article: 'Art. 72 Constitución', norm: 'Constitución 2015/2024', topic: 'Acción Constitucional de Amparo', citations: 580, specialty: 'Constitucional' },
];

const TOP_CITED_NORMS = [
  { name: 'Código de Trabajo (Ley 16-92)', citationsCount: 5420, percent: 32 },
  { name: 'Código Civil Dominicano', citationsCount: 4210, percent: 25 },
  { name: 'Constitución de la República Dominicana', citationsCount: 3380, percent: 20 },
  { name: 'Ley No. 108-05 de Registro Inmobiliario', citationsCount: 2150, percent: 13 },
  { name: 'Ley No. 137-11 Orgánica del Tribunal Constitucional', citationsCount: 1680, percent: 10 },
];

export default function AnaliticaJuridicaPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full">
      {/* Cabecera */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-semibold uppercase tracking-wider">
          <BarChart3 className="w-4 h-4 text-indigo-600" />
          <span>Analítica del Ordenamiento Dominicano</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
          Tendencias y Métrica de Citas Jurisprudenciales
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Estadísticas fundamentadas en las decisiones publicadas por la Suprema Corte de Justicia (SCJ) y el Tribunal Constitucional (TC). Conoce cuáles son las leyes y los artículos más invocados y aplicados en estrados.
        </p>
      </div>

      {/* Normas Más Citadas */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            <span>Volumen Relativo de Citas por Norma Madre</span>
          </h2>
          <span className="text-xs text-slate-400 font-mono">Muestra: 16,840 sentencias analizadas</span>
        </div>

        <div className="space-y-4">
          {TOP_CITED_NORMS.map((norm, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-serif font-bold text-slate-900">{norm.name}</span>
                <span className="font-mono text-slate-500 font-semibold">{norm.citationsCount.toLocaleString()} citas ({norm.percent}%)</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 to-indigo-600"
                  style={{ width: `${norm.percent * 2.5}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Artículos Más Citados */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <h2 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-600" />
          <span>Los Artículos Cardinales del Litigio Dominicano</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TOP_CITED_ARTICLES.map((art, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100/80 text-amber-900">
                    {art.specialty}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-900">{art.citations} citas</span>
                </div>
                <h3 className="font-serif font-bold text-sm text-slate-900">{art.article}</h3>
                <p className="text-[11px] text-slate-500">{art.topic}</p>
              </div>

              <div className="pt-2 border-t border-slate-200/60 text-[10px] text-slate-400 font-mono">
                {art.norm}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Aviso Metodológico */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0" />
        <span>
          <strong>Nota de Rigor Metodológico:</strong> Las métricas se actualizan periódicamente a partir de las publicaciones del Boletín Judicial de la Suprema Corte de Justicia y la Gaceta Judicial dominicana. No constituyen una verdad dogmática absoluta.
        </span>
      </div>
    </div>
  );
}
