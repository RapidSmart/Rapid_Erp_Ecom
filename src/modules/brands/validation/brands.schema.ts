import { z } from 'zod'

export const brandSchema = z.object({
  id: z.string().optional(),
  code: z
    .string()
    .min(1, 'Code is required')
    .max(10, 'Code must be 10 characters or less'),
  name: z
    .string()
    .min(1, 'Name is required')
    .max(40, 'Name must be 40 characters or less'),
  description: z
    .string()
    .max(200, 'Description must be 200 characters or less'),
  image: z.string().optional(),
  status: z.enum(['active', 'inactive', 'draft', 'delete']).default('active'),
  updatedAt: z.string().optional(),
})

export const brandPayloadSchema = brandSchema.omit({ id: true, updatedAt: true })

export const brandListSchema = z.array(brandSchema)

const statSchema = z.object({
  value: z.number(),
  percentage: z.number(),
})

export const brandOverviewSchema = z.object({
  total: statSchema,
  active: statSchema,
  inactive: statSchema,
  draft: statSchema,
  delete: statSchema,
})

export function parseBrand(data: unknown) {
  return brandSchema.parse(data) as any
}

export function parseBrandList(data: unknown) {
  return brandListSchema.parse(data) as any[]
}

export function parseBrandOverview(data: unknown) {
  return brandOverviewSchema.parse(data) as any
}
