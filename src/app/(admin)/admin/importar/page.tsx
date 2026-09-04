/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Archivo: src/app/(admin)/admin/importar/page.tsx
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

﻿'use client';

import { useState } from 'react';
import Link from 'next/link';
import { parseLegalText, ParseResult } from '@/lib/parser/legalDocParser';
import {
  UploadCloud,
  FileText,
  Sparkles,
  Layers,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  BookOpen,
  ArrowLeft,
  Eye,
  Save,
  Check
} from 'lucide-react';

const SAMPLE_DOMINICAN_LAW_TEXT = `LIBRO PRIMERO: DE LAS DISPOSICIONES GENERALES
TÍTULO I: DEL OBJETO Y ÁMBITO DE APLICACIÓN
CAPÍTULO I: DE LOS PRINCIPIOS RECTORES

Artículo 1.- Objeto. La presente ley tiene por objeto establecer el marco jurídico regulatorio e institucional aplicable a la materia en el territorio de la República Dominicana.

Párrafo I.- Las disposiciones contenidas en este cuerpo normativo son de orden público y de interés social.

Artículo 2.- Ámbito de aplicación. Están sujetos a las prescripciones de esta ley todas las personas físicas y morales, públicas o privadas, domiciliadas o que realicen actos jurídicos en el país.

Párrafo I.- Las autoridades administrativas y judiciales interpretarán sus disposiciones de conformidad con el Bloque de Constitucionalidad.

CAPÍTULO II: DE LOS DERECHOS Y GARANTÍAS

Artículo 3.- Tutela efectiva. Se garantiza el derecho de toda persona a acceder a los procedimientos administrativos y judiciales con estricto apego al debido proceso legal.

Artículo 4.- Notificaciones. Toda actuación administrativa o judicial que afecte derechos subjetivos debe ser notificada legalmente en el plazo de cinco días hábiles.

LIBRO SEGUNDO: DE LAS SANCIONES Y DISPOSICIONES FINALES
TÍTULO ÚNICO: DEL RÉGIMEN DISCIPLINARIO

Artículo 5.- Infracciones y Sanciones. El incumplimiento de los preceptos establecidos en la presente ley acarreará sanciones administrativas de advertencia, multa o inhabilitación temporal.

Artículo 6.- Entrada en vigor. La presente ley entrará en vigencia a partir de su publicación en la Gaceta Oficial y deroga cualquier disposición legal contraria.`;

/**
 * Componente Principal de Vista: `AdminImportarPage`
 * Renderiza la interfaz de usuario interactiva y coordina el flujo operativo del módulo.
 * @returns Elemento JSX representativo de la página o vista
 */
export default function AdminImportarPage() {
  const [normType, setNormType] = useState('LEY');
  const [normNumber, setNormNumber] = useState('Ley 55-26');
  const [normTitle, setNormTitle] = useState('Ley Reguladora de Medios Digitales y Procedimientos Jurídicos');
  const [gacetaRef, setGacetaRef] = useState('Gaceta Oficial No. 11200');
  const [specialtySlug, setSpecialtySlug] = useState('derecho-informatico');
  const [rawText, setRawText] = useState('');
  const [parseResult, setParseResult] = useState<ParseResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleParse = () => {
    if (!rawText.trim()) return;
    setIsProcessing(true);
    setIsSaved(false);

    setTimeout(() => {
      const result = parseLegalText(rawText);
      setParseResult(result);
      setIsProcessing(false);
    }, 400);
  };

  const handleLoadSample = () => {
    setRawText(SAMPLE_DOMINICAN_LAW_TEXT);
    setParseResult(null);
    setIsSaved(false);
  };

  const handleSave = () => {
    setIsSaved(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 w-full">
      {/* Breadcrumb de Regreso */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-2xs hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Panel de Administración</span>
        </Link>
        <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
          Módulo de Ingesta & Parser OCR
        </span>
      </div>

      {/* Cabecera Principal */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-lg space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shadow-md">
            <UploadCloud className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
              Gestión Documental Avanzada
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Importador y Parser Automático de Artículos
            </h1>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl font-serif">
          Pega el texto oficial de cualquier ley, código o decreto dominicano. Nuestro motor de procesamiento detectará automáticamente la jerarquía de <strong>Libros, Títulos, Capítulos, Artículos y Párrafos</strong> para indexarlos en la base de datos de Legal RD.
        </p>
      </div>

      {/* Formulario de Metadatos de la Norma */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-2xs space-y-6">
        <h2 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
          <FileText className="w-5 h-5 text-amber-600" />
          <span>1. Metadatos Oficiales de la Norma</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-700">Tipo de Norma:</label>
            <select
              value={normType}
              onChange={(e) => setNormType(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-slate-900"
            >
              <option value="LEY">Ley Ordinaria</option>
              <option value="LEY_ORGANICA">Ley Orgánica</option>
              <option value="CODIGO">Código Sustantivo / Procesal</option>
              <option value="DECRETO">Decreto Presidencial</option>
              <option value="REGLAMENTO">Reglamento de Aplicación</option>
              <option value="RESOLUCION">Resolución Ministerial</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-slate-700">Número / Identificador:</label>
            <input
              type="text"
              value={normNumber}
              onChange={(e) => setNormNumber(e.target.value)}
              placeholder="Ej. Ley 108-05, Decreto 258-93"
              className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-slate-700">Gaceta Oficial:</label>
            <input
              type="text"
              value={gacetaRef}
              onChange={(e) => setGacetaRef(e.target.value)}
              placeholder="Ej. Gaceta Oficial No. 10316"
              className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div className="sm:col-span-2 space-y-1.5">
            <label className="font-semibold text-slate-700">Título Oficial Completo:</label>
            <input
              type="text"
              value={normTitle}
              onChange={(e) => setNormTitle(e.target.value)}
              placeholder="Nombre oficial completo según la Gaceta Oficial"
              className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-slate-700">Rama Jurídica Principal:</label>
            <select
              value={specialtySlug}
              onChange={(e) => setSpecialtySlug(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-slate-900"
            >
              <option value="derecho-laboral">Derecho Laboral</option>
              <option value="derecho-penal">Derecho Penal</option>
              <option value="derecho-procesal-penal">Derecho Procesal Penal</option>
              <option value="derecho-civil">Derecho Civil</option>
              <option value="derecho-procesal-civil">Derecho Procesal Civil</option>
              <option value="derecho-inmobiliario">Derecho Inmobiliario</option>
              <option value="derecho-constitucional">Derecho Constitucional</option>
              <option value="derecho-comercial">Derecho Comercial</option>
              <option value="derecho-tributario">Derecho Tributario</option>
              <option value="derecho-informatico">Derecho Informático y Digital</option>
            </select>
          </div>
        </div>
      </div>

      {/* Editor de Texto para Extracción */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-600" />
            <span>2. Texto Crudo del Documento Legal</span>
          </h2>

          <button
            type="button"
            onClick={handleLoadSample}
            className="text-xs font-semibold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3.5 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 w-fit"
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Cargar Texto de Ejemplo Dominicano</span>
          </button>
        </div>

        <textarea
          rows={12}
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          placeholder="Pega aquí el contenido extraído de la Gaceta Oficial, PDF o documento escaneado (ej. 'LIBRO I... Artículo 1.-... Artículo 2.-...')."
          className="w-full p-4 rounded-2xl border border-slate-300 font-mono text-xs text-slate-800 bg-slate-50/50 focus:ring-2 focus:ring-slate-900 leading-relaxed"
        />

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <span className="text-xs text-slate-500">
            Caracteres ingresados: <strong>{rawText.length}</strong> | Líneas: <strong>{rawText.split('\n').length}</strong>
          </span>

          <button
            type="button"
            onClick={handleParse}
            disabled={!rawText.trim() || isProcessing}
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-amber-400 font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{isProcessing ? 'Procesando Texto...' : '⚡ Analizar & Extraer Artículos Automáticamente'}</span>
          </button>
        </div>
      </div>

      {/* Resultados de la Extracción y Previsualización */}
      {parseResult && (
        <div className="space-y-6">
          {/* Tarjeta de Resumen */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-emerald-950">
                    Extracción Exitosa
                  </h3>
                  <p className="text-xs text-emerald-800">
                    {parseResult.extractionSummary}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSave}
                disabled={isSaved}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center gap-2 cursor-pointer ${
                  isSaved
                    ? 'bg-emerald-600 text-white cursor-default'
                    : 'bg-slate-900 hover:bg-slate-800 text-amber-400'
                }`}
              >
                {isSaved ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>¡Indexado en el Repositorio!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>💾 Confirmar e Indexar en Legal RD</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-emerald-200/60 text-xs">
              <div>
                <span className="text-emerald-700 block">Total de Artículos:</span>
                <span className="font-bold text-base text-emerald-950 font-mono">{parseResult.totalArticles}</span>
              </div>
              <div>
                <span className="text-emerald-700 block">Libros Detectados:</span>
                <span className="font-bold text-base text-emerald-950 font-mono">{parseResult.detectedStructure.librosCount}</span>
              </div>
              <div>
                <span className="text-emerald-700 block">Títulos Detectados:</span>
                <span className="font-bold text-base text-emerald-950 font-mono">{parseResult.detectedStructure.titulosCount}</span>
              </div>
              <div>
                <span className="text-emerald-700 block">Capítulos Detectados:</span>
                <span className="font-bold text-base text-emerald-950 font-mono">{parseResult.detectedStructure.capitulosCount}</span>
              </div>
            </div>
          </div>

          {/* Listado de Artículos Parseados */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-2xs space-y-4">
            <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
              <Eye className="w-5 h-5 text-amber-600" />
              <span>Artículos Detectados y Clasificados ({parseResult.articles.length})</span>
            </h3>

            <div className="space-y-4">
              {parseResult.articles.map((art) => (
                <div
                  key={art.articleNumber}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                        {art.displayNumber}
                      </span>
                      <span className="text-[11px] text-slate-500 font-semibold">
                        {art.structureLocation}
                      </span>
                    </div>

                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                      Confianza: {art.confidence}
                    </span>
                  </div>

                  {art.title && (
                    <h4 className="font-serif font-bold text-sm text-slate-900">
                      {art.title}
                    </h4>
                  )}

                  <p className="text-xs text-slate-700 leading-relaxed font-serif bg-white p-3 rounded-xl border border-slate-200/60">
                    {art.content}
                  </p>

                  {art.paragraphs.length > 1 && (
                    <div className="text-[11px] text-slate-500">
                      <span>Párrafos identificados: <strong>{art.paragraphs.length}</strong></span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}