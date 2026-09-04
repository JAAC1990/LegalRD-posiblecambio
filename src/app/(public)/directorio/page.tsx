'use client';

/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Archivo: src/app/(public)/directorio/page.tsx
 * Área: Módulo Público de Litigio e Investigación
 * 
 * DESCRIPCIÓN:
 * Herramientas de consulta abierta, cálculo de plazos, simuladores, fichas de conceptos y asistente jurídico.
 * 
 * CONTEXTO DE APLICACIÓN:
 * Diseñado conforme a las normas procesales y sustantivas vigentes
 * en la República Dominicana (Código Civil, Código de Trabajo,
 * Código de Procedimiento Civil, Ley 108-05, Ley 2-23, Ley 137-11).
 * ====================================================================
 */
import { useState } from 'react';
import { DOMINICAN_JUDICIAL_ENTITIES, JudicialEntityItem, EntityCategory } from '@/lib/data/directory';
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Clock,
  Search,
  Filter,
  Layers,
  Scale,
  Compass,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

const CATEGORY_FILTERS: { id: string; label: string }[] = [
  { id: 'ALL', label: 'Todas las Instituciones' },
  { id: 'TRIBUNAL', label: 'Tribunales y Cortes' },
  { id: 'FISCALIA', label: 'Fiscalías y Ministerio Público' },
  { id: 'REGISTRO', label: 'Registro Inmobiliario' },
  { id: 'ENTIDAD_REGULADORA', label: 'Entidades Reguladoras (ONAPI, etc.)' },
];

/**
 * Componente Principal de Vista: `DirectorioMapaJudicialPage`
 * Renderiza la interfaz de usuario interactiva y coordina el flujo operativo del módulo.
 * @returns Elemento JSX representativo de la página o vista
 */
export default function DirectorioMapaJudicialPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeEntityId, setActiveEntityId] = useState<string>(DOMINICAN_JUDICIAL_ENTITIES[0].id);

  const activeEntity = DOMINICAN_JUDICIAL_ENTITIES.find((e) => e.id === activeEntityId) || DOMINICAN_JUDICIAL_ENTITIES[0];

  const filteredEntities = DOMINICAN_JUDICIAL_ENTITIES.filter((item) => {
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.servicesProvided.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full">
      {/* Cabecera */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold uppercase tracking-wider">
          <Building2 className="w-4 h-4 text-blue-600" />
          <span>Sedes Judiciales y Entidades Oficiales</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
          Directorio y Mapa Judicial Dominicano
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Localiza tribunales, palacios de justicia, fiscalías, oficinas de registro inmobiliario y entidades regulatorias en todo el territorio nacional, con información de contacto, horarios y competencias.
        </p>
      </div>

      {/* Barra de Búsqueda y Filtros */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {CATEGORY_FILTERS.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por sede, ciudad o servicio..."
            className="w-full pl-9 pr-4 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-slate-900"
          />
        </div>
      </div>

      {/* Grid: Lista a la Izquierda, Ficha y Mapa a la Derecha */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Lista de Sedes (5 Columnas) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3 max-h-[650px] overflow-y-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block pb-2 border-b border-slate-100">
            Sedes Encontradas ({filteredEntities.length})
          </span>

          <div className="space-y-2.5">
            {filteredEntities.map((ent) => {
              const isSelected = ent.id === activeEntityId;
              return (
                <button
                  key={ent.id}
                  onClick={() => setActiveEntityId(ent.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex flex-col gap-1.5 ${
                    isSelected
                      ? 'bg-blue-50/80 border-blue-500 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-blue-800 bg-blue-100/70 px-2 py-0.5 rounded-md uppercase">
                      {ent.category}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {ent.city}
                    </span>
                  </div>
                  <h2 className="font-serif font-bold text-sm text-slate-900 leading-snug">
                    {ent.name}
                  </h2>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 shrink-0 text-slate-400" />
                    <span className="truncate">{ent.address}</span>
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Ficha Detallada y Mapa Visual de la Sede Seleccionada (7 Columnas) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Mapa Visual Simulado con Marcadores */}
          <div className="bg-slate-900 rounded-3xl p-6 text-white space-y-4 border border-slate-800 shadow-md">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Ubicación Georreferenciada — República Dominicana
                </span>
              </div>
              <span className="text-[11px] font-mono text-amber-300">
                Lat: {activeEntity.coordinates.lat.toFixed(4)}, Lng: {activeEntity.coordinates.lng.toFixed(4)}
              </span>
            </div>

            {/* Representación visual de mapa estilizado */}
            <div className="relative h-48 rounded-2xl bg-gradient-to-br from-slate-800 via-slate-850 to-slate-900 border border-slate-700/80 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#d97706_1.5px,transparent_1.5px)] [background-size:20px_20px]"></div>
              <div className="relative z-10 text-center space-y-2 p-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center mx-auto shadow-lg animate-bounce">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-sm text-white">
                  {activeEntity.name}
                </h3>
                <p className="text-[11px] text-slate-300">
                  {activeEntity.address}
                </p>
              </div>
            </div>
          </div>

          {/* Ficha de Información Oficial */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-xs">
            <div className="space-y-1">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                {activeEntity.categoryLabel}
              </span>
              <h2 className="font-serif font-extrabold text-2xl text-slate-900">
                {activeEntity.name}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                {activeEntity.department} — {activeEntity.district}
              </p>
            </div>

            <p className="text-xs text-slate-700 font-serif leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              {activeEntity.competenceSummary}
            </p>

            {/* Datos de Contacto y Horarios */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>Teléfono Directo:</span>
                </span>
                <p className="text-slate-900 font-semibold">{activeEntity.phone}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>Correo Electrónico:</span>
                </span>
                <p className="text-slate-900 font-semibold truncate">{activeEntity.email}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1 sm:col-span-2">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Horario de Atención:</span>
                </span>
                <p className="text-slate-900 font-semibold">{activeEntity.schedule}</p>
              </div>
            </div>

            {/* Servicios Ofrecidos */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Servicios y Trámites Disponibles:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {activeEntity.servicesProvided.map((serv, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-blue-600 shrink-0 mt-0.5">•</span>
                    <span>{serv}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
