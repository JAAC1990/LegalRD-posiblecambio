/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Archivo: src/app/(public)/fuentes/page.tsx
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

﻿import Link from 'next/link';
import { getAllLegalSources } from '@/lib/data/sources';
import { SpecialtyIcon } from '@/components/legal/SpecialtyIcon';
import {
  Scale,
  BookOpen,
  Layers,
  Landmark,
  FileText,
  FileSignature,
  Globe,
  Gavel,
  ShieldCheck,
  Search,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  HelpCircle,
  Building,
  Scroll,
  Zap,
  Award,
  Compass
} from 'lucide-react';

interface Props {
  searchParams: Promise<{ nivel?: string; q?: string }>;
}

export default async function FuentesJuridicasPage({ searchParams }: Props) {
  const { nivel = 'todos', q = '' } = await searchParams;
  const allSources = await getAllLegalSources();

  // Filtrar por nivel jerárquico
  let filtered = allSources;
  if (nivel !== 'todos') {
    filtered = filtered.filter((s) => s.hierarchyLevel.toLowerCase() === nivel.toLowerCase());
  }

  // Filtrar por búsqueda
  if (q.trim()) {
    const term = q.toLowerCase().trim();
    filtered = filtered.filter(
      (s) =>
        s.name.toLowerCase().includes(term) ||
        s.description.toLowerCase().includes(term) ||
        s.issuingAuthority.toLowerCase().includes(term) ||
        s.examples.some((e) => e.title.toLowerCase().includes(term))
    );
  }

  const levels = [
    { id: 'todos', label: 'Todas las Fuentes (19)' },
    { id: 'constitucional', label: 'Nivel Constitucional' },
    { id: 'legal', label: 'Leyes & Códigos' },
    { id: 'reglamentario', label: 'Decretos & Reglamentos' },
    { id: 'jurisdiccional', label: 'Jurisprudencia & Sentencias' },
    { id: 'internacional', label: 'Tratados & Convenios' },
    { id: 'tecnico_administrativo', label: 'Normas & Resoluciones' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 w-full">
      {/* Cabecera Hero */}
      <section className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold uppercase tracking-wider shadow-2xs">
          <BookOpen className="w-4 h-4 text-blue-600" />
          <span>Fuentes del Ordenamiento Jurídico Dominicano</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-slate-900 tracking-tight leading-tight">
          Catálogo Oficial de las <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-900">
            19 Fuentes Jurídicas de la República Dominicana
          </span>
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto font-serif">
          Desde la Constitución y los Códigos sustantivos hasta las sentencias vinculantes, ordenanzas municipales y normas técnicas. Conoce su jerarquía, autoridad emisora y fuerza obligatoria.
        </p>
      </section>

      {/* Buscador & Filtros por Nivel de Jerarquía */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-bold text-slate-900">
              Mostrando {filtered.length} de {allSources.length} fuentes jurídicas
            </span>
          </div>

          <form method="GET" action="/fuentes" className="flex items-center gap-2 w-full sm:w-auto">
            <input type="hidden" name="nivel" value={nivel} />
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="q"
                defaultValue={q}
                placeholder="Buscar por tipo, emisor o nombre (ej. tratados, SCJ, decretos)..."
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

        {/* Chips de Selección Jerárquica */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100 text-xs">
          {levels.map((lvl) => {
            const isActive = nivel === lvl.id;
            return (
              <Link
                key={lvl.id}
                href={`/fuentes?nivel=${lvl.id}${q ? `&q=${encodeURIComponent(q)}` : ''}`}
                className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                  isActive
                    ? 'bg-slate-900 text-amber-400 shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {lvl.label}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Grid de las 19 Fuentes */}
      {filtered.length > 0 ? (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((source) => (
            <div
              key={source.id}
              className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                      Fuente #{String(source.sourceNumber).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                      {source.hierarchyLabel.split(' ')[0]}
                    </span>
                  </div>
                </div>

                <h2 className="font-serif font-bold text-xl text-slate-900 group-hover:text-blue-700 transition-colors">
                  {source.name}
                </h2>

                <div className="space-y-1 text-xs">
                  <div className="flex items-start gap-1.5 text-slate-600">
                    <strong className="text-slate-900 shrink-0">Órgano Emisor:</strong>
                    <span>{source.issuingAuthority}</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-slate-600">
                    <strong className="text-slate-900 shrink-0">Fuerza Vinculante:</strong>
                    <span className="text-emerald-700 font-medium">{source.bindingForce}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-serif pt-1 border-t border-slate-100">
                  {source.description}
                </p>
              </div>

              {/* Ejemplos Dominicanos con Enlaces */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Ejemplos Dominicanos en la App:
                </span>
                <div className="space-y-1.5">
                  {source.examples.map((ex, idx) => (
                    <Link
                      key={idx}
                      href={ex.link || `/buscar?q=${encodeURIComponent(ex.title)}`}
                      className="block p-2 rounded-xl bg-slate-50 hover:bg-amber-50 hover:border-amber-300 border border-slate-100 transition-colors text-xs"
                    >
                      <span className="font-semibold text-slate-800 hover:text-amber-800 block truncate">
                        {ex.title}
                      </span>
                      <span className="text-[10px] text-slate-400 block font-mono">
                        {ex.ref}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>
      ) : (
        <div className="p-12 rounded-3xl bg-white border border-slate-200 text-center space-y-3">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="font-serif font-bold text-lg text-slate-900">No se encontraron fuentes</h3>
          <p className="text-xs text-slate-500">
            Intenta con otro término o selecciona &quot;Todas las Fuentes (19)&quot;.
          </p>
          <Link
            href="/fuentes"
            className="inline-block text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            Restablecer filtros
          </Link>
        </div>
      )}
    </div>
  );
}