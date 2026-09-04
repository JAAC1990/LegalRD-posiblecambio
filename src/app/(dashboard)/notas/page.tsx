import Link from 'next/link';
import { FileEdit, Plus, Lock, Calendar, Trash2, ArrowRight } from 'lucide-react';

export default function NotasPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FileEdit className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-serif font-bold text-slate-900">Mis Notas Privadas</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">Anotaciones doctrinales y análisis de casos vinculados a artículos de ley.</p>
        </div>

        <button type="button" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs font-bold shadow-md transition-all cursor-pointer shrink-0">
          <Plus className="w-4 h-4" />
          <span>Redactar Nueva Nota</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">Vinculada al Art. 80</span>
            <div className="flex items-center gap-1 text-slate-400">
              <Lock className="w-3 h-3" />
              <span>Privada</span>
            </div>
          </div>
          <h2 className="font-serif font-bold text-base text-slate-900">Cálculo de Prestaciones Caso Empresa X</h2>
          <p className="text-xs text-slate-600 leading-relaxed font-serif bg-slate-50 p-3 rounded-xl">
            Verificar que para trabajadores con más de 5 años ininterrumpidos corresponde aplicar la regla de 23 días de salario por año trabajado.
          </p>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span>26 de agosto de 2026</span>
            <Link href="/normas/codigo-de-trabajo-ley-16-92/articulo/80" className="font-semibold text-blue-600 hover:text-blue-700">
              Ir al artículo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
