import type {
  Category,
  CategoryId,
  CategoryOverview,
  CategoryStat,
  CategoryStatTone,
  CategoryStatus,
} from '../types/category.types'

const CATEGORY_STATUSES: readonly CategoryStatus[] = [
  'active',
  'inactive',
  'draft',
  'delete',
]

const STAT_TONES: readonly CategoryStatTone[] = [
  'total',
  'active',
  'inactive',
  'draft',
  'delete',
]

export class CategorySchemaError extends Error {
  readonly path: string

  constructor(path: string, expected: string) {
    super(`Invalid category response at "${path}": expected ${expected}.`)
    this.name = 'CategorySchemaError'
    this.path = path
  }
}

function isRecord(input: unknown): input is Record<string, unknown> {
  return typeof input === 'object' && input !== null && !Array.isArray(input)
}

function parseString(input: unknown, path: string): string {
  if (typeof input !== 'string' || input.length === 0) {
    throw new CategorySchemaError(path, 'a non-empty string')
  }

  return input
}

function parseNumber(input: unknown, path: string): number {
  if (typeof input !== 'number' || !Number.isFinite(input)) {
    throw new CategorySchemaError(path, 'a finite number')
  }

  return input
}

function parseStatus(input: unknown, path: string): CategoryStatus {
  if (!CATEGORY_STATUSES.includes(input as CategoryStatus)) {
    throw new CategorySchemaError(path, CATEGORY_STATUSES.join(' | '))
  }

  return input as CategoryStatus
}

export function parseCategory(input: unknown, path = 'category'): Category {
  if (!isRecord(input)) {
    throw new CategorySchemaError(path, 'an object')
  }

  return {
    code: parseString(input.code, `${path}.code`) as CategoryId,
    name: parseString(input.name, `${path}.name`),
    description: parseString(input.description, `${path}.description`),
    imageUrl: parseString(input.imageUrl, `${path}.imageUrl`),
    status: parseStatus(input.status, `${path}.status`),
    updatedAt: parseString(input.updatedAt, `${path}.updatedAt`),
  }
}

export function parseCategoryList(input: unknown, path = 'categories'): Category[] {
  if (!Array.isArray(input)) {
    throw new CategorySchemaError(path, 'an array')
  }

  return input.map((item, index) => parseCategory(item, `${path}[${index}]`))
}

function parseStat(input: unknown, path: string): CategoryStat {
  if (!isRecord(input)) {
    throw new CategorySchemaError(path, 'an object')
  }

  return {
    value: parseNumber(input.value, `${path}.value`),
    percentage: parseNumber(input.percentage, `${path}.percentage`),
  }
}

export function parseCategoryOverview(
  input: unknown,
  path = 'overview'
): CategoryOverview {
  if (!isRecord(input)) {
    throw new CategorySchemaError(path, 'an object')
  }

  const entries = STAT_TONES.map(
    (tone) => [tone, parseStat(input[tone], `${path}.${tone}`)] as const
  )

  return Object.fromEntries(entries) as CategoryOverview
}
