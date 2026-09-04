'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DOMINICAN_DOCUMENT_TEMPLATES } from '@/lib/data/documentTemplates';
import {
  ArrowLeft,
  FileText,
  Copy,
  Check,
  Download,
  Printer,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  Eye
} from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export default function GeneradorDocumentoSlugPage({ params }: Props) {
  const { slug } = use(params);
  const template = DOMINICAN_DOCUMENT_TEMPLATES.find((t) => t.slug === slug);

  if (!template) {
    notFound();
  }

  // Inicializar estado del formulario
  const [formValues, setFormValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    template.fields.forEach((f) => {
      initial[f.key] = f.defaultValue || '';
    });
    return initial;
  });

  const [generatedText, setGeneratedText] = useState<string>(() => template.templateGenerator(formValues));
  const [copied, setCopied] = useState(false);

  function handleInputChange(key: string, value: string) {
    const updated = { ...formValues, [key]: value };
    setFormValues(updated);
    setGeneratedText(template!.templateGenerator(updated));
  }

  function handleCopy() {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handlePrint() {
    window.print();
  }

  function handleDownloadTxt() {
    const blob = new Blob([generatedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template!.slug}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full">
      {/* Botón Volver */}
      <Link
        href="/generador-documentos"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-2xs hover:bg-slate-50 transition-colors w-fit"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver al Catálogo de Plantillas</span>
      </Link>

      {/* Cabecera */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
            {template.category} — {template.specialtyName}
          </span>
          <span className="text-xs text-slate-500 font-mono">
            {template.legalBasis}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
          {template.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {template.description}
        </p>
      </div>

      {/* Editor a 2 Columnas: Formulario Guiado a la Izquierda, Borrador en Tiempo Real a la Derecha */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Formulario de Preguntas (5 Columnas) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-700 flex items-center gap-2 border-b border-slate-100 pb-3">
            <FileText className="w-4 h-4 text-blue-600" />
            <span>Cuestionario del Documento</span>
          </h2>

          <div className="space-y-4 max-h-[650px] overflow-y-auto pr-1">
            {template.fields.map((f) => (
              <div key={f.key} className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  {f.label} {f.required && <span className="text-rose-500">*</span>}
                </label>

                {f.type === 'textarea' ? (
                  <textarea
                    value={formValues[f.key] || ''}
                    onChange={(e) => handleInputChange(f.key, e.target.value)}
                    placeholder={f.placeholder}
                    rows={3}
                    className="w-full p-3 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-hidden"
                  />
                ) : f.type === 'select' ? (
                  <select
                    value={formValues[f.key] || ''}
                    onChange={(e) => handleInputChange(f.key, e.target.value)}
                    className="w-full p-3 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-hidden"
                  >
                    {f.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={f.type}
                    value={formValues[f.key] || ''}
                    onChange={(e) => handleInputChange(f.key, e.target.value)}
                    placeholder={f.placeholder}
                    className="w-full p-3 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-hidden font-medium"
                  />
                )}
                {f.helpText && <p className="text-[10px] text-slate-400">{f.helpText}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Previsualización y Editor del Borrador (7 Columnas) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Previsualización en Tiempo Real
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado' : 'Copiar'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimir</span>
              </button>

              <button
                onClick={handleDownloadTxt}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Descargar TXT</span>
              </button>
            </div>
          </div>

          <textarea
            value={generatedText}
            onChange={(e) => setGeneratedText(e.target.value)}
            rows={22}
            className="w-full p-4 text-xs font-mono bg-slate-50 border border-slate-200 rounded-2xl leading-relaxed focus:ring-2 focus:ring-slate-900 focus:outline-hidden resize-y text-slate-900"
          />

          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200/80 text-[11px] text-amber-900 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>Aviso Profesional:</strong> Este borrador generado automáticamente sirve de plantilla técnica. Debe ser revisado por un abogado matriculado en el Colegio de Abogados de la República Dominicana (CARD) antes de su suscripción o notificación formal.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
