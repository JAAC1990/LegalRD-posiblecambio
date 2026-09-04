/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Archivo: src/app/(public)/generador-documentos/page.tsx
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
import { getAllDocumentTemplates } from '@/lib/data/documentTemplates';
import { FileText, ArrowRight, Sparkles, Scale, CheckCircle2, ShieldCheck, Download } from 'lucide-react';

export default async function GeneradorDocumentosIndexPage() {
  const templates = await getAllDocumentTemplates();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full">
      {/* Cabecera */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold uppercase tracking-wider">
          <FileText className="w-4 h-4 text-blue-600" />
          <span>Generador Inteligente de Borradores Jurídicos</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
          Modelos de Contratos, Demandas e Instancias
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Genera borradores estructurados y adaptados al ordenamiento dominicano. Responde las preguntas guiadas del formulario para obtener un documento legal personalizado listo para editar, copiar o descargar.
        </p>
      </div>

      {/* Grid de Plantillas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map((tpl) => (
          <div
            key={tpl.slug}
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 border border-blue-200">
                  {tpl.category}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  {tpl.fields.length} campos guiados
                </span>
              </div>

              <h2 className="text-lg font-serif font-bold text-slate-900 leading-snug">
                {tpl.title}
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed">
                {tpl.description}
              </p>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 font-mono">
                Base: {tpl.legalBasis}
              </div>
            </div>

            <Link
              href={`/generador-documentos/${tpl.slug}`}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <span>Completar Formulario y Generar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
