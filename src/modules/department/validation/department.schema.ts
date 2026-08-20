import { z } from 'zod'
import type {
  Department,
  DepartmentId,
  DepartmentOverview,
} from '../types/department.types'

export const departmentStatusSchema = z.enum([
  'active',
  'inactive',
  'draft',
  'delete',
])

export const departmentStatToneSchema = z.enum([
  'total',
  'active',
  'inactive',
  'draft',
  'delete',
])

export class DepartmentSchemaError extends Error {
  readonly path: string

  constructor(path: string, expected: string) {
    super(`Invalid department response at "${path}": expected ${expected}.`)
    this.name = 'DepartmentSchemaError'
    this.path = path
  }
}

export const departmentSchema = z.object({
  code: z.string().min(1).transform((val) => val as DepartmentId),
  name: z.string().min(1),
  description: z.string(),
  imageUrl: z.string(),
  status: departmentStatusSchema,
  updatedAt: z.string(),
})

export const departmentListSchema = z.array(departmentSchema)

export const departmentStatSchema = z.object({
  value: z.number(),
  percentage: z.number(),
})

export const departmentOverviewSchema = z.object({
  total: departmentStatSchema,
  active: departmentStatSchema,
  inactive: departmentStatSchema,
  draft: departmentStatSchema,
  delete: departmentStatSchema,
})

export function parseDepartment(input: unknown, path = 'department'): Department {
  const result = departmentSchema.safeParse(input)
  if (!result.success) {
    throw new DepartmentSchemaError(path, result.error.message)
  }
  return result.data
}

export function parseDepartmentList(input: unknown, path = 'departments'): Department[] {
  const result = departmentListSchema.safeParse(input)
  if (!result.success) {
    throw new DepartmentSchemaError(path, result.error.message)
  }
  return result.data
}

export function parseDepartmentOverview(
  input: unknown,
  path = 'overview'
): DepartmentOverview {
  const result = departmentOverviewSchema.safeParse(input)
  if (!result.success) {
    throw new DepartmentSchemaError(path, result.error.message)
  }
  return result.data
}
