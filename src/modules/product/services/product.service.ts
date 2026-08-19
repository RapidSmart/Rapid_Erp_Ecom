import {
  createMockProducts,
  MOCK_PRODUCT_OVERVIEW,
} from '../constants/mock.product'
import {
  type ProductFormInput,
  type ProductResponse,
} from '../validation/product-page.schema'
import { MOCK_EDIT_PRODUCT } from '../constants/mock.products'
import {
  parseProduct,
  parseProductList,
  parseProductOverview,
} from '../validation/product.schema'
import type {
  Product,
  ProductError,
  ProductId,
  ProductListQuery,
  ProductOverview,
  ProductPayload,
  ProductTimeRange,
} from '../types/product.types'

const LATENCY_MS = 380

export class ProductRequestError extends Error {
  readonly code: string
  readonly details?: unknown

  constructor(code: string, message: string, details?: unknown) {
    super(message)
    this.name = 'ProductRequestError'
    this.code = code
    this.details = details
  }
}

export function toProductError(error: unknown): ProductError {
  if (error instanceof ProductRequestError) {
    return { code: error.code, message: error.message, details: error.details }
  }

  if (error instanceof Error) {
    return { code: 'product/unknown', message: error.message }
  }

  return { code: 'product/unknown', message: 'Unexpected product service error.' }
}

export function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError'
}

let store: Product[] | null = null

function getStore(): Product[] {
  store ??= createMockProducts()

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

function matchesQuery(product: Product, query: ProductListQuery): boolean {
  const term = query.search.trim().toLowerCase()
  const matchesStatus = query.status === null || product.status === query.status
  const matchesTerm =
    term.length === 0 ||
    product.name.toLowerCase().includes(term) ||
    product.sku.toLowerCase().includes(term) ||
    product.category.toLowerCase().includes(term)

  return matchesStatus && matchesTerm
}

function assertUniqueCodes(payload: ProductPayload, ignoreId?: ProductId): void {
  const clash = getStore().some(
    (product) =>
      product.id !== ignoreId &&
      product.sku.toUpperCase() === payload.sku.toUpperCase()
  )

  if (clash) {
    throw new ProductRequestError(
      'product/duplicate-sku',
      `A product with SKU ${payload.sku} already exists.`
    )
  }
}

function requireProduct(id: ProductId): Product {
  const product = getStore().find((item) => item.id === id)

  if (!product) {
    throw new ProductRequestError('product/not-found', `Product ${id} not found.`)
  }

  return product
}

export const productService = {
  async list(
    query: ProductListQuery,
    signal?: AbortSignal
  ): Promise<Product[]> {
    await delay(signal)

    const matches = getStore()
      .filter((product) => matchesQuery(product, query))
      .map((product) => ({ ...product }))

    return parseProductList(matches)
  },

  /** Unfiltered master-data size — independent of the current search/status filter. */
  async count(signal?: AbortSignal): Promise<number> {
    await delay(signal)

    return getStore().length
  },

  async overview(
    range: ProductTimeRange,
    signal?: AbortSignal
  ): Promise<ProductOverview> {
    await delay(signal)

    return parseProductOverview(MOCK_PRODUCT_OVERVIEW[range])
  },

  async create(payload: ProductPayload): Promise<Product> {
    await delay()
    assertUniqueCodes(payload)

    const created: Product = {
      ...payload,
      id: `product-${crypto.randomUUID()}` as ProductId,
      updatedAt: new Date().toISOString(),
    }

    getStore().unshift(created)

    return parseProduct({ ...created })
  },

  async update(id: ProductId, payload: ProductPayload): Promise<Product> {
    await delay()
    assertUniqueCodes(payload, id)

    const current = requireProduct(id)
    const updated: Product = {
      ...current,
      ...payload,
      updatedAt: new Date().toISOString(),
    }

    const items = getStore()
    items.splice(items.indexOf(current), 1, updated)

    return parseProduct({ ...updated })
  },

  async remove(id: ProductId): Promise<void> {
    await delay()

    const current = requireProduct(id)
    const items = getStore()
    items.splice(items.indexOf(current), 1)
  },

  async createProduct(data: ProductFormInput): Promise<ProductResponse> {
    // If backend endpoints were registered, we would use httpService:
    // const response = await httpService.post<unknown>(API_ROUTES.products.create, data)
    // return productResponseSchema.parse(response)
    
    // For now, we mock the service creation since we are in dev preview:
    await delay()
    const imageUrl = data.selectedImage || 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80'
    const newProductPayload: ProductPayload = {
      sku: data.sku,
      name: data.name,
      price: Number(data.price),
      category: data.category,
      status: data.status as any,
      stock: Number(data.stock),
      imageUrl,
    }
    const created = await this.create(newProductPayload)
    return {
      ...data,
      id: created.id,
    }
  },

  async getProductById(id: string): Promise<ProductFormInput> {
    try {
      // Find inside getStore()
      const found = getStore().find((item) => item.id === id)
      if (found) {
        return {
          sku: found.sku,
          name: found.name,
          price: String(found.price),
          category: found.category,
          stock: String(found.stock),
          status: found.status === 'inactive' ? 'inactive' : 'active',
          featured: 'yes',
          selectedImage: found.imageUrl,
          description: '',
        }
      }
      return { ...MOCK_EDIT_PRODUCT }
    } catch {
      return { ...MOCK_EDIT_PRODUCT }
    }
  },

  async updateProduct(
    id: string,
    data: ProductFormInput,
  ): Promise<ProductResponse> {
    await delay()
    const imageUrl = data.selectedImage || 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80'
    const updatePayload: ProductPayload = {
      sku: data.sku,
      name: data.name,
      price: Number(data.price),
      category: data.category,
      status: data.status as any,
      stock: Number(data.stock),
      imageUrl,
    }
    await this.update(id as ProductId, updatePayload)
    return {
      ...data,
      id,
    }
  },
}
