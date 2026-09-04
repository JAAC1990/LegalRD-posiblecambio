/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Archivo: src/app/(public)/tramites/[slug]/page.tsx
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
import { getTramiteBySlug, getAllDominicanTramites } from '@/lib/data/tramites';
import {
  ArrowLeft,
  Building2,
  Clock,
  Coins,
  FileCheck,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Download,
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
  const tramites = await getAllDominicanTramites();
  return tramites.map((t) => ({ slug: t.slug }));
}

export default async function TramiteDetailPage({ params }: Props) {
  const { slug } = await params;
  const tramite = await getTramiteBySlug(slug);

  if (!tramite) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full">
      {/* Botón Volver */}
      <Link
        href="/tramites"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-2xs hover:bg-slate-50 transition-colors w-fit"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver a la Guía de Trámites</span>
      </Link>

      {/* Cabecera Principal */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
            {tramite.institution}
          </span>
          <a
            href={tramite.officialPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
          >
            <span>Portal Oficial Institucional</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <h1 className="text-2xl sm:text-4xl font-serif font-extrabold text-slate-900">
          {tramite.title}
        </h1>

        <p className="text-sm text-slate-600 leading-relaxed font-sans">
          {tramite.overview}
        </p>

        {/* Ficha Resumen Rápido */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/70 space-y-1">
            <span className="text-[11px] font-bold text-amber-800 uppercase flex items-center gap-1">
              <Coins className="w-3.5 h-3.5" />
              <span>Costo Oficial (RD$)</span>
            </span>
            <p className="text-xs font-semibold text-slate-900">{tramite.officialCostRD}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[11px] font-bold text-slate-700 uppercase flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>Plazo Estimado</span>
            </span>
            <p className="text-xs font-semibold text-slate-900">{tramite.estimatedDays}</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/70 space-y-1">
            <span className="text-[11px] font-bold text-emerald-800 uppercase flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Base Jurídica</span>
            </span>
            <p className="text-xs font-semibold text-slate-900">{tramite.legalBasis}</p>
          </div>
        </div>
      </div>

      {/* Requisitos Previos y Documentos Obligatorios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Requisitos Previos</span>
          </h2>
          <ul className="space-y-2.5 text-xs text-slate-700">
            {tramite.prerequisites.map((req, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5"></span>
                <span className="leading-relaxed">{req}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-indigo-600" />
            <span>Documentos Obligatorios</span>
          </h2>
          <div className="space-y-3">
            {tramite.mandatoryDocuments.map((doc, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{doc.name}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-200 text-slate-700">
                    {doc.isOriginal ? 'Original' : 'Copia'} ({doc.copiesNeeded})
                  </span>
                </div>
                {doc.observations && (
                  <p className="text-[11px] text-slate-500 italic">{doc.observations}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pasos a Seguir */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <h2 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2">
          <span>Paso a Paso del Trámite</span>
        </h2>

        <div className="space-y-4">
          {tramite.steps.map((st) => (
            <div key={st.stepNumber} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
              <div className="w-8 h-8 rounded-xl bg-slate-900 text-amber-400 font-serif font-bold flex items-center justify-center shrink-0 text-sm">
                {st.stepNumber}
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-serif font-bold text-sm text-slate-900">{st.title}</h3>
                  <span className="text-[10px] font-semibold text-slate-500 uppercase">
                    Responsable: {st.responsibleEntity}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{st.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Formulario y Canales Oficiales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-3 shadow-sm">
          <h3 className="font-serif font-bold text-base text-amber-400 flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span>Formularios Oficiales</span>
          </h3>
          <div className="space-y-2">
            {tramite.officialForms.map((f, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-amber-300 block">{f.formCode}</span>
                  <span className="text-slate-300 text-[11px]">{f.title}</span>
                </div>
                <Link
                  href="/repositorio"
                  className="px-2.5 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-amber-400 text-[11px] font-semibold"
                >
                  Descargar
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-xs">
          <h3 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-emerald-600" />
            <span>Canales de Atención Oficial</span>
          </h3>
          <div className="space-y-2 text-xs text-slate-600">
            <p className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>{tramite.contactChannels.phone}</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{tramite.contactChannels.email}</span>
            </p>
            <p className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>{tramite.contactChannels.physicalAddress}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
