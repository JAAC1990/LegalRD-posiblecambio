/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Módulo: Pie de Página Institucional de Legal RD
 * Ruta: src/components/layout/Footer.tsx
 * Ámbito Legal: Interfaz de Usuario / Footer
 * 
 * PROPÓSITO:
 * Enlaces a directorios, términos de servicio, aviso legal sobre asesoría jurídica profesional, créditos y enlaces a gacetas oficiales.
 * 
 * FUNDAMENTOS NORMATIVOS:
 * Avisos legales de responsabilidad profesional.
 * 
 * REGLA FUNDAMENTAL DE PRESERVACIÓN ACUMULATIVA:
 * Este archivo forma parte del ecosistema integral de Legal RD.
 * No se permite eliminar, simplificar ni alterar la lógica preexistente.
 * ====================================================================
 */

import Link from 'next/link';
import { Scale, ShieldAlert, BookOpen, ExternalLink, Sparkles } from 'lucide-react';

/**
 * Función Operativa: `Footer`
 * Procesa la lógica de negocio y reglas jurídicas correspondientes.
 */
export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="bg-amber-950/60 border-b border-amber-500/30 py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-xs sm:text-sm text-amber-200 text-center">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
          <p>
            <strong>Aviso Legal Importante:</strong> La información proporcionada en Legal RD tiene fines estrictamente informativos y educativos y no sustituye la asesoría de un abogado habilitado para ejercer en la República Dominicana.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                <Scale className="w-5 h-5" />
              </div>
              <span className="font-serif font-bold text-lg text-white">
                Legal <span className="text-amber-400">RD</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Plataforma integral para la consulta, organización, estudio y gestión estructurada del ordenamiento jurídico de la República Dominicana.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Biblioteca Jurídica
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/normas" className="hover:text-amber-400 transition-colors">
                  Códigos y Leyes
                </Link>
              </li>
              <li>
                <Link href="/especialidades" className="hover:text-amber-400 transition-colors">
                  Especialidades (19 Ramas)
                </Link>
              </li>
              <li>
                <Link href="/jurisprudencia" className="hover:text-amber-400 transition-colors">
                  Jurisprudencia SCJ & TC
                </Link>
              </li>
              <li>
                <Link href="/procedimientos" className="hover:text-amber-400 transition-colors">
                  Procedimientos y Trámites
                </Link>
              </li>
              <li>
                <Link href="/asistente-ia" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <span>Asistente Jurídico IA</span>
                  <Sparkles className="w-3 h-3 text-amber-400" />
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Fuentes Oficiales
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://www.consultoria.gov.do"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-amber-400 transition-colors"
                >
                  <span>Consultoría Jurídica P.E.</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://poderjudicial.gob.do"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-amber-400 transition-colors"
                >
                  <span>Poder Judicial (SCJ)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://tribunalconstitucional.gob.do"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-amber-400 transition-colors"
                >
                  <span>Tribunal Constitucional</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Herramientas & Planes
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/precios" className="hover:text-amber-400 transition-colors">
                  Planes de Suscripción SaaS
                </Link>
              </li>
              <li>
                <Link href="/buscar" className="hover:text-amber-400 transition-colors">
                  Búsqueda Avanzada
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-amber-400 transition-colors">
                  Espacio de Trabajo
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-slate-500 hover:text-slate-400 transition-colors">
                  Acceso Administrativo
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Legal RD. Todos los derechos reservados.</p>
          <p className="mt-2 sm:mt-0">República Dominicana</p>
        </div>
      </div>
    </footer>
  );
}
