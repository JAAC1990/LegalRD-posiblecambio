import Link from 'next/link';
import {
  Award,
  BookOpen,
  Scale,
  FolderKanban,
  Users,
  ShieldCheck,
  History,
  ArrowRight,
  TrendingUp,
  FileCheck2,
  UploadCloud,
  Layers,
  GitFork,
  Sparkles
} from 'lucide-react';

const ADMIN_METRICS = [
  { title: 'Ramas Jurídicas Registradas', value: '42', desc: 'Taxonomía del Derecho Dominicano', icon: Award, href: '/especialidades', color: 'text-amber-600 bg-amber-50' },
  { title: 'Fuentes del Derecho', value: '19', desc: 'Constitución, Leyes, Decretos, Reglamentos', icon: Layers, href: '/fuentes', color: 'text-blue-600 bg-blue-50' },
  { title: 'Artículos Estructurados', value: '738', desc: 'Código de Trabajo (Ley 16-92)', icon: FileCheck2, href: '/normas/codigo-de-trabajo-ley-16-92', color: 'text-emerald-600 bg-emerald-50' },
  { title: 'Relaciones Normativas', value: '8', desc: 'Derogaciones, Modificaciones y Decretos', icon: GitFork, href: '/relaciones', color: 'text-purple-600 bg-purple-50' },
  { title: 'Jurisprudencia Vinculada', value: 'SCJ & TC', desc: 'Tribunales de casación y garantías', icon: Scale, href: '/jurisprudencia', color: 'text-indigo-600 bg-indigo-50' },
  { title: 'Eventos de Auditoría', value: 'Inmutable', desc: 'Registro de cambios de contenido', icon: History, href: '/admin/auditoria', color: 'text-rose-600 bg-rose-50' },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900">Dashboard Administrativo</h1>
          <p className="text-xs text-slate-500 mt-1">
            Monitoreo, ingesta y administración del repositorio legal estructurado de la República Dominicana.
          </p>
        </div>

        <Link
          href="/admin/importar"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs shadow-md transition-all cursor-pointer w-fit"
        >
          <UploadCloud className="w-4 h-4" />
          <span>⚡ Importar & Parser de Leyes</span>
        </Link>
      </div>

      {/* Tarjetas de Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {ADMIN_METRICS.map((metric, idx) => (
          <Link
            key={idx}
            href={metric.href}
            className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-amber-500/40 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${metric.color}`}>
                  <metric.icon className="w-5 h-5" />
                </div>
                <span className="text-2xl font-bold font-serif text-slate-900">{metric.value}</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 text-sm">{metric.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{metric.desc}</p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600 group-hover:text-amber-600">
              <span>Gestionar módulo</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      {/* Acceso Destacado al Importador */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-8 border border-slate-700 shadow-md space-y-4 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Motor Automatizado de Ingesta</span>
          </div>
          <h2 className="font-serif font-bold text-xl text-white">
            ¿Deseas agregar una nueva ley o código dominicano?
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed font-serif">
            Usa el Importador y Parser OCR para pegar o cargar el texto legal de la Gaceta Oficial. El motor detectará los Libros, Títulos, Capítulos, Artículos y Párrafos de forma automática.
          </p>
        </div>

        <Link
          href="/admin/importar"
          className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 shrink-0 self-start sm:self-center"
        >
          <span>Abrir Importador</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}