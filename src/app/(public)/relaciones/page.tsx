import Link from 'next/link';
import { getAllLegalRelations, RelationType } from '@/lib/data/relations';
import {
  GitFork,
  ArrowRight,
  ShieldAlert,
  Layers,
  FileText,
  Search,
  BookOpen,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  History,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface Props {
  searchParams: Promise<{ tipo?: string; rama?: string; q?: string }>;
}

export default async function RelacionesNormasPage({ searchParams }: Props) {
  const { tipo = 'todas', rama = 'todas', q = '' } = await searchParams;
  const allRelations = await getAllLegalRelations();

  // Filtrado por tipo de relación
  let filtered = allRelations;
  if (tipo !== 'todas') {
    filtered = filtered.filter((r) => r.relationType.toLowerCase() === tipo.toLowerCase());
  }

  // Filtrado por rama
  if (rama !== 'todas') {
    filtered = filtered.filter((r) => r.branchSlug.toLowerCase() === rama.toLowerCase());
  }

  // Filtrado por búsqueda
  if (q.trim()) {
    const term = q.toLowerCase().trim();
    filtered = filtered.filter(
      (r) =>
        r.sourceNorm.name.toLowerCase().includes(term) ||
        r.sourceNorm.number.toLowerCase().includes(term) ||
        r.targetNorm.name.toLowerCase().includes(term) ||
        r.targetNorm.number.toLowerCase().includes(term) ||
        r.description.toLowerCase().includes(term) ||
        r.relationLabel.toLowerCase().includes(term)
    );
  }

  const relationTypes = [
    { id: 'todas', label: 'Todas las Relaciones' },
    { id: 'repeals', label: '❌ Derogaciones / Sustituciones' },
    { id: 'modifies', label: '✏️ Modificaciones Parciales' },
    { id: 'regulates', label: '📜 Decretos Reglamentarios' },
    { id: 'complements', label: '🔗 Leyes Complementarias' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 w-full">
      {/* Cabecera Hero */}
      <section className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-900 text-xs font-bold uppercase tracking-wider shadow-2xs">
          <GitFork className="w-4 h-4 text-purple-600" />
          <span>Trazabilidad & Conectividad Jurídica</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-slate-900 tracking-tight leading-tight">
          Mapa Visual de Relaciones entre <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-800 to-slate-900">
            Leyes, Códigos y Decretos Dominicanos
          </span>
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto font-serif">
          Visualiza de forma inmediata cómo una ley deroga a otra, cuáles artículos son modificados por nuevas normas y qué decretos reglamentan los códigos sustantivos.
        </p>
      </section>

      {/* Matriz de Tipos de Relaciones */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
          <strong className="text-rose-900 block font-bold">Derogación (REPEALS)</strong>
          <span className="text-rose-700 text-[11px]">Deja sin efecto legal total o parcial una norma previa.</span>
        </div>
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
          <strong className="text-amber-900 block font-bold">Modificación (MODIFIES)</strong>
          <span className="text-amber-700 text-[11px]">Reforma artículos específicos manteniendo la ley base.</span>
        </div>
        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-1">
          <strong className="text-blue-900 block font-bold">Reglamentación (REGULATES)</strong>
          <span className="text-blue-700 text-[11px]">Decreto que detalla la aplicación práctica de una ley.</span>
        </div>
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
          <strong className="text-emerald-900 block font-bold">Complementación (COMPLEMENTS)</strong>
          <span className="text-emerald-700 text-[11px]">Leyes penales o adjetivas que complementan la materia.</span>
        </div>
      </section>

      {/* Filtros y Buscador */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-bold text-slate-900">
              Mostrando {filtered.length} de {allRelations.length} relaciones normativas
            </span>
          </div>

          <form method="GET" action="/relaciones" className="flex items-center gap-2 w-full sm:w-auto">
            <input type="hidden" name="tipo" value={tipo} />
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="q"
                defaultValue={q}
                placeholder="Buscar por ley, código o materia..."
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

        {/* Chips de Tipos */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100 text-xs">
          {relationTypes.map((rt) => {
            const isActive = tipo === rt.id;
            return (
              <Link
                key={rt.id}
                href={`/relaciones?tipo=${rt.id}${q ? `&q=${encodeURIComponent(q)}` : ''}`}
                className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all ${
                  isActive
                    ? 'bg-slate-900 text-amber-400 shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {rt.label}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Grid de Relaciones Visuales */}
      {filtered.length > 0 ? (
        <section className="space-y-6">
          {filtered.map((rel) => {
            const isRepeal = rel.relationType === 'REPEALS';
            const isModify = rel.relationType === 'MODIFIES';
            const isRegulate = rel.relationType === 'REGULATES';

            const badgeBg = isRepeal
              ? 'bg-rose-50 text-rose-800 border-rose-300'
              : isModify
              ? 'bg-amber-50 text-amber-800 border-amber-300'
              : isRegulate
              ? 'bg-blue-50 text-blue-800 border-blue-300'
              : 'bg-emerald-50 text-emerald-800 border-emerald-300';

            return (
              <div
                key={rel.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs hover:shadow-md transition-all space-y-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                      {rel.branchName}
                    </span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-lg border ${badgeBg}`}>
                      {rel.relationLabel}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    {rel.officialGacetaRef}
                  </span>
                </div>

                {/* Diagrama de Flujo Visual: Norma A -> Efecto -> Norma B */}
                <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
                  {/* Tarjeta Norma Origen (Activa / Modificadora) */}
                  <div className="md:col-span-5 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                        {rel.sourceNorm.number}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {rel.sourceNorm.date}
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-base text-slate-900">
                      {rel.sourceNorm.name}
                    </h3>
                    <span className="text-[11px] text-emerald-700 font-semibold block">
                      ● Norma Vigente Promulgada
                    </span>
                  </div>

                  {/* Conector Central con Flecha Direccional */}
                  <div className="md:col-span-1 flex flex-col items-center justify-center py-2 md:py-0">
                    <div className="w-10 h-10 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center shadow-sm">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Tarjeta Norma Destino (Afectada / Derogada / Modificada) */}
                  <div className={`md:col-span-5 p-5 rounded-2xl border space-y-2 ${
                    isRepeal
                      ? 'bg-rose-50/40 border-rose-200'
                      : isModify
                      ? 'bg-amber-50/40 border-amber-200'
                      : 'bg-blue-50/40 border-blue-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md border ${
                        isRepeal
                          ? 'bg-white text-rose-800 border-rose-200'
                          : 'bg-white text-slate-900 border-slate-200'
                      }`}>
                        {rel.targetNorm.number}
                      </span>
                      <span className={`text-[11px] font-bold ${
                        isRepeal ? 'text-rose-700' : isModify ? 'text-amber-700' : 'text-blue-700'
                      }`}>
                        {rel.targetNorm.statusEffect === 'DEROGADA_TOTAL'
                          ? '❌ DEROGADA ÍNTEGRAMENTE'
                          : rel.targetNorm.statusEffect === 'MODIFICADA_PARCIAL'
                          ? '✏️ TEXTO REFORMADO'
                          : '📜 REGLAMENTADA'}
                      </span>
                    </div>
                    <h3 className={`font-serif font-bold text-base ${
                      isRepeal ? 'text-slate-700 line-through' : 'text-slate-900'
                    }`}>
                      {rel.targetNorm.name}
                    </h3>
                    <span className="text-[11px] text-slate-500 block">
                      {isRepeal
                        ? 'Sustituida y eliminada del ordenamiento activo'
                        : 'Mantiene vigencia con artículos actualizados'}
                    </span>
                  </div>
                </div>

                {/* Explicación Jurídica del Efecto */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                  <p className="text-slate-700 leading-relaxed font-serif">
                    <strong>Alcance Jurídico:</strong> {rel.description}
                  </p>
                  {rel.articlesAffected && rel.articlesAffected.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] text-slate-500">
                      <span className="font-semibold">Artículos y materias afectadas:</span>
                      {rel.articlesAffected.map((art, idx) => (
                        <span key={idx} className="bg-white border border-slate-200 px-2 py-0.5 rounded-md font-mono text-slate-700">
                          {art}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </section>
      ) : (
        <div className="p-12 rounded-3xl bg-white border border-slate-200 text-center space-y-3">
          <GitFork className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="font-serif font-bold text-lg text-slate-900">No se encontraron relaciones</h3>
          <p className="text-xs text-slate-500">
            Prueba cambiando el filtro de relación o término de búsqueda.
          </p>
          <Link
            href="/relaciones"
            className="inline-block text-xs font-semibold text-purple-600 hover:text-purple-700"
          >
            Restablecer filtros
          </Link>
        </div>
      )}
    </div>
  );
}