import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getNormBySlug, getArticlesByNorm, getAllNorms } from '@/lib/data/norms';
import {
  ArrowLeft,
  FileText,
  Bookmark,
  Share2,
  History,
  ArrowRight,
  BookOpen,
  Download,
  Star,
  Scale,
  Sparkles,
  Layers,
  CheckCircle2
} from 'lucide-react';

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ filtro?: string; q?: string }>;
}

export async function generateStaticParams() {
  const norms = await getAllNorms();
  return norms.map((n) => ({ id: n.slug }));
}

export default async function NormDetailPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { filtro = 'todos', q = '' } = await searchParams;
  const norm = await getNormBySlug(id);

  if (!norm) {
    notFound();
  }

  const allArticles = await getArticlesByNorm(norm.slug);

  // Filtrado dinámico
  let filteredArticles = allArticles;

  if (filtro === 'clave') {
    filteredArticles = allArticles.filter((a) => a.isKeyArticle);
  } else if (filtro === 'principios') {
    filteredArticles = allArticles.filter((a) => a.articleNumber >= 1 && a.articleNumber <= 14);
  } else if (filtro === 'libro1') {
    filteredArticles = allArticles.filter((a) => a.articleNumber >= 15 && a.articleNumber <= 146);
  } else if (filtro === 'libro2') {
    filteredArticles = allArticles.filter((a) => a.articleNumber >= 147 && a.articleNumber <= 227);
  } else if (filtro === 'libro3') {
    filteredArticles = allArticles.filter((a) => a.articleNumber >= 228 && a.articleNumber <= 316);
  } else if (filtro === 'libro4') {
    filteredArticles = allArticles.filter((a) => a.articleNumber >= 317 && a.articleNumber <= 464);
  } else if (filtro === 'libro56') {
    filteredArticles = allArticles.filter((a) => a.articleNumber >= 465 && a.articleNumber <= 679);
  } else if (filtro === 'libro789') {
    filteredArticles = allArticles.filter((a) => a.articleNumber >= 680 && a.articleNumber <= 738);
  }

  if (q.trim()) {
    const term = q.toLowerCase().trim();
    filteredArticles = filteredArticles.filter(
      (a) =>
        ('art ' + a.articleNumber).includes(term) ||
        ('articulo ' + a.articleNumber).includes(term) ||
        String(a.articleNumber) === term ||
        (a.title && a.title.toLowerCase().includes(term)) ||
        a.content.toLowerCase().includes(term) ||
        a.keywords.some((k) => k.toLowerCase().includes(term))
    );
  }

  const keyCount = allArticles.filter((a) => a.isKeyArticle).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full">
      {/* Breadcrumb de Regreso */}
      <div className="flex items-center justify-between">
        <Link
          href="/normas"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-2xs hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a la Biblioteca de Normas</span>
        </Link>
        <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
          {norm.number}
        </span>
      </div>

      {/* Ficha Técnica Principal */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-md">
                {norm.specialtyName}
              </span>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
                Estado: {norm.status}
              </span>
              <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-md">
                {norm.articlesCount} Artículos Catalogados
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 leading-tight">
              {norm.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-serif">
              {norm.summary}
            </p>
          </div>

          {/* Botones de Descarga en 1 Clic */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <a
              href={'/api/export/' + norm.slug + '?format=txt'}
              download
              className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-amber-400 bg-slate-900 hover:bg-slate-800 px-4 py-2.5 rounded-xl shadow-xs transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Descargar Todo (.TXT)</span>
            </a>
            <a
              href={'/api/export/' + norm.slug + '?format=doc'}
              download
              className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-4 py-2.5 rounded-xl transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>Descargar Todo (.DOC)</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 block mb-0.5">Fuente Oficial:</span>
            <span className="font-semibold text-slate-800">{norm.officialSource}</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Fecha Promulgación:</span>
            <span className="font-semibold text-slate-800">{norm.promulgationDate}</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Fecha Publicación:</span>
            <span className="font-semibold text-slate-800">{norm.publicationDate}</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Entrada en Vigor:</span>
            <span className="font-semibold text-slate-800">{norm.effectiveDate}</span>
          </div>
        </div>
      </div>

      {/* Navegador por Estructura / Libros & Buscador de Artículos */}
      <div className="space-y-4">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-600" />
                <span>Navegación por Libros y Materias</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Mostrando {filteredArticles.length} de {allArticles.length} artículos del articulado oficial.
              </p>
            </div>

            {/* Búsqueda rápida por número o palabra dentro de la norma */}
            <form method="GET" action={'/normas/' + norm.slug} className="flex items-center gap-2">
              <input
                type="hidden"
                name="filtro"
                value={filtro}
              />
              <input
                type="text"
                name="q"
                defaultValue={q}
                placeholder="Número de art. o término (ej. 80, cesantía)..."
                className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs w-56 sm:w-64 focus:ring-2 focus:ring-slate-900 bg-slate-50/50"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl bg-slate-900 text-amber-400 font-bold text-xs shadow-xs hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Filtrar
              </button>
            </form>
          </div>

          {/* Chips de Selección por Libro con resaltado de Artículos Clave */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
            <Link
              href={'/normas/' + norm.slug + '?filtro=todos'}
              className={'px-3 py-1.5 rounded-xl font-semibold transition-all ' + (
                filtro === 'todos'
                  ? 'bg-slate-900 text-amber-400 shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              )}
            >
              Todos (738)
            </Link>

            <Link
              href={'/normas/' + norm.slug + '?filtro=clave'}
              className={'px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ' + (
                filtro === 'clave'
                  ? 'bg-amber-500 text-slate-950 shadow-xs ring-2 ring-amber-400'
                  : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
              )}
            >
              <Star className="w-3.5 h-3.5 text-amber-700 fill-amber-500" />
              <span>⭐ Artículos Clave & Jurisprudencia ({keyCount})</span>
            </Link>

            <Link
              href={'/normas/' + norm.slug + '?filtro=principios'}
              className={'px-3 py-1.5 rounded-xl font-medium transition-all ' + (
                filtro === 'principios'
                  ? 'bg-slate-900 text-amber-400'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              )}
            >
              Principios I al XIII
            </Link>

            <Link
              href={'/normas/' + norm.slug + '?filtro=libro1'}
              className={'px-3 py-1.5 rounded-xl font-medium transition-all ' + (
                filtro === 'libro1'
                  ? 'bg-slate-900 text-amber-400'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              )}
            >
              Libro I: Del Contrato (15–146)
            </Link>

            <Link
              href={'/normas/' + norm.slug + '?filtro=libro2'}
              className={'px-3 py-1.5 rounded-xl font-medium transition-all ' + (
                filtro === 'libro2'
                  ? 'bg-slate-900 text-amber-400'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              )}
            >
              Libro II: Jornada y Salarios (147–227)
            </Link>

            <Link
              href={'/normas/' + norm.slug + '?filtro=libro3'}
              className={'px-3 py-1.5 rounded-xl font-medium transition-all ' + (
                filtro === 'libro3'
                  ? 'bg-slate-900 text-amber-400'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              )}
            >
              Libro III: Contratos Especiales (228–316)
            </Link>

            <Link
              href={'/normas/' + norm.slug + '?filtro=libro4'}
              className={'px-3 py-1.5 rounded-xl font-medium transition-all ' + (
                filtro === 'libro4'
                  ? 'bg-slate-900 text-amber-400'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              )}
            >
              Libro IV: Sindicatos & Huelgas (317–464)
            </Link>

            <Link
              href={'/normas/' + norm.slug + '?filtro=libro56'}
              className={'px-3 py-1.5 rounded-xl font-medium transition-all ' + (
                filtro === 'libro56'
                  ? 'bg-slate-900 text-amber-400'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              )}
            >
              Libros V/VI: Tribunales & Juicios (465–679)
            </Link>

            <Link
              href={'/normas/' + norm.slug + '?filtro=libro789'}
              className={'px-3 py-1.5 rounded-xl font-medium transition-all ' + (
                filtro === 'libro789'
                  ? 'bg-slate-900 text-amber-400'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              )}
            >
              Libros VII/VIII/IX: Sanciones & Derogación (680–738)
            </Link>
          </div>
        </div>

        {/* Listado de Artículos con Resaltado Especial para los Artículos Clave */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredArticles.map((art) => (
              <Link
                key={art.id}
                href={'/normas/' + norm.slug + '/articulo/' + art.articleNumber}
                className={'p-6 rounded-2xl transition-all group flex flex-col sm:flex-row sm:items-center justify-between gap-4 ' + (
                  art.isKeyArticle
                    ? 'bg-amber-50/40 border-2 border-amber-400 shadow-xs hover:border-amber-600 hover:shadow-md'
                    : 'bg-white border border-slate-200 hover:border-slate-300 hover:shadow-xs'
                )}
              >
                <div className="space-y-2 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={'text-xs font-mono font-bold px-2.5 py-0.5 rounded-md ' + (
                      art.isKeyArticle
                        ? 'text-amber-900 bg-amber-200/80 border border-amber-300'
                        : 'text-slate-700 bg-slate-100 border border-slate-200'
                    )}>
                      {art.displayNumber}
                    </span>

                    {art.isKeyArticle && (
                      <span className="text-[10px] font-bold text-amber-900 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-md flex items-center gap-1 shadow-2xs">
                        <Star className="w-3 h-3 text-amber-600 fill-amber-500" />
                        <span>ARTÍCULO CLAVE DESTACADO</span>
                      </span>
                    )}

                    {art.libroStructure && (
                      <span className="text-[10px] font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md">
                        {art.libroStructure}
                      </span>
                    )}
                  </div>

                  {art.title && (
                    <h3 className={'font-serif font-bold text-base transition-colors ' + (
                      art.isKeyArticle
                        ? 'text-slate-950 group-hover:text-amber-800'
                        : 'text-slate-900 group-hover:text-slate-700'
                    )}>
                      {art.title}
                    </h3>
                  )}

                  <p className="text-xs text-slate-600 leading-relaxed font-serif line-clamp-2">
                    {art.content}
                  </p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
                  {art.caseLaws && art.caseLaws.length > 0 && (
                    <span className="text-[10px] font-semibold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-1 rounded-md flex items-center gap-1">
                      <Scale className="w-3 h-3" />
                      <span>{art.caseLaws.length} Sentencia SCJ</span>
                    </span>
                  )}

                  {art.versions && art.versions.length > 0 && (
                    <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-1 rounded-md flex items-center gap-1">
                      <History className="w-3 h-3" />
                      <span>Historial Reformado</span>
                    </span>
                  )}

                  <div className="p-2 rounded-xl bg-slate-50 group-hover:bg-amber-100 text-slate-400 group-hover:text-amber-800 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-12 rounded-3xl bg-white border border-slate-200 text-center space-y-3">
            <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="font-serif font-bold text-lg text-slate-900">No se encontraron artículos</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Prueba cambiando el filtro de libro o buscando otro término en el buscador interno.
            </p>
            <Link
              href={'/normas/' + norm.slug}
              className="inline-block text-xs font-semibold text-amber-600 hover:text-amber-700"
            >
              Restablecer filtros
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}