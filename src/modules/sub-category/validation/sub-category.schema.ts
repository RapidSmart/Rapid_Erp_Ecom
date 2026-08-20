import { z } from 'zod'
import type {
  SubCategory,
  SubCategoryId,
  SubCategoryOverview,
} from '../types/sub-category.types'

export const subCategoryStatusSchema = z.enum([
  'active',
  'inactive',
  'draft',
  'delete',
])

export const subCategoryStatToneSchema = z.enum([
  'total',
  'active',
  'inactive',
  'draft',
  'delete',
])

export class SubCategorySchemaError extends Error {
  readonly path: string

  constructor(path: string, expected: string) {
    super(`Invalid sub-category response at "${path}": expected ${expected}.`)
    this.name = 'SubCategorySchemaError'
    this.path = path
  }
}

export const subCategorySchema = z.object({
  code: z.string().min(1).transform((val) => val as SubCategoryId),
  name: z.string().min(1),
  description: z.string(),
  imageUrl: z.string(),
  status: subCategoryStatusSchema,
  updatedAt: z.string(),
})

export const subCategoryListSchema = z.array(subCategorySchema)

export const subCategoryStatSchema = z.object({
  value: z.number(),
  percentage: z.number(),
})

export const subCategoryOverviewSchema = z.object({
  total: subCategoryStatSchema,
  active: subCategoryStatSchema,
  inactive: subCategoryStatSchema,
  draft: subCategoryStatSchema,
  delete: subCategoryStatSchema,
})

export function parseSubCategory(input: unknown, path = 'subCategory'): SubCategory {
  const result = subCategorySchema.safeParse(input)
  if (!result.success) {
    throw new SubCategorySchemaError(path, result.error.message)
  }
  return result.data
}

export function parseSubCategoryList(input: unknown, path = 'subCategories'): SubCategory[] {
  const result = subCategoryListSchema.safeParse(input)
  if (!result.success) {
    throw new SubCategorySchemaError(path, result.error.message)
  }
  return result.data
}

export function parseSubCategoryOverview(
  input: unknown,
  path = 'overview'
): SubCategoryOverview {
  const result = subCategoryOverviewSchema.safeParse(input)
  if (!result.success) {
    throw new SubCategorySchemaError(path, result.error.message)
  }
  return result.data
}
