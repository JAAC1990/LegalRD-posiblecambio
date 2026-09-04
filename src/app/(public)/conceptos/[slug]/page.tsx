/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Archivo: src/app/(public)/conceptos/[slug]/page.tsx
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
import { notFound } from 'next/navigation';
import { getLegalConceptBySlug, getAllLegalConcepts } from '@/lib/data/concepts';
import {
  ArrowLeft,
  BookOpen,
  Scale,
  ShieldCheck,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Share2,
  Copy,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

/**
 * Función Operativa: `generateStaticParams`
 * Procesa la lógica de negocio y reglas jurídicas correspondientes.
 */
export async function generateStaticParams() {
  const concepts = await getAllLegalConcepts();
  return concepts.map((c) => ({ slug: c.slug }));
}

export default async function ConceptoDetailPage({ params }: Props) {
  const { slug } = await params;
  const concept = await getLegalConceptBySlug(slug);

  if (!concept) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full">
      {/* Botón Volver */}
      <Link
        href="/conceptos"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-2xs hover:bg-slate-50 transition-colors w-fit"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver a Fichas de Conceptos</span>
      </Link>

      {/* Cabecera Principal de la Ficha */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
              {concept.specialtyName}
            </span>
            <span className="text-xs text-slate-400 font-mono">Ficha ID: {concept.id}</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/asistente-ia?pregunta=${encodeURIComponent('Explícame con profundidad el concepto jurídico de ' + concept.name)}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-colors shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Consultar en IA</span>
            </Link>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl sm:text-4xl font-serif font-extrabold text-slate-900">
            {concept.name}
          </h1>
          <p className="text-base text-slate-700 leading-relaxed font-serif bg-slate-50 p-5 rounded-2xl border border-slate-200/70">
            {concept.definition}
          </p>
        </div>

        {/* Fundamento Legal */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>Fundamento Normativo en el Derecho Dominicano</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {concept.legalBasis.map((lb, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-200/60 space-y-1">
                <span className="text-xs font-bold text-slate-900 block">{lb.normName}</span>
                <span className="text-[11px] text-amber-800 font-medium block">{lb.articleRef}</span>
                <span className="text-[10px] text-slate-500 block">{lb.normNumber}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tipos o Modalidades si existen */}
      {concept.types && concept.types.length > 0 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-600" />
            <span>Clasificación y Modalidades Aplicables</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {concept.types.map((tp, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <h3 className="font-serif font-bold text-sm text-slate-900">{tp.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{tp.description}</p>
                <span className="inline-block text-[10px] font-semibold text-amber-800 bg-amber-100/60 px-2 py-0.5 rounded-md">
                  {tp.legalBasis}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Régimen de Plazos Procesales */}
      {concept.deadlinesRules && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-600" />
              <span>Cómputo de Plazos, Interrupción y Suspensión</span>
            </h2>
            <Link
              href="/calculadora-plazos"
              className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1"
            >
              <span>Abrir Calculadora de Plazos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs text-slate-800 space-y-2">
            <p><strong>Duración Legal:</strong> {concept.deadlinesRules.duration}</p>
            <p><strong>Inicio del Cómputo (Dies a quo):</strong> {concept.deadlinesRules.startsAt}</p>
            <p><strong>Causales de Interrupción:</strong> {concept.deadlinesRules.interruptionRules}</p>
            <p><strong>Causales de Suspensión:</strong> {concept.deadlinesRules.suspensionRules}</p>
            <p className="text-[11px] text-amber-900 font-mono mt-1 pt-1 border-t border-amber-200">
              Base Legal: {concept.deadlinesRules.legalRef}
            </p>
          </div>
        </div>
      )}

      {/* Jurisprudencia Relevante */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
        <h2 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2">
          <Scale className="w-5 h-5 text-purple-600" />
          <span>Criterios Jurisprudenciales de la SCJ y Tribunal Constitucional</span>
        </h2>
        <div className="space-y-3">
          {concept.keyCaseLaw.map((cl, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-purple-50/40 border border-purple-200/70 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-purple-900">{cl.sentenceNumber} — {cl.court}</span>
                <span className="text-slate-500 font-medium">{cl.year}</span>
              </div>
              <p className="text-xs font-serif text-slate-800 leading-relaxed">
                «{cl.summary}»
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Errores Frecuentes y Lista de Verificación */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-rose-50/60 border border-rose-200/80 space-y-3">
          <h3 className="font-serif font-bold text-base text-rose-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>Errores Frecuentes en la Práctica</span>
          </h3>
          <ul className="space-y-2 text-xs text-rose-900/90 list-disc pl-4">
            {concept.frequentMistakes.map((err, idx) => (
              <li key={idx} className="leading-relaxed">{err}</li>
            ))}
          </ul>
        </div>

        <div className="p-6 rounded-3xl bg-emerald-50/60 border border-emerald-200/80 space-y-3">
          <h3 className="font-serif font-bold text-base text-emerald-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Lista de Verificación Práctica (Checklist)</span>
          </h3>
          <ul className="space-y-2 text-xs text-emerald-900/90 list-disc pl-4">
            {concept.practicalChecklist.map((item, idx) => (
              <li key={idx} className="leading-relaxed">{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Artículos y Procedimientos Relacionados */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-md">
        <h3 className="font-serif font-bold text-lg text-amber-400">
          Navegación Transversal Relacionada
        </h3>
        <div className="flex flex-wrap gap-2">
          {concept.relatedArticles.map((ra, idx) => (
            <Link
              key={idx}
              href={`/normas/${ra.normSlug}/articulo/${ra.articleNum}`}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold transition-colors flex items-center gap-1.5 border border-slate-700"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-500" />
              <span>{ra.label}</span>
            </Link>
          ))}
          {concept.relatedProcedures.map((rp, idx) => (
            <Link
              key={idx}
              href={rp.url}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center gap-1.5 border border-slate-700"
            >
              <Scale className="w-3.5 h-3.5 text-slate-400" />
              <span>{rp.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
