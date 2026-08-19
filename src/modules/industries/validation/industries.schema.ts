import { z } from 'zod'

export const industrySchema = z.object({
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

export const industryPayloadSchema = industrySchema.omit({ id: true, updatedAt: true })

export const industryListSchema = z.array(industrySchema)

const statSchema = z.object({
  value: z.number(),
  percentage: z.number(),
})

export const industryOverviewSchema = z.object({
  total: statSchema,
  active: statSchema,
  inactive: statSchema,
  draft: statSchema,
  delete: statSchema,
})

export function parseIndustry(data: unknown) {
  return industrySchema.parse(data) as any
}

export function parseIndustryList(data: unknown) {
  return industryListSchema.parse(data) as any[]
}

export function parseIndustryOverview(data: unknown) {
  return industryOverviewSchema.parse(data) as any
}
