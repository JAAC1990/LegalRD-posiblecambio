/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Archivo: src/app/(public)/normas/page.tsx
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

import Link from 'next/link';
import { getAllNorms } from '@/lib/data/norms';
import { BookOpen, FileText, Calendar, Building2, ArrowRight } from 'lucide-react';

const STATUS_BADGES: Record<string, { label: string; color: string }> = {
  VIGENTE: { label: 'Vigente', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  MODIFICADA: { label: 'Modificada', color: 'bg-amber-50 text-amber-800 border-amber-200' },
  DEROGADA: { label: 'Derogada', color: 'bg-rose-50 text-rose-800 border-rose-200' },
  PARCIALMENTE_DEROGADA: { label: 'Parcialmente Derogada', color: 'bg-orange-50 text-orange-800 border-orange-200' },
};

const TYPE_LABELS: Record<string, string> = {
  CONSTITUTION: 'Constitución',
  CODE: 'Código',
  LAW: 'Ley Ordinaria',
  DECREE: 'Decreto',
  REGULATION: 'Reglamento',
  RESOLUTION: 'Resolución',
};

export default async function NormasPage() {
  const norms = await getAllNorms();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-blue-600" />
          <span>Biblioteca Legislativa Consolidada</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
          Códigos, Leyes y Normas Dominicanas
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Consulta los textos normativos estructurados de la República Dominicana, clasificados por materia, estado de vigencia y fuente de promulgación en la Gaceta Oficial.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {norms.map((norm) => {
          const statusInfo = STATUS_BADGES[norm.status] || STATUS_BADGES.VIGENTE;
          const typeName = TYPE_LABELS[norm.normType] || norm.normType;

          return (
            <Link
              key={norm.slug}
              href={`/normas/${norm.slug}`}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-xl hover:border-amber-500/50 transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
                      {norm.number}
                    </span>
                    <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                      {typeName}
                    </span>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusInfo.color}`}>
                    {statusInfo.label}
                  </span>
                </div>

                <div>
                  <h2 className="font-serif font-bold text-xl text-slate-900 group-hover:text-amber-700 transition-colors leading-snug">
                    {norm.name}
                  </h2>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                    {norm.summary}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>{norm.specialtyName}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Promulgada: {norm.promulgationDate}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600 group-hover:text-amber-600">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-slate-400" />
                  <span>{norm.articlesCount} Artículos catalogados</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>Abrir Ficha de la Ley</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
