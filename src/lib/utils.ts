/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Módulo: Utilidades Generales y Formateo de Cadenas
 * Ruta: src/lib/utils.ts
 * Ámbito Legal: Capa de Utilidades Comunes
 * 
 * PROPÓSITO:
 * Funciones auxiliares para combinación de clases CSS con Tailwind (clsx/tailwind-merge), formateo de moneda (DOP $) y fechas.
 * 
 * FUNDAMENTOS NORMATIVOS:
 * Next.js y utilidades frontend.
 * 
 * REGLA FUNDAMENTAL DE PRESERVACIÓN ACUMULATIVA:
 * Este archivo forma parte del ecosistema integral de Legal RD.
 * No se permite eliminar, simplificar ni alterar la lógica preexistente.
 * ====================================================================
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Función Operativa: `cn`
 * Procesa la lógica de negocio y reglas jurídicas correspondientes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
