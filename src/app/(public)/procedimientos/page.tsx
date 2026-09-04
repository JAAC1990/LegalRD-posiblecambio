/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Archivo: src/app/(public)/procedimientos/page.tsx
 * Área: Módulo Público de Litigio e Investigación
 * 
 * DESCRIPCIÓN:
 * Herramientas de consulta abierta, cálculo de plazos, simuladores, fichas de conceptos y asistente jurídico.
 * 
 * CONTEXTO DE APLICACIÓN:
 * Diseñado conforme a las normas procesales y sustantivas vigentes
 * en la República Dominicana (Código Civil, Código de Trabajo,
 * Código de Procedimiento Civil, Ley 108-05, Ley 2-23, Ley 137-11).
 * ====================================================================
 */

import Link from 'next/link';
import { FolderKanban, Clock, Building2, FileCheck, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';

const DEMO_PROCEDURES = [
  {
    id: 'proc-1',
    title: 'Divorcio por Causa de Incompatibilidad de Caracteres',
    specialty: 'Derecho de Familia / Civil',
    competentCourt: 'Tribunal de Primera Instancia de la Familia / Cámara Civil y Comercial',
    timeframe: '2 a 4 meses aproximadamente',
    overview: 'Procedimiento judicial ordinario mediante el cual uno o ambos cónyuges solicitan la disolución del vínculo matrimonial amparados en la causal de incompatibilidad manifiesta.',
    stages: [
      '1. Redacción del Acto de Notificación de Demanda a través de Ministerial (Alguacil)',
      '2. Emplazamiento a la contraparte conforme a los plazos legales',
      '3. Celebración de la Audiencia de Conciliación y Producción de Pruebas',
      '4. Conclusiones al fondo del diferendo y depósito de expediente',
      '5. Emisión de Sentencia de Divorcio y posterior Pronunciamiento ante el Oficial del Estado Civil',
    ],
    mandatoryDocs: [
      'Acta de Matrimonio debidamente legalizada',
      'Actas de Nacimiento de los hijos menores procreados en el matrimonio (si aplica)',
      'Copia de Cédulas de Identidad y Electoral de los cónyuges',
      'Poder de representación a favor del abogado apoderado',
    ],
  },
  {
    id: 'proc-2',
    title: 'Procedimiento de Deslinde Inmobiliario',
    specialty: 'Derecho Inmobiliario',
    competentCourt: 'Tribunal de Tierras de Jurisdicción Original competente',
    timeframe: '4 a 8 meses',
    overview: 'Proceso contradictorio o voluntario para individualizar, ubicar y dotar de designación catastral y Certificado de Título independiente a una porción de terreno amparada en Constancia Anotada.',
    stages: [
      '1. Designación y Contratación de Agrimensor Habilitado',
      '2. Solicitud y Autorización de Trabajos de Mensura ante la Dirección Regional de Mensuras Catastrales',
      '3. Ejecución de Trabajos de Campo y Levantamiento Parcelario con Notificación a Colindantes',
      '4. Presentación de Planos y Aprobación Técnica en Mensuras Catastrales',
      '5. Juicio del Deslinde ante el Tribunal de Tierras de Jurisdicción Original',
      '6. Emisión de Sentencia de Deslinde y Emisión del Certificado de Título definitivo',
    ],
    mandatoryDocs: [
      'Constancia Anotada original o Duplicado del Dueño',
      'Acto de venta o documento acreditativo del derecho de propiedad',
      'Plano individual parcelario firmado por Agrimensor',
      'Actas de notificación a los colindantes del inmueble',
    ],
  },
];

/**
 * Componente Principal de Vista: `ProcedimientosPage`
 * Renderiza la interfaz de usuario interactiva y coordina el flujo operativo del módulo.
 * @returns Elemento JSX representativo de la página o vista
 */
export default function ProcedimientosPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold uppercase tracking-wider">
          <FolderKanban className="w-4 h-4 text-rose-600" />
          <span>Guías Procesales Dominicanas</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
          Procedimientos y Trámites Jurídicos
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Guías paso a paso de los principales trámites y procesos judiciales en la República Dominicana, incluyendo requisitos documentales, etapas procesales y tribunal competente.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {DEMO_PROCEDURES.map((proc) => (
          <div
            key={proc.id}
            className="p-8 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-md">
                  {proc.specialty}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {proc.timeframe}
                </span>
              </div>

              <h2 className="font-serif font-bold text-2xl text-slate-900 leading-snug">
                {proc.title}
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed">
                {proc.overview}
              </p>

              <div className="pt-2 border-t border-slate-100 space-y-2">
                <span className="text-xs font-bold text-slate-800 block">
                  Tribunal Competente:
                </span>
                <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                  {proc.competentCourt}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-800 block">
                  Etapas Principales:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {proc.stages.map((stage, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{stage}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-800 block">
                  Documentos Obligatorios:
                </span>
                <ul className="space-y-1 text-xs text-slate-500 list-disc list-inside">
                  {proc.mandatoryDocs.map((doc, idx) => (
                    <li key={idx}>{doc}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-amber-600 font-semibold">
              <span className="text-[11px] text-slate-400">Finalidad informativa</span>
              <Link href="/buscar?q=divorcio" className="inline-flex items-center gap-1 hover:text-amber-700">
                <span>Buscar normas relacionadas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
