/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Archivo: src/app/(dashboard)/carpetas/page.tsx
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
import { FolderKanban, Plus, Folder, FileText, ArrowRight } from 'lucide-react';

/**
 * Componente Principal de Vista: `CarpetasPage`
 * Renderiza la interfaz de usuario interactiva y coordina el flujo operativo del módulo.
 * @returns Elemento JSX representativo de la página o vista
 */
export default function CarpetasPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FolderKanban className="w-6 h-6 text-purple-600" />
            <h1 className="text-2xl font-serif font-bold text-slate-900">Carpetas de Casos & Estudio</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">Organiza expedientes, normas y notas jurídicas por caso o materia.</p>
        </div>

        <button type="button" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs font-bold shadow-md transition-all cursor-pointer shrink-0">
          <Plus className="w-4 h-4" />
          <span>Crear Nueva Carpeta</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Folder className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-lg text-slate-900">Caso Demanda Laboral Hnos. Pérez</h2>
            <p className="text-xs text-slate-500 mt-1">3 leyes y 2 notas vinculadas</p>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-purple-600">
            <span>Abrir Expediente</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Folder className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-lg text-slate-900">Preparación Examen Derecho Civil II</h2>
            <p className="text-xs text-slate-500 mt-1">5 artículos y 1 cuestionario</p>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
            <span>Abrir Carpeta</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
