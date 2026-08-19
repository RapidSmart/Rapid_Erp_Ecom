import {
  createMockCategories,
  MOCK_CATEGORY_OVERVIEW,
} from '../constants/mock.category'
import {
  type CategoryFormInput,
  type CategoryResponse,
} from '../validation/category-page.schema'
import { MOCK_EDIT_CATEGORY } from '../constants/mock.categories'
import {
  parseCategory,
  parseCategoryList,
  parseCategoryOverview,
} from '../validation/category.schema'
import type {
  Category,
  CategoryError,
  CategoryId,
  CategoryListQuery,
  CategoryOverview,
  CategoryPayload,
  CategoryTimeRange,
} from '../types/category.types'

const LATENCY_MS = 380

export class CategoryRequestError extends Error {
  readonly code: string
  readonly details?: unknown

  constructor(code: string, message: string, details?: unknown) {
    super(message)
    this.name = 'CategoryRequestError'
    this.code = code
    this.details = details
  }
}

export function toCategoryError(error: unknown): CategoryError {
  if (error instanceof CategoryRequestError) {
    return { code: error.code, message: error.message, details: error.details }
  }

  if (error instanceof Error) {
    return { code: 'category/unknown', message: error.message }
  }

  return { code: 'category/unknown', message: 'Unexpected category service error.' }
}

export function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError'
}

let store: Category[] | null = null

function getStore(): Category[] {
  store ??= createMockCategories()

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

function matchesQuery(category: Category, query: CategoryListQuery): boolean {
  const term = query.search.trim().toLowerCase()
  const matchesStatus = query.status === null || category.status === query.status
  const matchesTerm =
    term.length === 0 ||
    category.name.toLowerCase().includes(term) ||
    category.code.toLowerCase().includes(term) ||
    category.description.toLowerCase().includes(term)

  return matchesStatus && matchesTerm
}

function assertUniqueCodes(payload: CategoryPayload, ignoreCode?: CategoryId): void {
  const clash = getStore().some(
    (category) =>
      category.code !== ignoreCode &&
      category.code.toUpperCase() === payload.code.toUpperCase()
  )

  if (clash) {
    throw new CategoryRequestError(
      'category/duplicate-code',
      `A category with code ${payload.code} already exists.`
    )
  }
}

function requireCategory(code: CategoryId): Category {
  const category = getStore().find((item) => item.code === code)

  if (!category) {
    throw new CategoryRequestError('category/not-found', `Category ${code} not found.`)
  }

  return category
}

export const categoryService = {
  async list(
    query: CategoryListQuery,
    signal?: AbortSignal
  ): Promise<Category[]> {
    await delay(signal)

    const matches = getStore()
      .filter((category) => matchesQuery(category, query))
      .map((category) => ({ ...category }))

    return parseCategoryList(matches)
  },

  /** Unfiltered master-data size — independent of the current search/status filter. */
  async count(signal?: AbortSignal): Promise<number> {
    await delay(signal)

    return getStore().length
  },

  async overview(
    range: CategoryTimeRange,
    signal?: AbortSignal
  ): Promise<CategoryOverview> {
    await delay(signal)

    return parseCategoryOverview(MOCK_CATEGORY_OVERVIEW[range])
  },

  async create(payload: CategoryPayload): Promise<Category> {
    await delay()
    assertUniqueCodes(payload)

    const created: Category = {
      ...payload,
      code: payload.code as CategoryId,
      updatedAt: new Date().toISOString(),
    }

    getStore().unshift(created)

    return parseCategory({ ...created })
  },

  async update(code: CategoryId, payload: CategoryPayload): Promise<Category> {
    await delay()
    assertUniqueCodes(payload, code)

    const current = requireCategory(code)
    const updated: Category = {
      ...current,
      ...payload,
      code: payload.code as CategoryId, // in case code changes, but typically code is read-only on edit
      updatedAt: new Date().toISOString(),
    }

    const items = getStore()
    items.splice(items.indexOf(current), 1, updated)

    return parseCategory({ ...updated })
  },

  async remove(code: CategoryId): Promise<void> {
    await delay()

    const current = requireCategory(code)
    const items = getStore()
    items.splice(items.indexOf(current), 1)
  },

  async createCategory(data: CategoryFormInput): Promise<CategoryResponse> {
    await delay()
    const imageUrl = data.selectedImage || 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=600&q=80'
    const newCategoryPayload: CategoryPayload = {
      code: data.code,
      name: data.name,
      description: data.description,
      status: data.status,
      imageUrl,
    }
    const created = await this.create(newCategoryPayload)
    return {
      ...data,
      code: created.code,
    }
  },

  async getCategoryByCode(code: string): Promise<CategoryFormInput> {
    try {
      const found = getStore().find((item) => item.code === code)
      if (found) {
        return {
          code: found.code,
          name: found.name,
          description: found.description,
          status: found.status === 'inactive' ? 'inactive' : 'active',
          selectedImage: found.imageUrl,
        }
      }
      return { ...MOCK_EDIT_CATEGORY }
    } catch {
      return { ...MOCK_EDIT_CATEGORY }
    }
  },

  async updateCategory(
    code: string,
    data: CategoryFormInput,
  ): Promise<CategoryResponse> {
    await delay()
    const imageUrl = data.selectedImage || 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=600&q=80'
    const updatePayload: CategoryPayload = {
      code: data.code,
      name: data.name,
      description: data.description,
      status: data.status,
      imageUrl,
    }
    await this.update(code as CategoryId, updatePayload)
    return {
      ...data,
      code,
    }
  },
}
