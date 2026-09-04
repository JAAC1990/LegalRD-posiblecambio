/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Archivo: src/app/(dashboard)/favoritos/page.tsx
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
import { Bookmark, BookOpen, Scale, ArrowRight, Trash2 } from 'lucide-react';

/**
 * Componente Principal de Vista: `FavoritosPage`
 * Renderiza la interfaz de usuario interactiva y coordina el flujo operativo del módulo.
 * @returns Elemento JSX representativo de la página o vista
 */
export default function FavoritosPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Bookmark className="w-6 h-6 text-amber-600" />
            <h1 className="text-2xl font-serif font-bold text-slate-900">Mis Favoritos</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">Leyes, artículos y sentencias guardadas para consulta rápida.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">Ley 16-92</span>
            <span className="text-xs text-slate-400">Guardado recientemente</span>
          </div>
          <h2 className="font-serif font-bold text-base text-slate-900">Código de Trabajo de la República Dominicana</h2>
          <p className="text-xs text-slate-500 line-clamp-2">Cuerpo rector de las relaciones laborales individuales y colectivas.</p>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <Link href="/normas/codigo-de-trabajo-ley-16-92" className="font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1">
              <span>Abrir Norma</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">Art. 80</span>
            <span className="text-xs text-slate-400">Guardado recientemente</span>
          </div>
          <h2 className="font-serif font-bold text-base text-slate-900">Auxilio de Cesantía por Desahucio</h2>
          <p className="text-xs text-slate-500 line-clamp-2">Escala de compensación por terminación unilateral del contrato de trabajo.</p>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <Link href="/normas/codigo-de-trabajo-ley-16-92/articulo/80" className="font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1">
              <span>Ver Artículo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
