'use client';

/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Archivo: src/components/legal/TrialBanner.tsx
 * Área: Interfaz de Usuario / Período de Prueba de 15 Días
 * 
 * DESCRIPCIÓN:
 * Banner informativo que muestra el estado de vigencia del período
 * de prueba de 15 días, barra de progreso y días restantes.
 * ====================================================================
 */

import Link from 'next/link';
import { Sparkles, Clock, AlertTriangle, ArrowRight } from 'lucide-react';
import { UserTrialInfo } from '@/lib/data/userManagement';

interface TrialBannerProps {
  trial: UserTrialInfo;
  userName?: string;
}

export default function TrialBanner({ trial, userName }: TrialBannerProps) {
  if (!trial || !trial.hasTrial) return null;

  const isUrgent = trial.daysRemaining <= 3 && !trial.isTrialExpired;
  const isExpired = trial.isTrialExpired;

  if (isExpired) {
    return (
      <div className="rounded-2xl p-4 bg-rose-50 border border-rose-200 text-rose-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-rose-100 text-rose-700 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 block">
              Período de Prueba Vencido
            </span>
            <h4 className="font-serif font-bold text-sm text-slate-900">
              Tus 15 días de prueba gratuita han finalizado
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Contacta al SuperAdministrador o actualiza tu plan para continuar disfrutando del acceso ilimitado a todas las herramientas jurídicas.
            </p>
          </div>
        </div>

        <Link
          href="/precios"
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs font-bold transition-all shadow-xs shrink-0 flex items-center justify-center gap-1.5 w-full sm:w-auto"
        >
          <span>Suscribirse a Plan Pro</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl p-4 border transition-all shadow-xs ${
      isUrgent
        ? 'bg-amber-50/90 border-amber-300 text-amber-950'
        : 'bg-indigo-50/80 border-indigo-200 text-indigo-950'
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-xl shrink-0 ${
            isUrgent ? 'bg-amber-200 text-amber-900' : 'bg-indigo-100 text-indigo-700'
          }`}>
            {isUrgent ? <Clock className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                isUrgent
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-indigo-100 text-indigo-900 border-indigo-300'
              }`}>
                Prueba Gratuita Oficial — 15 Días
              </span>
              <span className="text-xs font-bold text-slate-900">
                {trial.daysRemaining} {trial.daysRemaining === 1 ? 'día restante' : 'días restantes'}
              </span>
            </div>

            <p className="text-xs text-slate-700">
              {userName ? `Hola ${userName}, ` : ''}tienes <strong>acceso total ilimitado</strong> a normas, jurisprudencia, calculadora de plazos y generador de documentos.
            </p>
          </div>
        </div>

        {/* Barra de Progreso de 15 Días */}
        <div className="sm:w-48 shrink-0 space-y-1">
          <div className="flex justify-between text-[10px] font-medium text-slate-600">
            <span>Día {Math.max(1, 15 - trial.daysRemaining)} de 15</span>
            <span>{trial.percentageUsed}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                isUrgent ? 'bg-amber-500' : 'bg-indigo-600'
              }`}
              style={{ width: `${trial.percentageUsed}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
