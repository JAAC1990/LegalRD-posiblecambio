'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Plus,
  Trash2,
  Copy,
  Check,
  Download,
  Share2,
  FileText,
  Scale,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

interface ResearchNoteItem {
  id: string;
  topicTitle: string;
  articleCitations: string[];
  jurisprudenciaCitations: string[];
  doctrinalTheses: string[];
  argumentsFavor: string[];
  argumentsContra: string[];
  personalNotes: string;
  apaCitation: string;
}

const INITIAL_RESEARCH: ResearchNoteItem[] = [
  {
    id: 'inv-1',
    topicTitle: 'Evolución de la Responsabilidad Civil por Cosas Inanimadas en RD',
    articleCitations: ['Art. 1382 Código Civil', 'Art. 1384 párrafo 1 Código Civil'],
    jurisprudenciaCitations: [
      'SCJ-SC-2022-0941: Carga de la prueba y presunción de guarda material.',
      'SCJ-SR-2021-0012: Inexistencia de ruptura causal por mera imprudencia leve de la víctima.',
    ],
    doctrinalTheses: [
      'Jorge Subero Isa: La teoría del riesgo creado es la piedra angular del Art. 1384.',
      'William Headrick: Distinción entre guarda de la estructura y guarda del comportamiento.',
    ],
    argumentsFavor: [
      'La víctima solo debe probar el daño y la intervención material de la cosa.',
      'La presunción de culpabilidad es legal y libera a la víctima de probar negligencia subjetiva.',
    ],
    argumentsContra: [
      'El demandado puede liberarse demostrando que la cosa fue sustraída contra su voluntad o fuerza mayor.',
    ],
    personalNotes: 'Enfocar la tesis en la responsabilidad de los vehículos autónomos o controlados por software en el nuevo ecosistema digital dominicano.',
    apaCitation: 'Subero Isa, J. A. (2020). Tratado Práctico de Responsabilidad Civil Dominicana (7ma ed.). Santo Domingo: Ediciones Jurídicas.',
  },
];

export default function CuadernoInvestigacionPage() {
  const [researches, setResearches] = useState<ResearchNoteItem[]>(INITIAL_RESEARCH);
  const [selectedId, setSelectedId] = useState<string>(INITIAL_RESEARCH[0].id);
  const [copied, setCopied] = useState(false);

  const current = researches.find((r) => r.id === selectedId) || researches[0];

  function handleCopyCitation() {
    navigator.clipboard.writeText(current.apaCitation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full">
      {/* Cabecera */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-semibold uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
            <span>Espacio de Construcción Doctrinal y Monografías</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            Cuaderno de Investigación Jurídica
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Recopila artículos, sentencias, doctrina dominicana, argumentos a favor/en contra y genera citas bibliográficas oficiales.
          </p>
        </div>

        <Link
          href="/asistente-ia?modo=investigador"
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs w-fit"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Asistente en Modo Investigador</span>
        </Link>
      </div>

      {/* Cuaderno a 2 Columnas: Lista de Proyectos de Investigación y Área de Trabajo */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Proyectos Activos (4 Columnas) */}
        <div className="lg:col-span-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block pb-2 border-b border-slate-100">
            Investigaciones Activas ({researches.length})
          </span>

          <div className="space-y-2">
            {researches.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelectedId(r.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                  r.id === selectedId
                    ? 'bg-indigo-50/80 border-indigo-400 shadow-xs'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <h3 className="font-serif font-bold text-sm text-slate-900 leading-snug">{r.topicTitle}</h3>
                <span className="text-[11px] text-slate-400 block mt-1">
                  {r.articleCitations.length} artículos • {r.jurisprudenciaCitations.length} sentencias
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Área de Trabajo de la Investigación Seleccionada (8 Columnas) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-700 block mb-1">
              Monografía / Tesis
            </span>
            <h2 className="text-2xl font-serif font-extrabold text-slate-900">
              {current.topicTitle}
            </h2>
          </div>

          {/* Artículos y Precedentes Guardados */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                <span>Normas y Artículos Recopilados:</span>
              </span>
              <ul className="space-y-1 list-disc pl-4 text-slate-700">
                {current.articleCitations.map((art, idx) => (
                  <li key={idx}>{art}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-purple-600" />
                <span>Jurisprudencia Citada:</span>
              </span>
              <ul className="space-y-1 list-disc pl-4 text-slate-700">
                {current.jurisprudenciaCitations.map((jur, idx) => (
                  <li key={idx}>{jur}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tesis Doctrinales */}
          <div className="p-4 rounded-2xl bg-indigo-50/40 border border-indigo-100 space-y-2 text-xs">
            <span className="font-bold text-indigo-950 block">Tesis de Juristas Dominicanos:</span>
            <ul className="space-y-1 list-disc pl-4 text-indigo-900">
              {current.doctrinalTheses.map((doc, idx) => (
                <li key={idx}>{doc}</li>
              ))}
            </ul>
          </div>

          {/* Cuadro Dialéctico: Argumentos a Favor vs Contra */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-1.5 text-xs text-emerald-950">
              <span className="font-bold block uppercase tracking-wider text-[11px]">Tesis / Argumentos a Favor</span>
              <ul className="space-y-1 list-disc pl-4">
                {current.argumentsFavor.map((af, idx) => (
                  <li key={idx}>{af}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-1.5 text-xs text-rose-950">
              <span className="font-bold block uppercase tracking-wider text-[11px]">Antítesis / Contraargumentos</span>
              <ul className="space-y-1 list-disc pl-4">
                {current.argumentsContra.map((ac, idx) => (
                  <li key={idx}>{ac}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Notas Personales del Investigador */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Notas y Conclusiones del Investigador:
            </label>
            <textarea
              value={current.personalNotes}
              onChange={(e) => {
                const val = e.target.value;
                setResearches((prev) =>
                  prev.map((it) => (it.id === current.id ? { ...it, personalNotes: val } : it))
                );
              }}
              rows={4}
              className="w-full p-4 text-xs font-serif leading-relaxed bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-slate-900 focus:outline-hidden"
            />
          </div>

          {/* Generador de Citas Bibliográficas Oficiales */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="text-amber-400 font-bold block text-[11px] uppercase tracking-wider">
                Referencia Bibliográfica Oficial Formateada:
              </span>
              <p className="font-mono text-slate-200 text-xs mt-1">{current.apaCitation}</p>
            </div>

            <button
              onClick={handleCopyCitation}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 font-semibold flex items-center gap-1.5 self-start sm:self-center shrink-0 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiada' : 'Copiar Cita'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
