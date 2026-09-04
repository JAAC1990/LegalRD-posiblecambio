import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getLegislativeHistoryBySlug, getAllLegislativeHistories } from '@/lib/data/legislativeHistory';
import {
  ArrowLeft,
  History,
  GitCompare,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const histories = await getAllLegislativeHistories();
  return histories.map((h) => ({ slug: h.slug }));
}

export default async function HistorialDetailPage({ params }: Props) {
  const { slug } = await params;
  const history = await getLegislativeHistoryBySlug(slug);

  if (!history) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full">
      {/* Botón Volver */}
      <Link
        href="/historial"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-2xs hover:bg-slate-50 transition-colors w-fit"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver al Historial Legislativo</span>
      </Link>

      {/* Cabecera */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
        <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
          {history.specialtyName}
        </span>
        <h1 className="text-2xl sm:text-4xl font-serif font-extrabold text-slate-900">
          {history.subjectTitle}
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          {history.overview}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
          <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200/80 space-y-1">
            <span className="text-[11px] font-bold text-rose-800 uppercase flex items-center gap-1.5">
              <XCircle className="w-4 h-4 text-rose-600" />
              <span>Norma Anterior Sustituida</span>
            </span>
            <p className="text-xs font-semibold text-rose-950">{history.previousReplacedNorm}</p>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-1">
            <span className="text-[11px] font-bold text-emerald-800 uppercase flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Norma Vigente Actual</span>
            </span>
            <p className="text-xs font-semibold text-emerald-950">{history.currentActiveNorm}</p>
          </div>
        </div>
      </div>

      {/* Línea de Tiempo Histórica */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <h2 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2">
          <History className="w-5 h-5 text-amber-600" />
          <span>Línea de Tiempo Legislativa</span>
        </h2>

        <div className="relative pl-6 sm:pl-8 border-l-2 border-amber-300 space-y-8">
          {history.timeline.map((m, idx) => (
            <div key={idx} className="relative space-y-2">
              <div className="absolute -left-[31px] sm:-left-[39px] top-0 w-5 h-5 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center text-[10px] font-bold ring-4 ring-white">
                {idx + 1}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-900">{m.stageTitle}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-500">{m.date}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      m.status === 'VIGENTE'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {m.status}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {m.summary}
              </p>
              <span className="text-[10px] text-slate-400 font-mono block">
                {m.gacetaRef} — {m.normNumber}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Comparador ANTES vs. DESPUÉS (Diff Viewer) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-serif font-bold text-slate-900 flex items-center gap-2">
              <GitCompare className="w-5 h-5 text-indigo-600" />
              <span>Comparador ANTES vs. DESPUÉS</span>
            </h2>
            <p className="text-xs text-slate-500">
              Contraste artículo por artículo entre el régimen anterior y el régimen vigente.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {history.diffComparisons.map((diff, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs space-y-4 p-6"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-serif font-bold text-base text-slate-900">
                  Materia: {diff.articleOrTopic}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* ANTES */}
                <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-rose-800 uppercase">
                      ANTES (Derogado)
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {diff.previousLawRef}
                    </span>
                  </div>
                  <p className="text-xs font-serif text-slate-800 leading-relaxed bg-white/70 p-3 rounded-xl border border-rose-100">
                    «{diff.previousText}»
                  </p>
                </div>

                {/* DESPUÉS */}
                <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-emerald-800 uppercase">
                      DESPUÉS (Vigente)
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {diff.currentLawRef}
                    </span>
                  </div>
                  <p className="text-xs font-serif text-slate-800 leading-relaxed bg-white/70 p-3 rounded-xl border border-emerald-100">
                    «{diff.currentText}»
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
                <p className="font-bold text-slate-800">
                  Resumen de los cambios: <span className="font-normal text-slate-600">{diff.keyChangesSummary}</span>
                </p>
                <p className="font-bold text-indigo-900">
                  Impacto en la práctica: <span className="font-normal text-slate-700">{diff.practicalImpact}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
