import Link from 'next/link';
import { getAllDoctrines } from '@/lib/data/doctrine';
import { BookOpen, User, Calendar, Bookmark, Scale, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default async function DoctrinaIndexPage() {
  const doctrines = await getAllDoctrines();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full">
      {/* Cabecera */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-semibold uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-indigo-600" />
          <span>Tratadistas y Ciencia Jurídica</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
          Repositorio de Doctrina Jurídica Dominicana
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Obras doctrinales, tratados clásicos, investigaciones académicas y comentarios exegéticos de los más ilustres juristas de la República Dominicana, indexados directamente a los artículos y normas que interpretan.
        </p>
      </div>

      {/* Grid de Tratados y Doctrinas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {doctrines.map((item) => (
          <div
            key={item.id}
            className="p-7 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all space-y-5 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 text-slate-800">
                  {item.specialtyName}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {item.year} {item.publisher && `• ${item.publisher}`}
                </span>
              </div>

              <div>
                <h2 className="text-xl font-serif font-bold text-slate-900 leading-snug">
                  {item.title}
                </h2>
                <div className="flex items-center gap-2 mt-1 text-xs text-amber-700 font-semibold">
                  <User className="w-3.5 h-3.5" />
                  <span>{item.author}</span>
                </div>
                {item.authorBio && (
                  <p className="text-[11px] text-slate-400 mt-0.5 italic">
                    {item.authorBio}
                  </p>
                )}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                {item.summary}
              </p>

              {/* Tesis Cardinales */}
              <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100/80 space-y-2">
                <span className="text-[11px] font-bold text-indigo-950 uppercase tracking-wider block">
                  Tesis Científicas Relevantes:
                </span>
                <ul className="space-y-1.5 text-xs text-indigo-900/90 list-disc pl-4">
                  {item.keyTheses.map((t, idx) => (
                    <li key={idx} className="leading-relaxed">{t}</li>
                  ))}
                </ul>
              </div>

              {/* Cita Textual */}
              <blockquote className="p-3.5 rounded-xl bg-slate-50 border-l-4 border-amber-500 text-xs font-serif text-slate-800 italic">
                «{item.excerpt}»
              </blockquote>
            </div>

            {/* Referencia de Citación y Normas Vinculadas */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
                <span className="font-semibold text-slate-700">Normas Vinculadas:</span>
                {item.normativeContext.map((nc, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-medium">
                    {nc.normName} ({nc.articlesTargeted.join(', ')})
                  </span>
                ))}
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 text-[10px] text-slate-500 font-mono select-all">
                Cita académica: {item.citationRef}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
