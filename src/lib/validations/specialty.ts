/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Módulo: Esquemas de Validación Zod para Especialidades
 * Ruta: src/lib/validations/specialty.ts
 * Ámbito Legal: Validación de Entrada de Datos
 * 
 * PROPÓSITO:
 * Validación de slugs, nombres, descripciones y asignación de iconos temáticos para ramas jurídicas.
 * 
 * FUNDAMENTOS NORMATIVOS:
 * Zod validation library.
 * 
 * REGLA FUNDAMENTAL DE PRESERVACIÓN ACUMULATIVA:
 * Este archivo forma parte del ecosistema integral de Legal RD.
 * No se permite eliminar, simplificar ni alterar la lógica preexistente.
 * ====================================================================
 */

import { z } from 'zod';

export const specialtySchema = z.object({
  name: z.string().min(3, 'El nombre de la especialidad debe tener al menos 3 caracteres'),
  slug: z.string().min(3, 'El slug identificador debe tener al menos 3 caracteres').regex(/^[a-z0-9-]+$/, 'El slug solo puede contener letras minúsculas, números y guiones'),
  description: z.string().optional(),
  iconName: z.string().optional(),
  displayOrder: z.coerce.number().default(0),
});

/**
 * Tipo: `SpecialtyInput`
 * Define los valores admitidos para SpecialtyInput según las reglas del dominio dominicano.
 */
export type SpecialtyInput = z.infer<typeof specialtySchema>;
