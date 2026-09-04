/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Archivo: src/app/(public)/conceptos/page.tsx
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
import { getAllLegalConcepts } from '@/lib/data/concepts';
import { BookOpen, Sparkles, ArrowRight, ShieldCheck, Scale, Clock, AlertTriangle } from 'lucide-react';

export default async function ConceptosIndexPage() {
  const concepts = await getAllLegalConcepts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full">
      {/* Cabecera */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-amber-600" />
          <span>Fichas Jurídicas de Conceptos e Instituciones</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
          Glosario Estructurado del Derecho Dominicano
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Cada institución jurídica cuenta con su ficha exhaustiva: definición, fundamento legal, plazos procesales, jurisprudencia de la SCJ y TC, errores frecuentes y lista de verificación práctica.
        </p>
      </div>

      {/* Grid de Conceptos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {concepts.map((concept) => (
          <Link
            key={concept.slug}
            href={`/conceptos/${concept.slug}`}
            className="group p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-lg hover:border-amber-500/40 transition-all duration-200 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200/80">
                  {concept.specialtyName}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {concept.legalBasis[0]?.normNumber || ''}
                </span>
              </div>

              <h2 className="text-xl font-serif font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                {concept.name}
              </h2>

              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {concept.definition}
              </p>

              {concept.deadlinesRules && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2 text-[11px] text-slate-700">
                  <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Plazo:</strong> {concept.deadlinesRules.duration}</span>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700 group-hover:text-amber-600">
              <span>Consultar ficha completa</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
