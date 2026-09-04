'use server';

/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Módulo: Server Actions para Administración de Especialidades
 * Ruta: src/lib/actions/specialties.ts
 * Ámbito Legal: Administración de Contenido Jurídico
 * 
 * PROPÓSITO:
 * Mutaciones de servidor para creación, edición y activación de especialidades jurídicas con respaldo en memoria.
 * 
 * FUNDAMENTOS NORMATIVOS:
 * Next.js Server Actions.
 * 
 * REGLA FUNDAMENTAL DE PRESERVACIÓN ACUMULATIVA:
 * Este archivo forma parte del ecosistema integral de Legal RD.
 * No se permite eliminar, simplificar ni alterar la lógica preexistente.
 * ====================================================================
 */
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { specialtySchema } from '@/lib/validations/specialty';

/**
 * Tipo: `SpecialtyActionState`
 * Define los valores admitidos para SpecialtyActionState según las reglas del dominio dominicano.
 */
export type SpecialtyActionState = {
  error?: string;
  success?: boolean;
};

/**
 * Función Operativa: `createSpecialtyAction`
 * Procesa la lógica de negocio y reglas jurídicas correspondientes.
 */
export async function createSpecialtyAction(prevState: SpecialtyActionState | null, formData: FormData): Promise<SpecialtyActionState> {
  const session = await getSession();
  if (!session || (session.roleType !== 'SUPER_ADMIN' && session.roleType !== 'LEGAL_ADMIN')) {
    return { error: 'No tienes permisos de administrador para realizar esta acción.' };
  }

  const rawName = formData.get('name') as string;
  const rawSlug = formData.get('slug') as string;
  const rawDesc = (formData.get('description') as string) || '';
  const rawIcon = (formData.get('iconName') as string) || 'Scale';
  const rawOrder = formData.get('displayOrder') as string;

  const validation = specialtySchema.safeParse({
    name: rawName,
    slug: rawSlug.toLowerCase().trim(),
    description: rawDesc,
    iconName: rawIcon,
    displayOrder: rawOrder ? parseInt(rawOrder, 10) : 0,
  });

  if (!validation.success) {
    return { error: validation.error.issues[0]?.message || 'Datos inválidos' };
  }

  try {
    await db.specialty.create({
      data: validation.data,
    });
  } catch (err: any) {
    if (err.code === 'P2002') {
      return { error: 'Ya existe una especialidad con este nombre o slug identificador.' };
    }
    return { error: 'Ocurrió un error al registrar la especialidad en la base de datos.' };
  }

  revalidatePath('/especialidades');
  revalidatePath('/admin/especialidades');
  return { success: true };
}

/**
 * Función Operativa: `updateSpecialtyAction`
 * Procesa la lógica de negocio y reglas jurídicas correspondientes.
 */
export async function updateSpecialtyAction(id: string, formData: FormData): Promise<SpecialtyActionState> {
  const session = await getSession();
  if (!session || (session.roleType !== 'SUPER_ADMIN' && session.roleType !== 'LEGAL_ADMIN')) {
    return { error: 'No tienes permisos de administrador para editar especialidades.' };
  }

  const rawName = formData.get('name') as string;
  const rawSlug = formData.get('slug') as string;
  const rawDesc = (formData.get('description') as string) || '';
  const rawIcon = (formData.get('iconName') as string) || 'Scale';
  const rawOrder = formData.get('displayOrder') as string;

  const validation = specialtySchema.safeParse({
    name: rawName,
    slug: rawSlug.toLowerCase().trim(),
    description: rawDesc,
    iconName: rawIcon,
    displayOrder: rawOrder ? parseInt(rawOrder, 10) : 0,
  });

  if (!validation.success) {
    return { error: validation.error.issues[0]?.message || 'Datos inválidos' };
  }

  try {
    await db.specialty.update({
      where: { id },
      data: validation.data,
    });
  } catch (err) {
    return { error: 'No se pudo actualizar la especialidad.' };
  }

  revalidatePath('/especialidades');
  revalidatePath('/admin/especialidades');
  return { success: true };
}

/**
 * Función Operativa: `deleteSpecialtyAction`
 * Procesa la lógica de negocio y reglas jurídicas correspondientes.
 */
export async function deleteSpecialtyAction(id: string): Promise<SpecialtyActionState> {
  const session = await getSession();
  if (!session || session.roleType !== 'SUPER_ADMIN') {
    return { error: 'Solo el Super Administrador puede eliminar especialidades jurídicas.' };
  }

  try {
    await db.specialty.delete({
      where: { id },
    });
  } catch (err) {
    return { error: 'No se puede eliminar la especialidad porque contiene normas o jurisprudencia vinculada.' };
  }

  revalidatePath('/especialidades');
  revalidatePath('/admin/especialidades');
  return { success: true };
}
