import Link from 'next/link';
import { getAllComparativeInstitutions } from '@/lib/data/comparativeLaw';
import { Globe, ArrowRight, ShieldAlert, CheckCircle2, Scale, BookOpen } from 'lucide-react';

export default async function DerechoComparadoPage() {
  const institutions = await getAllComparativeInstitutions();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full">
      {/* Cabecera */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold uppercase tracking-wider">
          <Globe className="w-4 h-4 text-blue-600" />
          <span>Derecho Comparado e Integración Jurídica</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
          Comparador Internacional de Instituciones Jurídicas
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Compara las figuras clave del ordenamiento dominicano con España, Estados Unidos, México y Colombia. Conoce semejanzas, divergencias estructurales y lecciones prácticas, salvaguardando siempre la soberanía legal dominicana.
        </p>
      </div>

      {/* Aviso Obligatorio de Soberanía Jurídica */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/90 flex items-start gap-3 text-xs text-amber-950">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold block uppercase tracking-wider">
            Principio de Soberanía y Territorialidad Normativa (Art. 3 Constitución Dominicana)
          </span>
          <p className="leading-relaxed text-amber-900">
            La legislación y jurisprudencia de países extranjeros constituyen fuentes doctrinales estrictamente persuasivas y comparativas. En el territorio de la República Dominicana rige con carácter exclusivo el ordenamiento jurídico nacional proclamado conforme a la Constitución.
          </p>
        </div>
      </div>

      {/* Grid de Instituciones Comparadas */}
      <div className="space-y-8">
        {institutions.map((inst) => (
          <div
            key={inst.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 text-slate-800">
                  {inst.specialtyName}
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mt-1">
                  {inst.institutionName}
                </h2>
              </div>
            </div>

            {/* Marco Dominicano */}
            <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block">
                🇩🇴 Régimen Jurídico en la República Dominicana
              </span>
              <p className="text-xs font-bold text-slate-200">{inst.dominicanFramework.governingNorm}</p>
              <p className="text-xs text-slate-300 font-serif leading-relaxed">
                {inst.dominicanFramework.description}
              </p>
            </div>

            {/* Comparativa con Países Extranjeros */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Contraste con Ordenamientos Extranjeros:
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {inst.foreignComparisons.map((fc, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{fc.flagEmoji}</span>
                          <span className="font-serif font-bold text-sm text-slate-900">{fc.countryName}</span>
                        </div>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                          {fc.normativeFamily}
                        </span>
                      </div>

                      <p className="text-[11px] font-mono text-slate-500">{fc.governingNorm}</p>

                      <div className="space-y-1 text-xs">
                        <span className="font-bold text-slate-800 text-[11px] block">Divergencia Principal:</span>
                        <p className="text-slate-600 text-xs leading-relaxed">{fc.keyDifferences}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Conclusiones Prácticas */}
            <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200/80 space-y-1 text-xs text-blue-950">
              <span className="font-bold block">Observación para Litigantes en RD:</span>
              <ul className="space-y-1 list-disc pl-4 text-blue-900">
                {inst.practicalInsights.map((insight, idx) => (
                  <li key={idx}>{insight}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
