import Link from 'next/link';
import { getAllLegislativeHistories } from '@/lib/data/legislativeHistory';
import { History, ArrowRight, GitCompare, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

export default async function HistorialLegislativoPage() {
  const histories = await getAllLegislativeHistories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full">
      {/* Cabecera */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold uppercase tracking-wider">
          <History className="w-4 h-4 text-amber-600" />
          <span>Historial Legislativo y Evolución Normativa</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
          Líneas de Tiempo y Comparador ANTES vs. DESPUÉS
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Examina las reformas históricas de la legislación dominicana. Compara el texto derogado con la norma vigente, analiza los cambios de criterio procesal y comprende el impacto práctico en los tribunales.
        </p>
      </div>

      {/* Grid de Reformas e Historiales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {histories.map((hist) => (
          <div
            key={hist.slug}
            className="p-7 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-800">
                  {hist.specialtyName}
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                  Vigente: {hist.currentActiveNorm.split('(')[0]}
                </span>
              </div>

              <h2 className="text-xl font-serif font-bold text-slate-900 leading-snug">
                {hist.subjectTitle}
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed">
                {hist.overview}
              </p>

              {/* Hitos Rápidos */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  Línea de Sustitución Normativa:
                </span>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <span className="line-through text-rose-600">{hist.previousReplacedNorm.split('del')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <strong className="text-emerald-700">{hist.currentActiveNorm.split('(')[0]}</strong>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                {hist.diffComparisons.length} Artículos contrastados
              </span>
              <Link
                href={`/historial/${hist.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-amber-600 transition-colors"
              >
                <span>Ver Comparador y Línea de Tiempo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
