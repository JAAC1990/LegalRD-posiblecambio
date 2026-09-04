'use client';

/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Archivo: src/app/(admin)/admin/especialidades/page.tsx
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
import { useState, useTransition } from 'react';
import Link from 'next/link';
import { SpecialtyIcon } from '@/components/legal/SpecialtyIcon';
import { createSpecialtyAction, deleteSpecialtyAction } from '@/lib/actions/specialties';
import {
  Award,
  Plus,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Search,
  ArrowLeft,
  X
} from 'lucide-react';

const INITIAL_LIST = [
  { id: '1', name: 'Derecho Laboral', slug: 'derecho-laboral', description: 'Código de Trabajo (Ley 16-92), contratos, desahucio y prestaciones.', iconName: 'Briefcase', displayOrder: 1 },
  { id: '2', name: 'Derecho Penal', slug: 'derecho-penal', description: 'Código Penal, tipos penales y sanciones.', iconName: 'ShieldAlert', displayOrder: 2 },
  { id: '3', name: 'Derecho Procesal Penal', slug: 'derecho-procesal-penal', description: 'Código Procesal Penal (Ley 76-02) y medidas de coerción.', iconName: 'Gavel', displayOrder: 3 },
  { id: '4', name: 'Derecho Civil', slug: 'derecho-civil', description: 'Código Civil, obligaciones y contratos.', iconName: 'BookOpen', displayOrder: 4 },
  { id: '5', name: 'Derecho Procesal Civil', slug: 'derecho-procesal-civil', description: 'Código de Procedimiento Civil y demandas.', iconName: 'FileText', displayOrder: 5 },
  { id: '6', name: 'Derecho de Familia', slug: 'derecho-de-familia', description: 'Régimen matrimonial y derecho de menores.', iconName: 'Users', displayOrder: 6 },
  { id: '7', name: 'Derecho Inmobiliario', slug: 'derecho-inmobiliario', description: 'Ley 108-05 de Registro Inmobiliario y títulos de propiedad.', iconName: 'Home', displayOrder: 7 },
  { id: '8', name: 'Derecho Comercial', slug: 'derecho-comercial', description: 'Código de Comercio y actos de comercio.', iconName: 'Store', displayOrder: 8 },
  { id: '9', name: 'Derecho Societario', slug: 'derecho-societario', description: 'Ley 479-08 de Sociedades Comerciales.', iconName: 'Building', displayOrder: 9 },
  { id: '10', name: 'Derecho Tributario', slug: 'derecho-tributario', description: 'Código Tributario (Ley 11-92) e impuestos internos.', iconName: 'Receipt', displayOrder: 10 },
  { id: '11', name: 'Derecho Administrativo', slug: 'derecho-administrativo', description: 'Ley 107-13 de Procedimiento Administrativo.', iconName: 'Landmark', displayOrder: 11 },
  { id: '12', name: 'Derecho Constitucional', slug: 'derecho-constitucional', description: 'Constitución Dominicana y sentencias del Tribunal Constitucional.', iconName: 'Scale', displayOrder: 12 },
  { id: '13', name: 'Derecho Migratorio', slug: 'derecho-migratorio', description: 'Ley General de Migración 285-04.', iconName: 'Globe', displayOrder: 13 },
  { id: '14', name: 'Derecho de Tránsito', slug: 'derecho-de-transito', description: 'Ley 63-17 de Movilidad y Seguridad Vial.', iconName: 'Car', displayOrder: 14 },
  { id: '15', name: 'Derecho Bancario y Financiero', slug: 'derecho-bancario', description: 'Ley 183-02 Monetaria y Financiera.', iconName: 'Coins', displayOrder: 15 },
  { id: '16', name: 'Derecho de Propiedad Intelectual', slug: 'propiedad-intelectual', description: 'Ley 20-00 de Propiedad Industrial y 65-00 de Derecho de Autor.', iconName: 'Award', displayOrder: 16 },
  { id: '17', name: 'Derecho Ambiental', slug: 'derecho-ambiental', description: 'Ley General sobre Medio Ambiente 64-00.', iconName: 'Trees', displayOrder: 17 },
  { id: '18', name: 'Derecho de Sucesiones', slug: 'derecho-de-sucesiones', description: 'Partición de herencia y testamentos.', iconName: 'Scroll', displayOrder: 18 },
  { id: '19', name: 'Derecho Internacional Privado', slug: 'internacional-privado', description: 'Ley 544-14 sobre Derecho Internacional Privado.', iconName: 'Compass', displayOrder: 19 },
];

/**
 * Componente Principal de Vista: `AdminSpecialtiesPage`
 * Renderiza la interfaz de usuario interactiva y coordina el flujo operativo del módulo.
 * @returns Elemento JSX representativo de la página o vista
 */
export default function AdminSpecialtiesPage() {
  const [specialties, setSpecialties] = useState(INITIAL_LIST);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [iconName, setIconName] = useState('Scale');
  const [displayOrder, setDisplayOrder] = useState(20);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function handleAutoSlug(value: string) {
    setName(value);
    const generated = value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9s-]/g, '')
      .replace(/s+/g, '-');
    setSlug(generated);
  }

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('slug', slug);
    formData.append('description', description);
    formData.append('iconName', iconName);
    formData.append('displayOrder', String(displayOrder));

    startTransition(async () => {
      const res = await createSpecialtyAction(null, formData);
      if (res?.error) {
        setError(res.error);
      } else {
        setSpecialties((prev) => [
          ...prev,
          { id: 'new-' + Date.now(), name, slug, description, iconName, displayOrder },
        ]);
        setSuccess('Especialidad jurídica registrada exitosamente.');
        setName('');
        setSlug('');
        setDescription('');
        setTimeout(() => setShowModal(false), 1200);
      }
    });
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`¿Estás seguro de eliminar la especialidad "${name}"?`)) return;
    startTransition(async () => {
      await deleteSpecialtyAction(id);
      setSpecialties((prev) => prev.filter((s) => s.id !== id));
    });
  }

  const filtered = specialties.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Cabecera y botón de acción */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-600" />
            <h1 className="text-2xl font-serif font-bold text-slate-900">
              Gestión de Especialidades Jurídicas
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Administra las ramas del Derecho Dominicano disponibles en la plataforma.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setShowModal(true);
            setError(null);
            setSuccess(null);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs font-bold shadow-md transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Agregar Nueva Especialidad</span>
        </button>
      </div>

      {/* Buscador de filtro */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center gap-3">
        <Search className="w-5 h-5 text-slate-400 shrink-0" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filtrar especialidades por nombre o descripción..."
          className="w-full text-xs text-slate-900 placeholder-slate-400 bg-transparent focus:outline-hidden"
        />
        <span className="text-xs font-semibold text-slate-400 shrink-0">
          {filtered.length} ramas
        </span>
      </div>

      {/* Tabla de Especialidades */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-4 w-12 text-center">#</th>
                <th className="py-3.5 px-4">Especialidad</th>
                <th className="py-3.5 px-4">Slug Identificador</th>
                <th className="py-3.5 px-4">Descripción</th>
                <th className="py-3.5 px-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((spec) => (
                <tr key={spec.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-400">
                    {spec.displayOrder}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3 font-semibold text-slate-900">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                        <SpecialtyIcon name={spec.iconName} className="w-4 h-4" />
                      </div>
                      <span>{spec.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-amber-700">
                    {spec.slug}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 max-w-xs truncate">
                    {spec.description}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      type="button"
                      onClick={() => handleDelete(spec.id, spec.name)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Eliminar especialidad"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para Crear Especialidad */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-lg text-slate-900">
                  Nueva Especialidad Jurídica
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nombre de la Especialidad
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleAutoSlug(e.target.value)}
                  placeholder="Ej. Derecho Marítimo y Portuario"
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Slug Identificador (URL)
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="derecho-maritimo"
                  className="w-full px-3.5 py-2.5 text-xs font-mono border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Descripción Doctrinal
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explica qué materias y leyes comprende esta especialidad..."
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 bg-slate-50/50 resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Icono Representativo
                  </label>
                  <select
                    value={iconName}
                    onChange={(e) => setIconName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-slate-50/50"
                  >
                    <option value="Scale">Scale (Balanza)</option>
                    <option value="BookOpen">BookOpen (Libro)</option>
                    <option value="Briefcase">Briefcase (Maletín)</option>
                    <option value="ShieldAlert">ShieldAlert (Escudo)</option>
                    <option value="Gavel">Gavel (Martillo)</option>
                    <option value="FileText">FileText (Expediente)</option>
                    <option value="Home">Home (Inmueble)</option>
                    <option value="Building">Building (Empresa)</option>
                    <option value="Landmark">Landmark (Gobierno)</option>
                    <option value="Coins">Coins (Finanzas)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Orden de Visualización
                  </label>
                  <input
                    type="number"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(parseInt(e.target.value, 10))}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-md disabled:opacity-50"
                >
                  {isPending ? 'Guardando...' : 'Crear Especialidad'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
