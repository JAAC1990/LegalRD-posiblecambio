import Link from 'next/link';
import { getAllSpecialties } from '@/lib/data/specialties';
import { SpecialtyIcon } from '@/components/legal/SpecialtyIcon';
import {
  Scale,
  ArrowRight,
  BookOpen,
  FolderKanban,
  Search,
  Layers,
  Sparkles,
  CheckCircle2,
  Tag
} from 'lucide-react';

interface Props {
  searchParams: Promise<{ cat?: string; q?: string }>;
}

export default async function EspecialidadesPage({ searchParams }: Props) {
  const { cat = 'todas', q = '' } = await searchParams;
  const allSpecialties = await getAllSpecialties();

  // Filtrado por categoría
  let filtered = allSpecialties;
  if (cat !== 'todas') {
    filtered = filtered.filter((s) => s.groupCategory?.toLowerCase().includes(cat.toLowerCase()));
  }

  // Filtrado por búsqueda
  if (q.trim()) {
    const term = q.toLowerCase().trim();
    filtered = filtered.filter(
      (s) =>
        s.name.toLowerCase().includes(term) ||
        (s.description && s.description.toLowerCase().includes(term)) ||
        (s.subtopics && s.subtopics.some((st) => st.toLowerCase().includes(term)))
    );
  }

  const categories = [
    { id: 'todas', label: 'Todas las Ramas (42)' },
    { id: 'público', label: 'Público & Institucional' },
    { id: 'privado', label: 'Privado & Patrimonial' },
    { id: 'penal', label: 'Penal & Punitivo' },
    { id: 'procesal', label: 'Procesal & Litigación' },
    { id: 'social', label: 'Social & Trabajo' },
    { id: 'corporativo', label: 'Corporativo & Mercantil' },
    { id: 'regulatorio', label: 'Regulatorio & Recursos' },
    { id: 'tecnológico', label: 'Tecnología & Digital' },
    { id: 'internacional', label: 'Internacional & Tratados' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 w-full">
      {/* Cabecera */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider shadow-2xs">
          <Scale className="w-4 h-4 text-amber-600" />
          <span>Mapa Maestro del Derecho Dominicano</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-slate-900 tracking-tight">
          Taxonomía de las 42 Ramas Jurídicas
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto font-serif">
          Directorio integral y estructurado de todas las especialidades y submaterias del ordenamiento legal dominicano, con sus códigos, jurisprudencia y guías procesales.
        </p>
      </div>

      {/* Buscador y Filtros por Categoría */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-600" />
            <span className="text-sm font-bold text-slate-900">
              Mostrando {filtered.length} de {allSpecialties.length} especialidades
            </span>
          </div>

          <form method="GET" action="/especialidades" className="flex items-center gap-2 w-full sm:w-auto">
            <input type="hidden" name="cat" value={cat} />
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="q"
                defaultValue={q}
                placeholder="Buscar rama o submateria (ej. divorcio, lavado, aduanas)..."
                className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-slate-900 bg-slate-50/50"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 text-amber-400 font-bold text-xs rounded-xl hover:bg-slate-800 transition-colors shadow-xs shrink-0 cursor-pointer"
            >
              Filtrar
            </button>
          </form>
        </div>

        {/* Chips de Categorías */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100 text-xs">
          {categories.map((c) => {
            const isActive = cat === c.id;
            return (
              <Link
                key={c.id}
                href={`/especialidades?cat=${c.id}${q ? `&q=${encodeURIComponent(q)}` : ''}`}
                className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                  isActive
                    ? 'bg-slate-900 text-amber-400 shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {c.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Grid de Especialidades */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((spec) => (
            <Link
              key={spec.slug}
              href={`/especialidades/${spec.slug}`}
              className="group p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-xl hover:border-amber-500/50 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 group-hover:bg-amber-600 text-amber-400 group-hover:text-white flex items-center justify-center transition-colors shadow-xs">
                    <SpecialtyIcon name={spec.iconName} className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                    #{String(spec.displayOrder).padStart(2, '0')}
                  </span>
                </div>

                {spec.groupCategory && (
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60 inline-block">
                    {spec.groupCategory}
                  </span>
                )}

                <h2 className="font-serif font-bold text-xl text-slate-900 group-hover:text-amber-700 transition-colors">
                  {spec.name}
                </h2>

                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 font-serif">
                  {spec.description}
                </p>

                {/* Submaterias Destacadas del PDF */}
                {spec.subtopics && spec.subtopics.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-1">
                    {spec.subtopics.slice(0, 4).map((st, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                      >
                        {st}
                      </span>
                    ))}
                    {spec.subtopics.length > 4 && (
                      <span className="text-[10px] font-semibold text-amber-700 px-1 py-0.5">
                        +{spec.subtopics.length - 4} más
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-amber-700 group-hover:underline flex items-center gap-1">
                  <span>Ver materias y leyes</span>
                </span>
                <ArrowRight className="w-4 h-4 text-amber-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="p-12 rounded-3xl bg-white border border-slate-200 text-center space-y-3">
          <Scale className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="font-serif font-bold text-lg text-slate-900">No se encontraron ramas jurídicas</h3>
          <p className="text-xs text-slate-500">
            Intenta con otro término o selecciona &quot;Todas las Ramas (42)&quot;.
          </p>
          <Link
            href="/especialidades"
            className="inline-block text-xs font-semibold text-amber-600 hover:text-amber-700"
          >
            Restablecer búsqueda
          </Link>
        </div>
      )}
    </div>
  );
}