import type {
  Product,
  ProductId,
  ProductOverview,
  ProductStat,
  ProductStatTone,
  ProductStatus,
} from '../types/product.types'

const PRODUCT_STATUSES: readonly ProductStatus[] = [
  'active',
  'inactive',
  'draft',
  'delete',
]

const STAT_TONES: readonly ProductStatTone[] = [
  'total',
  'active',
  'inactive',
  'draft',
  'delete',
]

export class ProductSchemaError extends Error {
  readonly path: string

  constructor(path: string, expected: string) {
    super(`Invalid product response at "${path}": expected ${expected}.`)
    this.name = 'ProductSchemaError'
    this.path = path
  }
}

function isRecord(input: unknown): input is Record<string, unknown> {
  return typeof input === 'object' && input !== null && !Array.isArray(input)
}

function parseString(input: unknown, path: string): string {
  if (typeof input !== 'string' || input.length === 0) {
    throw new ProductSchemaError(path, 'a non-empty string')
  }

  return input
}

function parseNumber(input: unknown, path: string): number {
  if (typeof input !== 'number' || !Number.isFinite(input)) {
    throw new ProductSchemaError(path, 'a finite number')
  }

  return input
}

function parseStatus(input: unknown, path: string): ProductStatus {
  if (!PRODUCT_STATUSES.includes(input as ProductStatus)) {
    throw new ProductSchemaError(path, PRODUCT_STATUSES.join(' | '))
  }

  return input as ProductStatus
}

export function parseProduct(input: unknown, path = 'product'): Product {
  if (!isRecord(input)) {
    throw new ProductSchemaError(path, 'an object')
  }

  return {
    id: parseString(input.id, `${path}.id`) as ProductId,
    name: parseString(input.name, `${path}.name`),
    sku: parseString(input.sku, `${path}.sku`),
    price: parseNumber(input.price, `${path}.price`),
    category: parseString(input.category, `${path}.category`),
    status: parseStatus(input.status, `${path}.status`),
    stock: parseNumber(input.stock, `${path}.stock`),
    imageUrl: parseString(input.imageUrl, `${path}.imageUrl`),
    updatedAt: parseString(input.updatedAt, `${path}.updatedAt`),
  }
}

export function parseProductList(input: unknown, path = 'products'): Product[] {
  if (!Array.isArray(input)) {
    throw new ProductSchemaError(path, 'an array')
  }

  return input.map((item, index) => parseProduct(item, `${path}[${index}]`))
}

function parseStat(input: unknown, path: string): ProductStat {
  if (!isRecord(input)) {
    throw new ProductSchemaError(path, 'an object')
  }

  return {
    value: parseNumber(input.value, `${path}.value`),
    percentage: parseNumber(input.percentage, `${path}.percentage`),
  }
}

export function parseProductOverview(
  input: unknown,
  path = 'overview'
): ProductOverview {
  if (!isRecord(input)) {
    throw new ProductSchemaError(path, 'an object')
  }

  const entries = STAT_TONES.map(
    (tone) => [tone, parseStat(input[tone], `${path}.${tone}`)] as const
  )

  return Object.fromEntries(entries) as ProductOverview
}
