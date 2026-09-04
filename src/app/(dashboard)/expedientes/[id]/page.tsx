/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Archivo: src/app/(dashboard)/expedientes/[id]/page.tsx
 * Área: Área Profesional y Privada (Despacho / Universidad)
 * 
 * DESCRIPCIÓN:
 * Gestión privada de causas judiciales, audiencias, clientes, expedientes y laboratorio de casos académicos.
 * 
 * CONTEXTO DE APLICACIÓN:
 * Diseñado conforme a las normas procesales y sustantivas vigentes
 * en la República Dominicana (Código Civil, Código de Trabajo,
 * Código de Procedimiento Civil, Ley 108-05, Ley 2-23, Ley 137-11).
 * ====================================================================
 */

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getLawyerCaseById, getAllLawyerCases } from '@/lib/data/caseFiles';
import {
  ArrowLeft,
  FolderKanban,
  Calendar,
  Clock,
  Building2,
  Scale,
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Lock
} from 'lucide-react';

interface Props {
  params: Promise<{ id: string }>;
}

/**
 * Función Operativa: `generateStaticParams`
 * Procesa la lógica de negocio y reglas jurídicas correspondientes.
 */
export async function generateStaticParams() {
  const cases = await getAllLawyerCases();
  return cases.map((c) => ({ id: c.id }));
}

export default async function ExpedienteDetailPage({ params }: Props) {
  const { id } = await params;
  const caseItem = await getLawyerCaseById(id);

  if (!caseItem) {
    notFound();
  }

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

      {/* Ficha Cabecera del Expediente */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-slate-900 text-amber-400">
              {caseItem.docketNumber}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
              {caseItem.specialtyName}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Apertura: {caseItem.openedAt}</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-400">Última actuación: {caseItem.lastActivityAt}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-slate-900">
            {caseItem.title}
          </h1>
          {caseItem.totalClaimAmountRD && (
            <p className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200 w-fit">
              Monto Reclamado: RD$ {caseItem.totalClaimAmountRD.toLocaleString()}
            </p>
          )}
        </div>

        {/* Partes, Abogado y Tribunal */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1 text-xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Cliente</span>
            <span className="font-bold text-slate-900 block">{caseItem.clientName}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1 text-xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Contraparte y Abogado</span>
            <span className="font-bold text-slate-900 block">{caseItem.opposingParty}</span>
            {caseItem.opposingCounsel && (
              <span className="text-[11px] text-slate-500 block">{caseItem.opposingCounsel}</span>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1 text-xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Tribunal y Juez</span>
            <span className="font-bold text-indigo-950 block">{caseItem.courtAssigned}</span>
            {caseItem.presidingJudge && (
              <span className="text-[11px] text-slate-500 block">{caseItem.presidingJudge}</span>
            )}
          </div>
        </div>
      </div>

      {/* Audiencias Programadas y Plazos Perentorios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Audiencias */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-600" />
            <span>Audiencias del Expediente</span>
          </h2>
          <div className="space-y-3">
            {caseItem.hearings.map((aud) => (
              <div
                key={aud.id}
                className={`p-4 rounded-2xl border text-xs space-y-1.5 ${
                  aud.isCompleted
                    ? 'bg-slate-50 border-slate-200 text-slate-600'
                    : 'bg-amber-50/60 border-amber-300 text-amber-950'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold">{aud.hearingDate} — {aud.time}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white">
                    {aud.isCompleted ? 'Celebrada' : 'Pendiente'}
                  </span>
                </div>
                <p className="font-semibold text-slate-900">{aud.purpose}</p>
                <p className="text-[11px] text-slate-500">{aud.courtName} ({aud.chamber})</p>
                {aud.outcomeNotes && (
                  <p className="text-[11px] italic bg-white/70 p-2 rounded-lg border border-slate-100">
                    Resultado: {aud.outcomeNotes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Plazos y Caducidades */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-rose-600" />
            <span>Plazos Perentorios y Vencimientos</span>
          </h2>
          <div className="space-y-3">
            {caseItem.deadlines.map((dl) => (
              <div
                key={dl.id}
                className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 text-xs space-y-1.5 text-rose-950"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold">{dl.title}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-200 text-rose-900">
                    {dl.daysRemaining} días restantes
                  </span>
                </div>
                <p className="font-semibold text-rose-900">Fecha Límite: {dl.dueDate}</p>
                <p className="text-[11px] text-rose-800">{dl.notes}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Documentos Adjuntos y Piezas Procesales */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
        <h2 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <span>Piezas Procesales y Evidencias Adjuntas</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {caseItem.documents.map((doc) => (
            <div key={doc.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1 text-xs">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 uppercase">
                {doc.category}
              </span>
              <span className="font-bold text-slate-900 block mt-1">{doc.name}</span>
              <span className="text-[10px] text-slate-400 block">{doc.uploadDate} • {doc.fileSizeText}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Normas Vinculadas y Notas de Estrategia Confidencial */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-700 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-600" />
            <span>Artículos Dominicanos Vinculados</span>
          </h2>
          <div className="space-y-2">
            {caseItem.linkedArticles.map((art, idx) => (
              <Link
                key={idx}
                href={`/normas/${art.normSlug}/articulo/${art.articleNum}`}
                className="p-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-semibold flex items-center justify-between transition-colors border border-amber-200"
              >
                <span>{art.label}</span>
                <span className="text-[11px] text-amber-700">Ver texto de ley →</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-3 shadow-md">
          <h2 className="text-sm font-bold uppercase tracking-widest text-amber-400 flex items-center gap-2">
            <Lock className="w-4 h-4" />
            <span>Notas Internas de Estrategia (Confidencial)</span>
          </h2>
          <p className="text-xs font-serif leading-relaxed text-slate-300 bg-slate-800 p-4 rounded-2xl border border-slate-700">
            {caseItem.internalStrategyNotes}
          </p>
        </div>
      </div>
    </div>
  );
}
