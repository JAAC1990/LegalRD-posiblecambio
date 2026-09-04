import { z } from 'zod';

export const specialtySchema = z.object({
  name: z.string().min(3, 'El nombre de la especialidad debe tener al menos 3 caracteres'),
  slug: z.string().min(3, 'El slug identificador debe tener al menos 3 caracteres').regex(/^[a-z0-9-]+$/, 'El slug solo puede contener letras minúsculas, números y guiones'),
  description: z.string().optional(),
  iconName: z.string().optional(),
  displayOrder: z.coerce.number().default(0),
});

export type SpecialtyInput = z.infer<typeof specialtySchema>;
