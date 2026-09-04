/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Archivo: src/app/(public)/precios/page.tsx
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
import { Check, ShieldCheck, Sparkles, ArrowRight, Scale } from 'lucide-react';

const PLANS = [
  {
    name: 'Plan Gratuito',
    price: 'RD$ 0',
    frequency: 'Para siempre',
    desc: 'Acceso para consulta general y estudiantes que se inician en el Derecho.',
    features: [
      'Acceso a Códigos y Leyes públicas',
      'Directorio de las 19 Especialidades',
      'Buscador jurídico básico (10 consultas/día)',
      'Hasta 5 artículos guardados en favoritos',
      'Aviso legal obligatorio',
    ],
    cta: 'Registrarse Gratis',
    ctaLink: '/registro',
    featured: false,
  },
  {
    name: 'Abogado Pro (SaaS)',
    price: 'RD$ 1,650',
    frequency: '/ mes (o US$ 29)',
    desc: 'La herramienta definitiva para abogados en ejercicio y oficinas jurídicas.',
    features: [
      'Consultas ilimitadas en leyes y jurisprudencia',
      'Historial de reformas y comparador de versiones',
      'Notas privadas ilimitadas vinculadas a artículos',
      'Carpetas de expedientes por casos',
      'Asistente Jurídico con IA RAG ilimitado',
      'Exportación de citas a Word y PDF',
      'Simulador de cuestionarios y modo estudiante completo',
    ],
    cta: 'Probar 14 Días Gratis',
    ctaLink: '/registro',
    featured: true,
  },
  {
    name: 'Bufete / Corporativo',
    price: 'RD$ 4,950',
    frequency: '/ mes (hasta 5 abogados)',
    desc: 'Para firmas legales que requieren trabajo en equipo y expedientes compartidos.',
    features: [
      'Todo lo incluido en el Plan Abogado Pro',
      'Hasta 5 cuentas de abogados vinculadas',
      'Carpetas de expedientes colaborativas',
      'Notas compartidas entre colegas del bufete',
      'Soporte técnico prioritario y capacitación',
      'Acceso a futuras APIs de integración judicial',
    ],
    cta: 'Contactar Ventas',
    ctaLink: '/registro',
    featured: false,
  },
];

/**
 * Componente Principal de Vista: `PreciosPage`
 * Renderiza la interfaz de usuario interactiva y coordina el flujo operativo del módulo.
 * @returns Elemento JSX representativo de la página o vista
 */
export default function PreciosPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 w-full">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Planes y Suscripciones SaaS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 tracking-tight">
          Impulsa tu práctica jurídica en República Dominicana
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Elige el plan ideal para tus necesidades profesionales. Cancela o cambia de plan en cualquier momento.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {PLANS.map((plan, idx) => (
          <div
            key={idx}
            className={'rounded-3xl p-8 border flex flex-col justify-between transition-all duration-200 ' + (
              plan.featured
                ? 'bg-slate-900 text-white border-amber-500/50 shadow-2xl ring-2 ring-amber-500/20 lg:-translate-y-2'
                : 'bg-white text-slate-900 border-slate-200 shadow-sm hover:shadow-md'
            )}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-serif font-bold text-xl">{plan.name}</h2>
                {plan.featured && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-900 bg-amber-400 px-3 py-1 rounded-full">
                    Más Popular
                  </span>
                )}
              </div>

              <div>
                <span className="text-4xl font-serif font-extrabold">{plan.price}</span>
                <span className={'text-xs ml-1 ' + (plan.featured ? 'text-slate-400' : 'text-slate-500')}>
                  {plan.frequency}
                </span>
              </div>

              <p className={'text-xs leading-relaxed ' + (plan.featured ? 'text-slate-300' : 'text-slate-600')}>
                {plan.desc}
              </p>

              <div className="pt-4 border-t border-slate-200/20 space-y-3">
                <span className={'text-xs font-bold uppercase tracking-wider block ' + (plan.featured ? 'text-amber-400' : 'text-slate-700')}>
                  Características incluidas:
                </span>
                <ul className="space-y-2.5 text-xs">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className={'w-4 h-4 shrink-0 mt-0.5 ' + (plan.featured ? 'text-amber-400' : 'text-emerald-600')} />
                      <span className={plan.featured ? 'text-slate-200' : 'text-slate-600'}>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-8">
              <Link
                href={plan.ctaLink}
                className={'w-full py-3.5 px-4 rounded-xl font-bold text-xs text-center flex items-center justify-center gap-2 shadow-md transition-all ' + (
                  plan.featured
                    ? 'bg-amber-400 hover:bg-amber-500 text-slate-900 shadow-amber-500/20'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                )}
              >
                <span>{plan.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
