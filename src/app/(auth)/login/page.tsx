'use client';

/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Archivo: src/app/(auth)/login/page.tsx
 * Área: Componente del Sistema Legal RD
 * 
 * DESCRIPCIÓN:
 * Módulo de interfaz y lógica operativa para la plataforma jurídica de la República Dominicana.
 * 
 * CONTEXTO DE APLICACIÓN:
 * Diseñado conforme a las normas procesales y sustantivas vigentes
 * en la República Dominicana (Código Civil, Código de Trabajo,
 * Código de Procedimiento Civil, Ley 108-05, Ley 2-23, Ley 137-11).
 * ====================================================================
 */
import { useState } from 'react';
import Link from 'next/link';
import { Scale, Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { loginAction } from '@/lib/actions/auth';

/**
 * Componente Principal de Vista: `LoginPage`
 * Renderiza la interfaz de usuario interactiva y coordina el flujo operativo del módulo.
 * @returns Elemento JSX representativo de la página o vista
 */
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const res = await loginAction(null, formData);
    if (res?.error) {
      setError(res.error);
      setLoading(false);
    }
  }

  function fillDemo(demoEmail: string) {
    setEmail(demoEmail);
    setPassword('AdminLegalRD2026!');
    setError(null);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <div className="w-12 h-12 rounded-xl bg-slate-800 border border-amber-500/30 text-amber-400 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <Scale className="w-7 h-7" />
          </div>
          <span className="font-serif font-bold text-2xl text-white">
            Legal <span className="text-amber-400">RD</span>
          </span>
        </Link>
        <h2 className="text-2xl font-serif font-bold text-white tracking-tight">
          Acceso a la Plataforma
        </h2>
        <p className="text-xs text-slate-400">
          Inicia sesión para gestionar tus notas, expedientes y consultas jurídicas.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-2xl rounded-2xl sm:px-10 border border-slate-200/80">
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Correo Electrónico
              </label>
              <div className="relative rounded-lg shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@abogados.do"
                  className="block w-full pl-9 pr-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 bg-slate-50/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Contraseña
              </label>
              <div className="relative rounded-lg shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-9 pr-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 bg-slate-50/50"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <span>Verificando...</span>
              ) : (
                <>
                  <span>Ingresar al Sistema</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </>
              )}
            </button>
          </form>

          {/* Accesos Rápidos de Demostración para Pruebas Locales */}
          <div className="mt-6 pt-6 border-t border-slate-100">
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider text-center mb-3">
              Cuentas DEMO para evaluación rápida
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => fillDemo('admin@legalrd.do')}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-medium text-center border border-slate-200 transition-colors"
              >
                Super Admin
              </button>
              <button
                type="button"
                onClick={() => fillDemo('abogado@legalrd.do')}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-medium text-center border border-slate-200 transition-colors"
              >
                Abogado
              </button>
              <button
                type="button"
                onClick={() => fillDemo('estudiante@legalrd.do')}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-medium text-center border border-slate-200 transition-colors"
              >
                Estudiante
              </button>
            </div>
            <p className="text-[10px] text-slate-400 text-center mt-2">
              Contraseña DEMO: <span className="font-mono text-slate-600">AdminLegalRD2026!</span>
            </p>
          </div>

          <div className="mt-6 text-center text-xs text-slate-500">
            ¿Aún no tienes cuenta?{' '}
            <Link href="/registro" className="font-semibold text-amber-600 hover:text-amber-700">
              Regístrate gratis
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
