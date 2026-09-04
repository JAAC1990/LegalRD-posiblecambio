import Link from 'next/link';
import { getAllDominicanTramites } from '@/lib/data/tramites';
import {
  FolderKanban,
  Building2,
  Clock,
  Coins,
  ArrowRight,
  FileCheck,
  ExternalLink,
  ShieldCheck,
  Search
} from 'lucide-react';

export default async function TramitesIndexPage() {
  const tramites = await getAllDominicanTramites();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full">
      {/* Cabecera */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
          <FolderKanban className="w-4 h-4 text-emerald-600" />
          <span>Ventanilla Única de Trámites Oficiales</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
          Guía de Trámites Jurídicos de la República Dominicana
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Requisitos, documentos obligatorios, costos oficiales en pesos dominicanos (RD$), formularios descargables, plazos de respuesta y canales oficiales de las instituciones públicas.
        </p>
      </div>

      {/* Grid de Trámites */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tramites.map((t) => (
          <div
            key={t.slug}
            className="p-7 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {t.institutionCategory}
                </span>
                <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t.estimatedDays}</span>
                </span>
              </div>

              <div>
                <h2 className="text-xl font-serif font-bold text-slate-900 leading-snug">
                  {t.title}
                </h2>
                <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-600">
                  <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{t.institution}</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {t.overview}
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <Coins className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Costo Oficial:</strong> {t.officialCostRD}</span>
                </div>
                <div className="flex items-start gap-2">
                  <FileCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Requisitos Clave:</strong> {t.prerequisites[0]}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">
                {t.mandatoryDocuments.length} documentos requeridos
              </span>
              <Link
                href={`/tramites/${t.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-emerald-700 transition-colors"
              >
                <span>Ver Guía Completa de Trámite</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
