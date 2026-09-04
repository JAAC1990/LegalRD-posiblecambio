'use client';

/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Archivo: src/app/(public)/rutas-juridicas/page.tsx
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
import { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  ArrowRight,
  ShieldCheck,
  FileCheck,
  Building2,
  Clock,
  Sparkles,
  Search,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface PracticalRoute {
  id: string;
  problemTitle: string;
  category: string;
  juridicalIdentification: string;
  mandatoryDocuments: string[];
  evidenceNeeded: string[];
  competentAuthority: string;
  procedureSteps: string[];
  criticalDeadline: string;
  nextImmediateAction: string;
}

const PRESET_ROUTES: PracticalRoute[] = [
  {
    id: 'rt-1',
    problemTitle: 'Me chocaron el vehículo y la persona responsable no quiere pagar los daños',
    category: 'Tránsito / Responsabilidad Civil',
    juridicalIdentification: 'Demanda en reparación de daños y perjuicios por el hecho de las cosas inanimadas (Art. 1384 CC y Ley 63-17).',
    mandatoryDocuments: [
      'Acta de Infracción de Tránsito expedida por la DIGESETT.',
      'Copia de matrícula del vehículo propio y del causante.',
      'Póliza de seguro vigente al momento del impacto.',
    ],
    evidenceNeeded: [
      'Fotografías perimetrales del choque y de las placas.',
      'Dos cotizaciones formales de talleres autorizados.',
      'Testigos presenciales con cédula si hubo alegato de semáforo.',
    ],
    competentAuthority: 'Juzgado de Paz Especial de Tránsito del municipio donde ocurrió el accidente.',
    procedureSteps: [
      '1. Instrumentación de querella con constitución en parte civil o demanda civil.',
      '2. Notificación mediante acto de alguacil a conductor, propietario y aseguradora.',
      '3. Audiencia de debates ante el Juez de Paz de Tránsito.',
      '4. Sentencia judicial condenatoria.',
    ],
    criticalDeadline: 'Un (1) año calendario a partir del choque (Art. 303 Ley 63-17).',
    nextImmediateAction: 'Obtener la copia certificada del Acta levantada en la DIGESETT y cotizar el daño en taller autorizado.',
  },
  {
    id: 'rt-2',
    problemTitle: 'El inquilino tiene 3 meses sin pagar el alquiler de la casa o local comercial',
    category: 'Derecho Inmobiliario / Civil',
    juridicalIdentification: 'Demanda en desalojo por falta de pago y cobro de valores insolutos (Decreto 4807 de 1959 y Art. 1751 CC).',
    mandatoryDocuments: [
      'Contrato de arrendamiento original suscrito y legalizado.',
      'Recibo de depósito en el Banco Agrícola (Ley 4314).',
      'Recibos bancarios o constancias de pagos anteriores impagados.',
    ],
    evidenceNeeded: [
      'Acto de intimación de pago y puesta en mora notificado por ministerial.',
      'Certificación de No Depósito o No Consignación del Banco Agrícola.',
    ],
    competentAuthority: 'Juzgado de Paz ordinario de la demarcación del inmueble alquilado.',
    procedureSteps: [
      '1. Notificación de acto de intimación de pago con plazo de 3 días francos.',
      '2. Si no paga, acudir al Control de Alquileres para certificación previa.',
      '3. Emplazamiento de demanda en desalojo ante el Juzgado de Paz.',
      '4. Obtención de sentencia y rescisión de contrato con orden de expulsión forzosa.',
    ],
    criticalDeadline: 'La intimación otorga plazo perentorio de 3 días; la acción ordinaria prescribe a los 2 años.',
    nextImmediateAction: 'Enviar acto de ministerial intimando al pago en 3 días antes de depositar la demanda.',
  },
  {
    id: 'rt-3',
    problemTitle: 'Fui despedido verbalmente del trabajo sin entrega de liquidación',
    category: 'Derecho Laboral',
    juridicalIdentification: 'Demanda laboral en cobro de auxilio de cesantía, preaviso y salarios caídos por despido injustificado (Ley 16-92).',
    mandatoryDocuments: [
      'Cédula de identidad del trabajador.',
      'Carta de despido (si se la entregaron) o constancia de negativa patronal.',
      'Historial de cotizaciones de la TSS.',
    ],
    evidenceNeeded: [
      'Carnet de empleado, uniformes o correos corporativos.',
      'Estados de cuenta bancarios con nómina depositada.',
      'Testimonio de dos compañeros de trabajo.',
    ],
    competentAuthority: 'Juzgado de Trabajo del Distrito Judicial donde se prestaban los servicios.',
    procedureSteps: [
      '1. Radicación de queja formal en la Representación Local del Ministerio de Trabajo.',
      '2. Audiencia de conciliación administrativa obligatoria.',
      '3. Si no hay acuerdo, redacción e interposición de demanda ante el tribunal laboral.',
      '4. Sentencia judicial condenando al pago de prestaciones.',
    ],
    criticalDeadline: 'UN (1) MES fatal contado de fecha a fecha conforme al Art. 701 del Código de Trabajo.',
    nextImmediateAction: 'Presentarse en la oficina local del Ministerio de Trabajo dentro de los primeros 10 días para no perder el derecho por prescripción.',
  },
];

/**
 * Componente Principal de Vista: `RutasJuridicasPage`
 * Renderiza la interfaz de usuario interactiva y coordina el flujo operativo del módulo.
 * @returns Elemento JSX representativo de la página o vista
 */
export default function RutasJuridicasPage() {
  const [selectedRoute, setSelectedRoute] = useState<PracticalRoute>(PRESET_ROUTES[0]);
  const [customProblem, setCustomProblem] = useState<string>('');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full">
      {/* Cabecera */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold uppercase tracking-wider">
          <Compass className="w-4 h-4 text-amber-600" />
          <span>Guía Paso a Paso de Actuación</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
          ¿Qué Debo Hacer? — Rutas Jurídicas
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Convierte una situación cotidiana en una ruta estructurada de 8 etapas: desde la calificación legal hasta la autoridad competente, los plazos perentorios y la acción inmediata a tomar.
        </p>
      </div>

      {/* Selector de Situaciones Frecuentes */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block">
          Situaciones Cotidianas Frecuentes:
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {PRESET_ROUTES.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedRoute(r)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                selectedRoute.id === r.id
                  ? 'bg-amber-50/80 border-amber-500 shadow-xs'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span className="text-[10px] font-bold text-amber-800 uppercase">{r.category}</span>
              <span className="font-serif font-bold text-xs text-slate-900 line-clamp-2">{r.problemTitle}</span>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-600">
                <span>Ver ruta</span>
                <ArrowRight className="w-3 h-3 text-amber-600" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Visualización de la Ruta Paso a Paso */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
        <div className="border-b border-slate-100 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-800">
            {selectedRoute.category}
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mt-2">
            Problema: «{selectedRoute.problemTitle}»
          </h2>
        </div>

        {/* Flujo de 8 Etapas */}
        <div className="space-y-6">
          {/* Etapa 1: Calificación */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold shrink-0 text-sm">
              1
            </div>
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-sm text-slate-900">Identificación Jurídica</h3>
              <p className="text-xs text-slate-700 leading-relaxed font-serif">{selectedRoute.juridicalIdentification}</p>
            </div>
          </div>

          {/* Etapa 2 y 3: Documentos y Pruebas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200 flex items-start gap-4">
              <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold shrink-0 text-sm">
                2
              </div>
              <div className="space-y-2 text-xs text-slate-800">
                <h3 className="font-serif font-bold text-sm text-amber-950">Documentos que Necesitas</h3>
                <ul className="space-y-1 list-disc pl-4">
                  {selectedRoute.mandatoryDocuments.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-200 flex items-start gap-4">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0 text-sm">
                3
              </div>
              <div className="space-y-2 text-xs text-slate-800">
                <h3 className="font-serif font-bold text-sm text-indigo-950">Pruebas a Levantar</h3>
                <ul className="space-y-1 list-disc pl-4">
                  {selectedRoute.evidenceNeeded.map((e, i) => (
                    <li key={i}>{e}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Etapa 4: Autoridad */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold shrink-0 text-sm">
              4
            </div>
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-sm text-slate-900">Autoridad / Tribunal Competente</h3>
              <p className="text-xs text-slate-700">{selectedRoute.competentAuthority}</p>
            </div>
          </div>

          {/* Etapa 5: Procedimiento */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold shrink-0 text-sm">
              5
            </div>
            <div className="space-y-2 w-full text-xs text-slate-700">
              <h3 className="font-serif font-bold text-sm text-slate-900">Procedimiento Paso a Paso</h3>
              <div className="space-y-1">
                {selectedRoute.procedureSteps.map((step, i) => (
                  <p key={i}>{step}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Etapa 6: Plazo Crítico */}
          <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200 flex items-start gap-4">
            <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold shrink-0 text-sm">
              6
            </div>
            <div className="space-y-1 text-xs text-rose-950">
              <h3 className="font-serif font-bold text-sm text-rose-900">Plazo Crítico de Prescripción o Caducidad</h3>
              <p className="font-semibold">{selectedRoute.criticalDeadline}</p>
            </div>
          </div>

          {/* Etapa 7: Siguiente Acción Inmediata */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-start gap-4 shadow-md">
            <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shrink-0 text-sm">
              7
            </div>
            <div className="space-y-2">
              <h3 className="font-serif font-bold text-sm text-amber-400 uppercase tracking-wider">
                Acción Inmediata que Debes Tomar Hoy
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed font-semibold">
                {selectedRoute.nextImmediateAction}
              </p>
              <div className="pt-2">
                <Link
                  href="/asistente-ia"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Profundizar esta Ruta en Legal RD AI</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
