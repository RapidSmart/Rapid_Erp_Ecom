import { z } from 'zod'

export const productFormSchema = z.object({
  sku: z.string().min(3, 'SKU must be at least 3 characters'),
  name: z.string().min(2, 'Product name must be at least 2 characters'),
  price: z.string().min(1, 'Price is required').refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Price must be a positive number',
  }),
  category: z.string().min(1, 'Category is required'),
  stock: z.string().min(1, 'Stock is required').refine((val) => !isNaN(Number(val)) && Number(val) >= 0 && Number.isInteger(Number(val)), {
    message: 'Stock must be a non-negative integer',
  }),
  status: z.enum(['active', 'inactive']).default('active'),
  featured: z.string().optional(),
  selectedImage: z.string().nullable().optional(),
  description: z.string().optional(),
})

export const productResponseSchema = productFormSchema.extend({
  id: z.string(),
  createdAt: z.string().optional(),
})

export type ProductFormInput = z.infer<typeof productFormSchema>
export type ProductResponse = z.infer<typeof productResponseSchema>
