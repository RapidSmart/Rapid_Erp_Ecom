import { z } from 'zod'

export const departmentFormSchema = z.object({
  code: z
    .string()
    .min(2, 'Code must be at least 2 characters')
    .max(10, 'Code must be at most 10 characters')
    .regex(/^[A-Za-z0-9-_]+$/, 'Code can only contain letters, numbers, dashes, and underscores'),
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(40, 'Name must be at most 40 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(200, 'Description must be at most 200 characters'),
  status: z.enum(['active', 'inactive']).default('active'),
  selectedImage: z.string().nullable().optional(),
})

export const departmentResponseSchema = departmentFormSchema.extend({
  createdAt: z.string().optional(),
})

export type DepartmentFormInput = z.infer<typeof departmentFormSchema>
export type DepartmentResponse = z.infer<typeof departmentResponseSchema>
