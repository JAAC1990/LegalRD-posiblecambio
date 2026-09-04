import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getNormBySlug, getArticleByNumber, getArticlesByNorm, getAllNorms } from '@/lib/data/norms';
import {
  ArrowLeft,
  ArrowRight,
  History,
  Bookmark,
  FileEdit,
  Copy,
  Scale,
  Calendar,
  Star,
  Layers,
  BookOpen
} from 'lucide-react';

interface Props {
  params: Promise<{ id: string; numero: string }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const norms = await getAllNorms();
  const paths: { id: string; numero: string }[] = [];
  for (const n of norms) {
    const articles = await getArticlesByNorm(n.slug);
    // Pre-renderizar los primeros y clave
    const keyOnes = articles.filter((a) => a.isKeyArticle || a.articleNumber <= 20);
    for (const a of keyOnes) {
      paths.push({ id: n.slug, numero: String(a.articleNumber) });
    }
  }
  return paths;
}

export default async function ArticleViewerPage({ params }: Props) {
  const { id, numero } = await params;
  const articleNum = parseInt(numero, 10);

  const norm = await getNormBySlug(id);
  if (!norm) notFound();

  const article = await getArticleByNumber(norm.slug, articleNum);
  if (!article) notFound();

  const allArticles = await getArticlesByNorm(norm.slug);
  const currentIndex = allArticles.findIndex((a) => a.articleNumber === articleNum);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full">
      {/* Botones de Navegación Rápida */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href={`/normas/${norm.slug}`}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-2xs hover:bg-slate-50 transition-colors w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al {norm.shortName || norm.name}</span>
        </Link>

        <div className="flex items-center gap-2">
          {prevArticle ? (
            <Link
              href={`/normas/${norm.slug}/articulo/${prevArticle.articleNumber}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{prevArticle.displayNumber}</span>
            </Link>
          ) : (
            <button disabled className="opacity-40 text-xs px-3 py-2 border rounded-xl cursor-not-allowed">
              Inicio
            </button>
          )}

          <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-3 py-2 rounded-xl">
            {article.articleNumber} / {allArticles.length}
          </span>

          {nextArticle ? (
            <Link
              href={`/normas/${norm.slug}/articulo/${nextArticle.articleNumber}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <span>{nextArticle.displayNumber}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <button disabled className="opacity-40 text-xs px-3 py-2 border rounded-xl cursor-not-allowed">
              Fin
            </button>
          )}
        </div>
      </div>

      {/* Contenedor del Artículo */}
      <div className={`bg-white rounded-3xl p-8 sm:p-12 border shadow-sm space-y-8 ${
        article.isKeyArticle ? 'border-amber-400 ring-2 ring-amber-400/20' : 'border-slate-200'
      }`}>
        <div className="space-y-3 border-b border-slate-100 pb-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-sm font-mono font-bold px-3 py-1 rounded-xl ${
                article.isKeyArticle
                  ? 'text-amber-900 bg-amber-100 border border-amber-300'
                  : 'text-amber-700 bg-amber-50 border border-amber-200'
              }`}>
                {article.displayNumber}
              </span>

              {article.isKeyArticle && (
                <span className="text-xs font-bold text-amber-900 bg-amber-200/80 border border-amber-400 px-2.5 py-1 rounded-xl flex items-center gap-1 shadow-2xs">
                  <Star className="w-3.5 h-3.5 text-amber-700 fill-amber-500" />
                  <span>ARTÍCULO CLAVE / DOCTRINA SCJ</span>
                </span>
              )}

              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                {article.status}
              </span>
            </div>

            <span className="text-xs text-slate-400">
              {norm.number} — {norm.officialSource}
            </span>
          </div>

          {article.libroStructure && (
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 pt-1">
              <Layers className="w-3.5 h-3.5 text-amber-600" />
              <span>{article.libroStructure}</span>
            </div>
          )}

          {article.title && (
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              {article.title}
            </h1>
          )}
        </div>

        {/* Texto Normativo */}
        <div className={`prose prose-slate max-w-none text-sm sm:text-base text-slate-800 leading-relaxed space-y-4 font-serif p-6 rounded-2xl border ${
          article.isKeyArticle
            ? 'bg-amber-50/30 border-amber-200/80 font-medium'
            : 'bg-slate-50/60 border-slate-200/60'
        }`}>
          <p>{article.content}</p>
        </div>

        {/* Palabras Clave */}
        {article.keywords && article.keywords.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-2">
            <span className="text-xs font-semibold text-slate-500 mr-2">Descriptores:</span>
            {article.keywords.map((kw, i) => (
              <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg">
                #{kw}
              </span>
            ))}
          </div>
        )}

        {/* Acciones del Usuario */}
        <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl transition-colors"
          >
            <Bookmark className="w-4 h-4 text-amber-600" />
            <span>Guardar Artículo</span>
          </Link>

          <Link
            href="/notas"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl transition-colors"
          >
            <FileEdit className="w-4 h-4 text-blue-600" />
            <span>Añadir Nota Privada</span>
          </Link>

          <button
            type="button"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            <Copy className="w-4 h-4 text-slate-500" />
            <span>Copiar Cita Jurídica Estándar</span>
          </button>
        </div>
      </div>

      {/* Historial de Reformas si Aplica */}
      {article.versions && article.versions.length > 0 && (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-amber-600" />
            <h2 className="font-serif font-bold text-xl text-slate-900">
              Historial de Reformas del Artículo
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Trazabilidad histórica: Consulta la redacción anterior frente al texto vigente y la ley que introdujo la modificación.
          </p>

          <div className="space-y-4">
            {article.versions.map((ver) => (
              <div key={ver.id} className="p-6 rounded-2xl bg-amber-50/40 border border-amber-200 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-amber-800">
                    {ver.modifyingNormRef}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {ver.modificationDate}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
                    <span className="font-semibold text-rose-700 block">Texto Anterior (Histórico):</span>
                    <p className="text-slate-600 line-through leading-relaxed">{ver.previousContent}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-emerald-200 space-y-1">
                    <span className="font-semibold text-emerald-700 block">Texto Reformado (Vigente):</span>
                    <p className="text-slate-800 leading-relaxed">{ver.newContent}</p>
                  </div>
                </div>

                {ver.reasonSummary && (
                  <p className="text-xs text-slate-600 bg-white/80 p-3 rounded-lg border border-amber-100">
                    <strong>Motivo de la reforma:</strong> {ver.reasonSummary}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Jurisprudencia Vinculada de la SCJ si Aplica */}
      {article.caseLaws && article.caseLaws.length > 0 && (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-purple-600" />
            <h2 className="font-serif font-bold text-xl text-slate-900">
              Jurisprudencia Vinculada a este Artículo
            </h2>
          </div>

          <div className="space-y-4">
            {article.caseLaws.map((cl) => (
              <div key={cl.id} className="p-6 rounded-2xl bg-purple-50/40 border border-purple-200 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-purple-900 bg-purple-100 px-2.5 py-0.5 rounded-md">
                    {cl.courtName} — {cl.sentenceNumber}
                  </span>
                  <span className="text-xs text-slate-500">{cl.judgmentDate}</span>
                </div>
                <h3 className="font-serif font-bold text-sm text-slate-900">
                  Doctrina Jurídica Sentada:
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed font-serif">
                  {cl.doctrine}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}