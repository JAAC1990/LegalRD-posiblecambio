import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSpecialtyBySlug, getAllSpecialties } from '@/lib/data/specialties';
import { SpecialtyIcon } from '@/components/legal/SpecialtyIcon';
import {
  ArrowLeft,
  BookOpen,
  Scale,
  FolderKanban,
  FileText,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Layers,
  Search,
  Tag
} from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const specialties = await getAllSpecialties();
  return specialties.map((s) => ({ slug: s.slug }));
}

export default async function SpecialtyDetailPage({ params }: Props) {
  const { slug } = await params;
  const specialty = await getSpecialtyBySlug(slug);

  if (!specialty) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 w-full">
      {/* Breadcrumb & Botón Volver */}
      <div className="flex items-center justify-between">
        <Link
          href="/especialidades"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-2xs hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Directorio de las 42 Especialidades</span>
        </Link>
        <div className="flex items-center gap-2">
          {specialty.groupCategory && (
            <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
              {specialty.groupCategory}
            </span>
          )}
          <span className="text-xs font-mono font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg">
            #{String(specialty.displayOrder).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Hero de la Especialidad */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden space-y-6">
        <div className="max-w-3xl relative z-10 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center shadow-lg">
              <SpecialtyIcon name={specialty.iconName} className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                Rama del Ordenamiento Jurídico Dominicano
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">
                {specialty.name}
              </h1>
            </div>
          </div>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-serif pt-1">
            {specialty.description}
          </p>
        </div>

        {/* Submaterias Oficiales del PDF */}
        {specialty.subtopics && specialty.subtopics.length > 0 && (
          <div className="pt-4 border-t border-slate-800/80 space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              Submaterias e Instituciones Comprendidas:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {specialty.subtopics.map((st, idx) => (
                <Link
                  key={idx}
                  href={`/buscar?q=${encodeURIComponent(st)}`}
                  className="text-xs bg-slate-800 hover:bg-amber-600 hover:text-white text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700/80 transition-colors flex items-center gap-1"
                >
                  <Tag className="w-3 h-3 opacity-60" />
                  <span>{st}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Relación Jerárquica: Normas, Jurisprudencia y Procedimientos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna 1: Códigos y Leyes */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h2 className="font-serif font-bold text-lg text-slate-900">Códigos y Leyes</h2>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
              Fuentes
            </span>
          </div>

          <div className="space-y-3">
            {specialty.slug === 'derecho-laboral' ? (
              <Link
                href="/normas/codigo-de-trabajo-ley-16-92"
                className="block p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-500/50 hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    Ley 16-92
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    Vigente
                  </span>
                </div>
                <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-amber-700 transition-colors">
                  Código de Trabajo de la República Dominicana
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  Regula los derechos y obligaciones de empleadores y trabajadores, desahucio, prestaciones y contratos laborales.
                </p>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600 group-hover:text-amber-600">
                  <span>Consultar los 738 Artículos</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ) : specialty.slug === 'derecho-inmobiliario' ? (
              <Link
                href="/normas/ley-108-05-registro-inmobiliario"
                className="block p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-500/50 hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    Ley 108-05
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    Vigente
                  </span>
                </div>
                <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-amber-700 transition-colors">
                  Ley de Registro Inmobiliario
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  Saneamiento catastral, deslindes y registro de títulos de propiedad.
                </p>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600 group-hover:text-amber-600">
                  <span>Consultar Artículos</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ) : (
              <Link
                href="/repositorio"
                className="block p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-slate-100 transition-all text-center space-y-2 group"
              >
                <BookOpen className="w-6 h-6 text-slate-400 mx-auto group-hover:text-amber-600 transition-colors" />
                <p className="text-xs font-semibold text-slate-700">
                  Ver Leyes y Códigos en el Repositorio
                </p>
                <span className="text-[11px] text-amber-600 font-medium inline-flex items-center gap-1">
                  <span>Abrir Centro de Descargas</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            )}
          </div>
        </div>

        {/* Columna 2: Jurisprudencia Vinculada */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-purple-600" />
              <h2 className="font-serif font-bold text-lg text-slate-900">Jurisprudencia</h2>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 bg-purple-50 text-purple-700 rounded-full border border-purple-200">
              SCJ & TC
            </span>
          </div>

          <div className="space-y-3">
            {specialty.slug === 'derecho-laboral' ? (
              <Link
                href="/normas/codigo-de-trabajo-ley-16-92/articulo/80"
                className="block p-5 rounded-2xl bg-white border border-slate-200 hover:border-purple-500/60 hover:shadow-md transition-all group space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-200">
                    SCJ — Tercera Sala
                  </span>
                  <span className="text-[10px] font-semibold text-purple-600 group-hover:underline">
                    Clic para ver Artículo
                  </span>
                </div>
                <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-purple-800 transition-colors">
                  Criterio sobre el Desahucio y Cálculo de Cesantía
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-serif">
                  Establece que la notificación del desahucio extingue de pleno derecho el contrato de trabajo, generando la obligación del pago del auxilio de cesantía conforme al Art. 80.
                </p>
                <div className="pt-2 border-t border-slate-100 text-xs font-bold text-purple-700 flex items-center justify-between group-hover:text-purple-900">
                  <span className="flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5 text-purple-600" />
                    <span>Ir al Art. 80 del Código de Trabajo</span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-purple-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ) : (
              <Link
                href="/jurisprudencia"
                className="block p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-slate-100 transition-all text-center space-y-2 group"
              >
                <Scale className="w-6 h-6 text-slate-400 mx-auto group-hover:text-purple-600 transition-colors" />
                <p className="text-xs font-semibold text-slate-700">
                  Consultar Sentencias de {specialty.name}
                </p>
                <span className="text-[11px] text-purple-700 font-medium inline-flex items-center gap-1">
                  <span>Ir al Repositorio de Jurisprudencia</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            )}
          </div>
        </div>

        {/* Columna 3: Procedimientos Paso a Paso */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <FolderKanban className="w-5 h-5 text-rose-600" />
              <h2 className="font-serif font-bold text-lg text-slate-900">Procedimientos</h2>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 bg-rose-50 text-rose-700 rounded-full border border-rose-200">
              Guías Procesales
            </span>
          </div>

          <div className="space-y-3">
            <Link
              href="/procedimientos"
              className="block p-5 rounded-2xl bg-white border border-slate-200 hover:border-rose-500/60 hover:shadow-md transition-all group space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-200">
                  Trámite Informativo
                </span>
                <span className="text-[10px] font-semibold text-rose-600 group-hover:underline">
                  Ver Pasos
                </span>
              </div>
              <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-rose-700 transition-colors">
                Requisitos y Etapas Procesales en {specialty.name}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Consulta los plazos legales, documentos requeridos y tribunales de jurisdicción competente.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-rose-700 group-hover:text-rose-900">
                <span>Ver catálogo de procedimientos</span>
                <ArrowRight className="w-4 h-4 text-rose-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}