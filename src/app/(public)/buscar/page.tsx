/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Archivo: src/app/(public)/buscar/page.tsx
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

import Link from 'next/link';
import { searchLegalContent } from '@/lib/data/search';
import { getAllSpecialties } from '@/lib/data/specialties';
import {
  Search,
  BookOpen,
  Scale,
  FileText,
  Filter,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Building2,
  Clock,
  Compass
} from 'lucide-react';

interface Props {
  searchParams: Promise<{
    q?: string;
    specialty?: string;
    type?: string;
    status?: string;
  }>;
}

export default async function BuscarPage({ searchParams }: Props) {
  const { q = '', specialty = '', type = '', status = '' } = await searchParams;
  const { results, total } = await searchLegalContent({
    query: q,
    specialty,
    normType: type,
    status,
  });
  const specialties = await getAllSpecialties();

  // Detección semántica de lenguaje natural (Sección 8 del Prompt Maestro)
  const queryLower = q.toLowerCase();
  let semanticMatch: {
    title: string;
    matter: string;
    keyNorm: string;
    competentCourt: string;
    deadline: string;
    routeUrl: string;
  } | null = null;

  if (queryLower.includes('choc') || queryLower.includes('vehic') || queryLower.includes('accidente') || queryLower.includes('no quiere pagar')) {
    semanticMatch = {
      title: 'Accidente de Tránsito y Reparación de Daños Civiles',
      matter: 'Derecho de Tránsito y Responsabilidad Civil (Arts. 1382-1384 CC y Ley 63-17)',
      keyNorm: 'Ley No. 63-17 y Art. 1384 párrafo 1 del Código Civil',
      competentCourt: 'Juzgado de Paz Especial de Tránsito del lugar del choque',
      deadline: 'Un (1) año calendario a partir del accidente',
      routeUrl: '/construye-mi-caso',
    };
  } else if (queryLower.includes('despid') || queryLower.includes('liquid') || queryLower.includes('cesant') || queryLower.includes('prestacion')) {
    semanticMatch = {
      title: 'Despido Laboral y Reclamación de Cesantía / Preaviso',
      matter: 'Derecho Laboral (Arts. 75, 80, 86, 95 Código de Trabajo)',
      keyNorm: 'Código de Trabajo (Ley 16-92)',
      competentCourt: 'Juzgado de Trabajo de la jurisdicción donde se prestaban servicios',
      deadline: 'UN (1) MES de fecha a fecha (Art. 701 CT)',
      routeUrl: '/construye-mi-caso',
    };
  } else if (queryLower.includes('alquiler') || queryLower.includes('inquilino') || queryLower.includes('desalojo')) {
    semanticMatch = {
      title: 'Desalojo por Falta de Pago de Alquileres',
      matter: 'Derecho Civil / Inmobiliario (Decreto 4807 y Ley 4314)',
      keyNorm: 'Decreto 4807 de 1959 y Art. 1751 Código Civil',
      competentCourt: 'Juzgado de Paz ordinario de la ubicación del inmueble',
      deadline: 'Intimación formal de 3 días francos de pago previo al emplazamiento',
      routeUrl: '/rutas-juridicas',
    };
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full">
      {/* Cabecera del Buscador */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold uppercase tracking-wider">
          <Search className="w-4 h-4 text-amber-600" />
          <span>Motor de Búsqueda Jurídica y Semántica Dominicana</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
          Resultados de Búsqueda
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Explora leyes, códigos, artículos, jurisprudencia y consultas cotidianas en lenguaje natural.
        </p>
      </div>

      {/* Formulario de Búsqueda con Filtros Facetados */}
      <form method="GET" action="/buscar" className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Escribe el término, frase, situación o ley (ej. 'me chocaron el vehículo', 'Ley 16-92', 'Art. 80')..."
            className="w-full pl-12 pr-28 py-3.5 text-sm sm:text-base border border-slate-300 rounded-2xl focus:ring-2 focus:ring-slate-900 focus:border-slate-900 bg-slate-50/50"
          />
          <button
            type="submit"
            className="absolute right-2 bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm"
          >
            Buscar
          </button>
        </div>

        {/* Filtros Combinables */}
        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
            <Filter className="w-3.5 h-3.5" />
            <span>Filtrar por:</span>
          </div>

          <select
            name="specialty"
            defaultValue={specialty}
            className="px-3 py-1.5 rounded-xl border border-slate-300 bg-slate-50/80 text-slate-700 font-medium"
          >
            <option value="">Todas las Especialidades</option>
            {specialties.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>

          <select
            name="type"
            defaultValue={type}
            className="px-3 py-1.5 rounded-xl border border-slate-300 bg-slate-50/80 text-slate-700 font-medium"
          >
            <option value="">Todos los Tipos de Norma</option>
            <option value="CONSTITUTION">Constitución</option>
            <option value="CODE">Código</option>
            <option value="LAW">Ley</option>
            <option value="DECREE">Decreto</option>
            <option value="REGULATION">Reglamento</option>
          </select>

          <select
            name="status"
            defaultValue={status}
            className="px-3 py-1.5 rounded-xl border border-slate-300 bg-slate-50/80 text-slate-700 font-medium"
          >
            <option value="">Cualquier Estado de Vigencia</option>
            <option value="VIGENTE">Vigente</option>
            <option value="MODIFICADA">Modificada</option>
            <option value="DEROGADA">Derogada</option>
          </select>

          {(q || specialty || type || status) && (
            <Link
              href="/buscar"
              className="text-xs text-rose-600 hover:text-rose-700 font-semibold ml-auto"
            >
              Limpiar filtros
            </Link>
          )}
        </div>
      </form>

      {/* Detección Semántica en Lenguaje Natural (Sección 8) */}
      {semanticMatch && (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            <Sparkles className="w-4 h-4" />
            <span>Interpretación Semántica del Motor Jurídico Legal RD</span>
          </div>

          <h2 className="text-xl font-serif font-bold text-white">
            Situación Calificada: {semanticMatch.title}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-slate-400">Materia & Normativa</span>
              <p className="font-semibold text-amber-300">{semanticMatch.keyNorm}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-slate-400">Tribunal Competente</span>
              <p className="font-semibold text-slate-200">{semanticMatch.competentCourt}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-slate-400">Plazo Crítico</span>
              <p className="font-semibold text-rose-300">{semanticMatch.deadline}</p>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Link
              href={semanticMatch.routeUrl}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-colors shadow-xs"
            >
              <span>Ver Ruta Jurídica Completa en 13 Pasos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* Resultados de Búsqueda */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <span className="text-xs font-semibold text-slate-600">
            {total} {total === 1 ? 'resultado encontrado' : 'resultados encontrados'} {q ? `para "${q}"` : ''}
          </span>
        </div>

        {results.length > 0 ? (
          <div className="space-y-4">
            {results.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                className="block p-6 rounded-2xl bg-white border border-slate-200 hover:border-amber-500/50 hover:shadow-md transition-all group space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-md">
                      {item.normNumber}
                    </span>
                    <span className="text-xs font-semibold text-slate-700">
                      {item.normName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      {item.specialtyName}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {item.status}
                    </span>
                  </div>
                </div>

                <h2 className="font-serif font-bold text-lg text-slate-900 group-hover:text-amber-700 transition-colors">
                  {item.title}
                </h2>

                <p className="text-xs text-slate-600 leading-relaxed font-serif bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                  {item.snippet}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs font-semibold text-amber-600">
                  <span>Ir directamente al artículo / norma</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-12 rounded-3xl bg-white border border-slate-200 text-center space-y-4">
            <Search className="w-10 h-10 text-slate-400 mx-auto" />
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-lg text-slate-900">
                No se encontraron resultados para tu búsqueda
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Prueba buscando por número de norma (ej. &quot;16-92&quot; o &quot;108-05&quot;), palabras clave como &quot;desahucio&quot;, &quot;contrato&quot;, o navega desde el directorio de especialidades.
              </p>
            </div>
            <Link
              href="/especialidades"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-500 px-4 py-2 rounded-xl transition-colors shadow-xs"
            >
              <span>Ver todas las especialidades</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
