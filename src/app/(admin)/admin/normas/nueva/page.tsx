import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { getAllSpecialties } from '@/lib/data/specialties';

export default async function AdminNewNormPage() {
  const specialties = await getAllSpecialties();

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/normas"
          className="p-2 rounded-xl text-slate-500 hover:text-slate-900 bg-white border border-slate-200"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900">
            Registrar Nueva Norma Jurídica
          </h1>
          <p className="text-xs text-slate-500">
            Ingresa la información oficial para catalogar una nueva ley, código o decreto dominicano.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Número de la Norma / Ley
              </label>
              <input
                type="text"
                required
                placeholder="Ej. Ley 16-92, Ley 108-05, Dec. 258-93"
                className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Especialidad Jurídica
              </label>
              <select className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl bg-slate-50/50">
                {specialties.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nombre Oficial de la Norma
            </label>
            <input
              type="text"
              required
              placeholder="Ej. Código de Trabajo de la República Dominicana"
              className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl bg-slate-50/50"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tipo de Norma
              </label>
              <select className="w-full px-3 py-2.5 text-xs border border-slate-300 rounded-xl bg-slate-50/50">
                <option value="CONSTITUTION">Constitución</option>
                <option value="CODE">Código</option>
                <option value="LAW">Ley</option>
                <option value="DECREE">Decreto</option>
                <option value="REGULATION">Reglamento</option>
                <option value="RESOLUTION">Resolución</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Estado de Vigencia
              </label>
              <select className="w-full px-3 py-2.5 text-xs border border-slate-300 rounded-xl bg-slate-50/50">
                <option value="VIGENTE">Vigente</option>
                <option value="MODIFICADA">Modificada</option>
                <option value="DEROGADA">Derogada</option>
                <option value="PARCIALMENTE_DEROGADA">Parcialmente Derogada</option>
                <option value="SUSPENDIDA">Suspendida</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Fuente Oficial / Gaceta
              </label>
              <input
                type="text"
                placeholder="Gaceta Oficial No. 9836"
                className="w-full px-3 py-2.5 text-xs border border-slate-300 rounded-xl bg-slate-50/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Resumen Doctrinal y Objeto de la Ley
            </label>
            <textarea
              rows={3}
              placeholder="Describe el ámbito de aplicación y objetivos principales de la norma..."
              className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl bg-slate-50/50 resize-none"
            ></textarea>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <Link
              href="/admin/normas"
              className="px-5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancelar
            </Link>
            <button
              type="button"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-md cursor-pointer"
            >
              <Save className="w-4 h-4 text-amber-400" />
              <span>Guardar Norma</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
