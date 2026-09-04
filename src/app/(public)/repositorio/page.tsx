import Link from 'next/link';
import { LEGAL_BRANCHES_REPOSITORY, getAllRecentUpdateAlerts } from '@/lib/data/repository';
import {
  FolderDown,
  Download,
  FileText,
  BookOpen,
  Scale,
  ShieldAlert,
  BellRing,
  ArrowRight,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  History,
  Briefcase,
  Gavel,
  Users,
  Home,
  Store
} from 'lucide-react';

interface Props {
  searchParams: Promise<{ rama?: string }>;
}

export default async function RepositorioPrincipalPage({ searchParams }: Props) {
  const { rama } = await searchParams;
  const branches = LEGAL_BRANCHES_REPOSITORY;
  const recentAlerts = getAllRecentUpdateAlerts();

  const selectedBranch = rama
    ? branches.find((b) => b.slug === rama) || branches[0]
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 w-full">
      {/* Cabecera Principal */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
          <FolderDown className="w-4 h-4 text-emerald-600" />
          <span>Repositorio Jurídico Nacional & Centro de Descargas</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 tracking-tight">
          Leyes, Códigos y Materias Complementarias
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Accede al mapa estructurado de la legislación dominicana por tipo de Derecho. Descarga la <strong>Norma Principal</strong> y todas las <strong>Materias Complementarias</strong> en formatos <strong>PDF Oficial</strong>, <strong>Word (.DOC)</strong> y <strong>Texto (.TXT)</strong> con actualización inmediata ante cualquier reforma.
        </p>
      </div>

      {/* BANNER DEL SISTEMA DE NOTIFICACIONES Y ALERTAS DE REFORMAS */}
      <div className="bg-amber-950 text-amber-100 rounded-3xl p-6 sm:p-7 border border-amber-500/40 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-500/30 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <BellRing className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-base text-amber-200">
                Sistema de Monitoreo & Alertas de Reformas en Vivo
              </h2>
              <p className="text-[11px] text-amber-300/80">
                Trazabilidad permanente de la Gaceta Oficial con sustitución inmediata de archivos obsoletos.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-3 py-1 rounded-full">
            Repositorio 100% Actualizado
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {recentAlerts.map((alert) => (
            <div
              key={alert.id}
              className="p-4 rounded-2xl bg-amber-900/40 border border-amber-500/20 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-400">{alert.branchName}</span>
                <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Sustituido de inmediato</span>
                </span>
              </div>
              <p className="text-slate-200 font-serif">
                <strong>{alert.title}:</strong> {alert.summary}
              </p>
              <div className="pt-1 text-[11px] text-amber-300/70">
                Norma modificada: {alert.affectedNorm} por la <strong>{alert.modifyingLawRef}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECCIÓN 1: TABLA PRINCIPAL DEL REPOSITORIO (COMO EN EL MAPA REQUERIDO) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-4">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-serif font-bold text-xl text-slate-900">
              Mapa Principal de Normas y Materias Complementarias
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Haz clic en cualquier rama jurídica o botón de descarga para obtener los archivos reales consolidados.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl self-start sm:self-auto">
            {branches.length} Ramas Fundamentales
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-4 px-6 w-1/5">Rama (Tipo de Derecho)</th>
                <th className="py-4 px-6 w-2/5">Norma / Código Principal</th>
                <th className="py-4 px-6 w-2/5">Materias Complementarias Importantes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {branches.map((branch) => (
                <tr
                  key={branch.id}
                  className="hover:bg-amber-50/30 transition-colors group align-top"
                >
                  {/* Columna 1: Rama */}
                  <td className="py-5 px-6 font-serif font-bold text-sm text-slate-900">
                    <Link
                      href={'/repositorio?rama=' + branch.slug}
                      className="group-hover:text-amber-700 transition-colors flex items-center gap-2"
                    >
                      <span>{branch.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-amber-600" />
                    </Link>
                    <p className="text-[11px] text-slate-400 font-sans font-normal mt-1 leading-relaxed">
                      {branch.description}
                    </p>
                  </td>

                  {/* Columna 2: Norma Principal */}
                  <td className="py-5 px-6 space-y-3">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <span className="font-mono font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md text-[10px]">
                          {branch.principalNorm.number}
                        </span>
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          {branch.principalNorm.status}
                        </span>
                      </div>
                      <h3 className="font-serif font-bold text-slate-900 text-xs">
                        {branch.principalNorm.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
                        {branch.principalNorm.description}
                      </p>

                      <div className="pt-2 border-t border-slate-200/60 flex flex-wrap items-center gap-1.5">
                        <a
                          href={'/api/export/' + branch.principalNorm.slug + '?format=txt'}
                          download
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 text-amber-400 hover:bg-slate-800 font-bold text-[10px] shadow-2xs transition-colors"
                        >
                          <Download className="w-3 h-3" />
                          <span>.TXT</span>
                        </a>
                        <a
                          href={'/api/export/' + branch.principalNorm.slug + '?format=doc'}
                          download
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200 font-semibold text-[10px] transition-colors"
                        >
                          <FileText className="w-3 h-3" />
                          <span>.DOC</span>
                        </a>
                        <Link
                          href={'/normas/' + branch.principalNorm.slug}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium text-[10px] transition-colors ml-auto"
                        >
                          <span>Ver Artículos</span>
                        </Link>
                      </div>
                    </div>
                  </td>

                  {/* Columna 3: Materias Complementarias */}
                  <td className="py-5 px-6 space-y-2.5">
                    {branch.complementaryNorms.map((comp) => (
                      <div
                        key={comp.id}
                        className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 space-y-1.5 transition-all shadow-2xs"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-1">
                          <span className="font-semibold text-slate-800 text-[11px]">
                            {comp.title} ({comp.number})
                          </span>
                          <span className="text-[9px] font-mono text-slate-400">
                            {comp.fileSizeText}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 leading-relaxed">
                          {comp.description}
                        </p>
                        <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
                          <span className="text-slate-400">{comp.gacetaRef}</span>
                          <div className="flex items-center gap-1.5">
                            <a
                              href={'/api/export/' + comp.slug + '?format=txt'}
                              download
                              className="font-bold text-slate-900 hover:text-amber-600"
                            >
                              Descargar .TXT
                            </a>
                            <span className="text-slate-300">•</span>
                            <a
                              href={'/api/export/' + comp.slug + '?format=doc'}
                              download
                              className="font-semibold text-blue-700 hover:text-blue-800"
                            >
                              Descargar .DOC
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
