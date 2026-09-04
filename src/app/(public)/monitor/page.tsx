import Link from 'next/link';
import { getAllMonitorUpdates } from '@/lib/data/monitor';
import {
  Bell,
  ArrowRight,
  ShieldAlert,
  Layers,
  Calendar,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Bookmark
} from 'lucide-react';

export default async function MonitorJuridicoPage() {
  const updates = await getAllMonitorUpdates();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full">
      {/* Cabecera */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold uppercase tracking-wider">
          <Bell className="w-4 h-4 text-rose-600" />
          <span>Observatorio de Novedades Legislativas y Jurisprudenciales</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
          Monitor Jurídico Dominicano
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Alertas tempranas sobre promulgación de nuevas leyes, modificaciones normativas, sentencias de impacto del Tribunal Constitucional y decretos presidenciales publicados en la Gaceta Oficial.
        </p>
      </div>

      {/* Grid de Alertas */}
      <div className="space-y-4">
        {updates.map((up) => (
          <div
            key={up.id}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                    up.impactLevel === 'REFORMA_INTEGRAL'
                      ? 'bg-rose-100 text-rose-800'
                      : up.impactLevel === 'ALTO_IMPACTO'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {up.impactLevel.replace('_', ' ')}
                </span>
                <span className="text-xs font-bold text-slate-900">{up.officialNumber}</span>
                <span className="text-xs text-slate-400 font-mono">({up.gacetaRef})</span>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Promulgada: {up.promulgationDate}</span>
                </span>
                <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Vigencia: {up.effectiveDate}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider block">
                {up.specialtyName}
              </span>
              <h2 className="text-xl font-serif font-bold text-slate-900">
                {up.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {up.summary}
              </p>
            </div>

            {/* Cambios Principales */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
              <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block">
                Puntos Cardinales de la Reforma:
              </span>
              <ul className="space-y-1 text-slate-700 list-disc pl-4">
                {up.keyChanges.map((kc, idx) => (
                  <li key={idx}>{kc}</li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Normas Afectadas:</span>
                {up.affectedNorms.map((an, idx) => (
                  <span key={idx} className="font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                    {an}
                  </span>
                ))}
              </div>

              {up.urlAction && (
                <Link
                  href={up.urlAction}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold transition-colors"
                >
                  <span>Ver Detalle e Impacto</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
