import Link from 'next/link';
import { Scale, Building2, Calendar, FileText, ArrowRight, Bookmark } from 'lucide-react';

const DEMO_CASE_LAWS = [
  {
    id: 'case-1',
    courtName: 'Suprema Corte de Justicia — Tercera Sala',
    sentenceNumber: 'SCJ-PS-2022-0450',
    docketNumber: 'Exp. 033-2021-00892',
    judgmentDate: '18 de mayo de 2022',
    specialty: 'Derecho Laboral',
    title: 'Elementos constitutivos de la subordinación jurídica laboral',
    doctrine: 'La existencia de un horario preestablecido, dependencia técnica y retribución periódica configura la presunción legal de existencia del contrato de trabajo conforme al Principio VII y Art. 1 del Código de Trabajo.',
    articleRef: 'Art. 1 del Código de Trabajo (Ley 16-92)',
  },
  {
    id: 'case-2',
    courtName: 'Suprema Corte de Justicia — Tercera Sala',
    sentenceNumber: 'SCJ-TS-2023-1120',
    docketNumber: 'Exp. 033-2022-01452',
    judgmentDate: '27 de septiembre de 2023',
    specialty: 'Derecho Laboral',
    title: 'Naturaleza jurídica y eficacia del desahucio',
    doctrine: 'El desahucio constituye un derecho unilateral e incausado de cualquiera de las partes para extinguir el vínculo contractual laboral de tiempo indefinido, generando la obligación incondicional del pago del auxilio de cesantía.',
    articleRef: 'Art. 75 y 80 del Código de Trabajo (Ley 16-92)',
  },
  {
    id: 'case-3',
    courtName: 'Tribunal Constitucional de la República Dominicana',
    sentenceNumber: 'TC/0123/18',
    docketNumber: 'Exp. TC-05-2017-0112',
    judgmentDate: '14 de junio de 2018',
    specialty: 'Derecho Constitucional',
    title: 'Alcance del debido proceso administrativo y derecho de defensa',
    doctrine: 'Toda decisión sancionatoria o limitativa de derechos emitida por un órgano de la Administración Pública debe estar rigurosamente motivada y respetar el derecho de defensa conforme al Art. 69 de la Constitución y Ley 107-13.',
    articleRef: 'Art. 69 de la Constitución y Ley 107-13',
  },
];

export default function JurisprudenciaPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-semibold uppercase tracking-wider">
          <Scale className="w-4 h-4 text-purple-600" />
          <span>Doctrina Judicial y Casación</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
          Repositorio de Jurisprudencia Dominicana
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Consulta las decisiones de la Suprema Corte de Justicia (SCJ) y las sentencias vinculantes del Tribunal Constitucional (TC), indexadas directamente a los artículos que interpretan.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {DEMO_CASE_LAWS.map((caseItem) => (
          <div
            key={caseItem.id}
            className="p-7 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-purple-800 bg-purple-50 border border-purple-200 px-3 py-1 rounded-xl">
                  {caseItem.sentenceNumber}
                </span>
                <span className="text-xs font-medium text-slate-600">
                  {caseItem.courtName}
                </span>
              </div>
              <span className="text-xs text-slate-400">
                {caseItem.judgmentDate} — {caseItem.docketNumber}
              </span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-amber-600 uppercase tracking-wider block mb-1">
                {caseItem.specialty}
              </span>
              <h2 className="font-serif font-bold text-xl text-slate-900">
                {caseItem.title}
              </h2>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <span className="text-xs font-bold text-slate-700 block">
                Doctrina Jurídica Sentada:
              </span>
              <p className="text-xs sm:text-sm text-slate-800 font-serif leading-relaxed">
                {caseItem.doctrine}
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-slate-600 font-medium">
                Norma / Artículo Aplicado: <strong className="text-slate-900">{caseItem.articleRef}</strong>
              </span>

              <div className="flex items-center gap-2">
                <Link
                  href="/buscar?q=16-92"
                  className="inline-flex items-center gap-1.5 font-semibold text-purple-700 hover:text-purple-800 bg-purple-50 hover:bg-purple-100 px-3.5 py-1.5 rounded-lg transition-colors"
                >
                  <span>Ver Artículos Vinculados</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
