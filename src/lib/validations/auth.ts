/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Módulo: Esquemas de Validación Zod para Autenticación
 * Ruta: src/lib/validations/auth.ts
 * Ámbito Legal: Validación de Entrada de Datos
 * 
 * PROPÓSITO:
 * Reglas estrictas de validación para correos, contraseñas seguras, nombres y números de cédula/colegiatura.
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

export const loginSchema = z.object({
  email: z.string().email('Por favor ingresa un correo electrónico válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export const registerSchema = z.object({
  fullName: z.string().min(3, 'El nombre completo debe tener al menos 3 caracteres'),
  email: z.string().email('Por favor ingresa un correo electrónico válido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres para mayor seguridad'),
  roleType: z.enum(['LAWYER', 'STUDENT', 'FREE_USER']),
});

/**
 * Tipo: `LoginInput`
 * Define los valores admitidos para LoginInput según las reglas del dominio dominicano.
 */
export type LoginInput = z.infer<typeof loginSchema>;
/**
 * Tipo: `RegisterInput`
 * Define los valores admitidos para RegisterInput según las reglas del dominio dominicano.
 */
export type RegisterInput = z.infer<typeof registerSchema>;
