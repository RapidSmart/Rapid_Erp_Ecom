import {
  MOCK_BRANDS,
  MOCK_BRANDS_OVERVIEW,
} from '../constants/mock.brands'
import {
  parseBrand,
  parseBrandList,
  parseBrandOverview,
} from '../validation/brands.schema'
import type {
  Brand,
  BrandError,
  BrandId,
  BrandListQuery,
  BrandOverview,
  BrandPayload,
  BrandTimeRange,
} from '../types/brands.types'

const LATENCY_MS = 380

export class BrandRequestError extends Error {
  readonly code: string
  readonly details?: unknown

  constructor(code: string, message: string, details?: unknown) {
    super(message)
    this.name = 'BrandRequestError'
    this.code = code
    this.details = details
  }
}

export function toBrandError(error: unknown): BrandError {
  if (error instanceof BrandRequestError) {
    return { code: error.code, message: error.message, details: error.details }
  }

  if (error instanceof Error) {
    return { code: 'brand/unknown', message: error.message }
  }

  return { code: 'brand/unknown', message: 'Unexpected brand service error.' }
}

export function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError'
}

let store: Brand[] | null = null

function getStore(): Brand[] {
  store ??= [...MOCK_BRANDS]

  return store
}

function delay(signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException('Request aborted', 'AbortError'))
      return
    }

    const timeoutId = window.setTimeout(() => {
      signal?.removeEventListener('abort', onAbort)
      resolve()
    }, LATENCY_MS)

    function onAbort() {
      window.clearTimeout(timeoutId)
      reject(new DOMException('Request aborted', 'AbortError'))
    }

    signal?.addEventListener('abort', onAbort, { once: true })
  })
}

function matchesQuery(brand: Brand, query: BrandListQuery): boolean {
  const term = query.search.trim().toLowerCase()
  const matchesStatus = query.status === null || brand.status === query.status
  const matchesTerm =
    term.length === 0 ||
    brand.name.toLowerCase().includes(term) ||
    brand.code.toLowerCase().includes(term) ||
    brand.description.toLowerCase().includes(term)

  return matchesStatus && matchesTerm
}

function assertUniqueCodes(payload: BrandPayload, ignoreId?: BrandId): void {
  const clash = getStore().some(
    (brand) =>
      brand.id !== ignoreId &&
      (brand.code === payload.code || brand.name === payload.name)
  )

  if (clash) {
    throw new BrandRequestError(
      'brand/duplicate-code',
      `A brand with code ${payload.code} or name ${payload.name} already exists.`
    )
  }
}

function requireBrand(id: BrandId): Brand {
  const brand = getStore().find((item) => item.id === id)

  if (!brand) {
    throw new BrandRequestError('brand/not-found', `Brand ${id} not found.`)
  }

  return brand
}

export const brandsService = {
  async list(
    query: BrandListQuery,
    signal?: AbortSignal
  ): Promise<Brand[]> {
    await delay(signal)

    const matches = getStore()
      .filter((brand) => matchesQuery(brand, query))
      .map((brand) => ({ ...brand }))

    return parseBrandList(matches)
  },

  async count(signal?: AbortSignal): Promise<number> {
    await delay(signal)
    return getStore().length
  },

  async overview(
    range: BrandTimeRange,
    signal?: AbortSignal
  ): Promise<BrandOverview> {
    await delay(signal)
    // In a real app we'd fetch this. We'll just return the mock.
    return parseBrandOverview(MOCK_BRANDS_OVERVIEW)
  },

  async get(id: BrandId): Promise<Brand> {
    await delay()
    return requireBrand(id)
  },

  async create(payload: BrandPayload): Promise<Brand> {
    await delay()
    assertUniqueCodes(payload)

    const created: Brand = {
      ...payload,
      id: `brand-${crypto.randomUUID()}` as BrandId,
      updatedAt: new Date().toISOString(),
    }

    getStore().unshift(created)

    return parseBrand({ ...created })
  },

  async update(id: BrandId, payload: BrandPayload): Promise<Brand> {
    await delay()
    assertUniqueCodes(payload, id)

    const current = requireBrand(id)
    const updated: Brand = {
      ...current,
      ...payload,
      updatedAt: new Date().toISOString(),
    }

    const items = getStore()
    items.splice(items.indexOf(current), 1, updated)

    return parseBrand({ ...updated })
  },

  async remove(id: BrandId): Promise<void> {
    await delay()

    const current = requireBrand(id)
    const items = getStore()
    items.splice(items.indexOf(current), 1)
  },
}
