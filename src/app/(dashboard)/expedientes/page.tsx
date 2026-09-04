/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Archivo: src/app/(dashboard)/expedientes/page.tsx
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
import { getAllLawyerCases } from '@/lib/data/caseFiles';
import {
  FolderKanban,
  Plus,
  Clock,
  Building2,
  Scale,
  ArrowRight,
  ShieldCheck,
  Search,
  FileCheck,
  Calendar
} from 'lucide-react';

export default async function ExpedientesPage() {
  const cases = await getAllLawyerCases();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full">
      {/* Cabecera */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-2">
            <FolderKanban className="w-3.5 h-3.5 text-amber-600" />
            <span>Panel Profesional del Abogado</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            Gestor de Expedientes Judiciales
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Control de casos, audiencias, plazos perentorios, piezas procesales y doctrina vinculada.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/clientes"
            className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors"
          >
            Directorio de Clientes
          </Link>
          <Link
            href="/audiencias"
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Calendario de Audiencias</span>
          </Link>
        </div>
      </div>

      {/* Grid de Expedientes */}
      <div className="grid grid-cols-1 gap-6">
        {cases.map((cs) => (
          <div
            key={cs.id}
            className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all space-y-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold font-mono px-3 py-1 rounded-xl bg-slate-900 text-amber-400">
                  {cs.docketNumber}
                </span>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    cs.status === 'EN_AUDIENCIA'
                      ? 'bg-amber-100 text-amber-800'
                      : cs.status === 'EN_TRAMITE'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {cs.status.replace(/_/g, ' ')}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    cs.priority === 'URGENTE'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  Prioridad: {cs.priority}
                </span>
              </div>

              <span className="text-xs text-slate-400">
                Apertura: {cs.openedAt}
              </span>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider block">
                {cs.specialtyName}
              </span>
              <h2 className="font-serif font-bold text-xl text-slate-900 leading-snug">
                {cs.title}
              </h2>
            </div>

            {/* Partes y Tribunal */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Cliente</span>
                <span className="font-bold text-slate-900">{cs.clientName}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Contraparte</span>
                <span className="font-bold text-slate-900">{cs.opposingParty}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Tribunal Apoderado</span>
                <span className="font-bold text-indigo-900 truncate block">{cs.courtAssigned}</span>
              </div>
            </div>

            {/* Próximas Audiencias y Plazos Fatal */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs border-t border-slate-100">
              <div className="flex flex-wrap items-center gap-4">
                {cs.hearings[0] && (
                  <div className="flex items-center gap-1.5 text-amber-800 bg-amber-50 px-3 py-1 rounded-xl font-medium border border-amber-200">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    <span>Próx. Audiencia: {cs.hearings[0].hearingDate} ({cs.hearings[0].time})</span>
                  </div>
                )}
                {cs.deadlines[0] && (
                  <div className="flex items-center gap-1.5 text-rose-800 bg-rose-50 px-3 py-1 rounded-xl font-medium border border-rose-200">
                    <Clock className="w-3.5 h-3.5 text-rose-600" />
                    <span>Vencimiento: {cs.deadlines[0].dueDate} ({cs.deadlines[0].daysRemaining} días)</span>
                  </div>
                )}
              </div>

              <Link
                href={`/expedientes/${cs.id}`}
                className="inline-flex items-center gap-1.5 font-bold text-xs text-slate-900 hover:text-amber-600 transition-colors"
              >
                <span>Abrir Ficha de Expediente</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
