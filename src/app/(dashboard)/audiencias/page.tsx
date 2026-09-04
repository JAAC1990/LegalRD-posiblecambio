import Link from 'next/link';
import { getAllLawyerCases } from '@/lib/data/caseFiles';
import { Calendar, Clock, Building2, Scale, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

export default async function AudienciasPage() {
  const cases = await getAllLawyerCases();

  // Aplanar todas las audiencias
  const allHearings = cases.flatMap((c) =>
    c.hearings.map((h) => ({
      ...h,
      caseTitle: c.title,
      caseDocket: c.docketNumber,
      caseId: c.id,
      clientName: c.clientName,
    }))
  ).sort((a, b) => (a.hearingDate > b.hearingDate ? 1 : -1));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full">
      {/* Botón Volver */}
      <Link
        href="/expedientes"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-2xs hover:bg-slate-50 transition-colors w-fit"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver a Expedientes</span>
      </Link>

      {/* Cabecera */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-2">
            <Calendar className="w-3.5 h-3.5 text-amber-600" />
            <span>Agenda Procesal de Estrados</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            Calendario de Audiencias y Fijaciones
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Compromisos procesales en tribunales de la República Dominicana.
          </p>
        </div>
      </div>

      {/* Lista de Audiencias */}
      <div className="space-y-4">
        {allHearings.map((h) => (
          <div
            key={h.id}
            className={`p-6 rounded-3xl border transition-all space-y-3 ${
              h.isCompleted
                ? 'bg-slate-50 border-slate-200 opacity-80'
                : 'bg-white border-slate-200 shadow-2xs hover:shadow-md hover:border-amber-400'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-lg bg-slate-900 text-amber-400">
                  {h.hearingDate}
                </span>
                <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{h.time}</span>
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    h.isCompleted
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800 animate-pulse'
                  }`}
                >
                  {h.isCompleted ? 'Audiencia Celebrada' : 'Pendiente en Agenda'}
                </span>
              </div>

              <Link
                href={`/expedientes/${h.caseId}`}
                className="text-xs font-mono font-bold text-slate-700 hover:text-amber-600"
              >
                Exp. {h.caseDocket} →
              </Link>
            </div>

            <div>
              <h2 className="font-serif font-bold text-base text-slate-900">
                {h.purpose}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Caso: {h.caseTitle} • Cliente: <strong className="text-slate-800">{h.clientName}</strong>
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 font-medium">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span>{h.courtName} ({h.chamber})</span>
              </span>

              {h.outcomeNotes && (
                <span className="text-[11px] text-slate-500 italic">
                  Minuta: {h.outcomeNotes}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
