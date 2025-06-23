import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  description: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  category_id: z.string().uuid('Categoria inválida'),
  material: z.string().min(2, 'Material deve ter pelo menos 2 caracteres'),
  occasion: z.string().min(2, 'Ocasião deve ter pelo menos 2 caracteres'),
  theme: z.string().min(2, 'Tema deve ter pelo menos 2 caracteres'),
  featured: z.boolean().optional(),
});

export const categorySchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  icon: z.string().min(1, 'Ícone é obrigatório'),
});

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

export type ProductFormData = z.infer<typeof productSchema>;
export type CategoryFormData = z.infer<typeof categorySchema>;
export type LoginFormData = z.infer<typeof loginSchema>; 