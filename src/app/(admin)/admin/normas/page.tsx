/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Archivo: src/app/(admin)/admin/normas/page.tsx
 * Área: Panel de Administración y Control Gubernativo
 * 
 * DESCRIPCIÓN:
 * Gestión centralizada de normas, especialidades, auditoría de eventos y aprobación de cuentas de abogados.
 * 
 * CONTEXTO DE APLICACIÓN:
 * Diseñado conforme a las normas procesales y sustantivas vigentes
 * en la República Dominicana (Código Civil, Código de Trabajo,
 * Código de Procedimiento Civil, Ley 108-05, Ley 2-23, Ley 137-11).
 * ====================================================================
 */

import Link from 'next/link';
import { getAllNorms } from '@/lib/data/norms';
import { BookOpen, Plus, ArrowRight } from 'lucide-react';

export default async function AdminNormasPage() {
  const norms = await getAllNorms();

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-amber-600" />
            <h1 className="text-2xl font-serif font-bold text-slate-900">
              Gestión de Códigos y Leyes
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Administra los cuerpos normativos del ordenamiento jurídico dominicano.
          </p>
        </div>

        <Link
          href="/admin/normas/nueva"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs font-bold shadow-md transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Registrar Nueva Norma</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-4">Número</th>
                <th className="py-3.5 px-4">Nombre de la Norma</th>
                <th className="py-3.5 px-4">Especialidad</th>
                <th className="py-3.5 px-4">Tipo</th>
                <th className="py-3.5 px-4">Estado</th>
                <th className="py-3.5 px-4 text-center">Artículos</th>
                <th className="py-3.5 px-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {norms.map((norm) => (
                <tr key={norm.slug} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-amber-700">
                    {norm.number}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 max-w-sm truncate">
                    {norm.name}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    {norm.specialtyName}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {norm.normType}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {norm.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-semibold text-slate-700">
                    {norm.articlesCount}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <Link
                      href={`/normas/${norm.slug}`}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-slate-100 transition-colors inline-block"
                      title="Ver Ficha"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
