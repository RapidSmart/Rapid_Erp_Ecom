import {
  createMockSubCategories,
  MOCK_SUB_CATEGORY_OVERVIEW,
} from '../constants/mock.sub-category'
import {
  type SubCategoryFormInput,
  type SubCategoryResponse,
} from '../validation/sub-category-page.schema'
import { MOCK_EDIT_SUB_CATEGORY } from '../constants/mock.sub-categories'
import {
  parseSubCategory,
  parseSubCategoryList,
  parseSubCategoryOverview,
} from '../validation/sub-category.schema'
import type {
  SubCategory,
  SubCategoryError,
  SubCategoryId,
  SubCategoryListQuery,
  SubCategoryOverview,
  SubCategoryPayload,
  SubCategoryTimeRange,
} from '../types/sub-category.types'

const LATENCY_MS = 380

export class SubCategoryRequestError extends Error {
  readonly code: string
  readonly details?: unknown

  constructor(code: string, message: string, details?: unknown) {
    super(message)
    this.name = 'SubCategoryRequestError'
    this.code = code
    this.details = details
  }
}

export function toSubCategoryError(error: unknown): SubCategoryError {
  if (error instanceof SubCategoryRequestError) {
    return { code: error.code, message: error.message, details: error.details }
  }

  if (error instanceof Error) {
    return { code: 'subCategory/unknown', message: error.message }
  }

  return { code: 'subCategory/unknown', message: 'Unexpected sub-category service error.' }
}

export function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError'
}

let store: SubCategory[] | null = null

function getStore(): SubCategory[] {
  store ??= createMockSubCategories()

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

function matchesQuery(subCategory: SubCategory, query: SubCategoryListQuery): boolean {
  const term = query.search.trim().toLowerCase()
  const matchesStatus = query.status === null || subCategory.status === query.status
  const matchesTerm =
    term.length === 0 ||
    subCategory.name.toLowerCase().includes(term) ||
    subCategory.code.toLowerCase().includes(term) ||
    subCategory.description.toLowerCase().includes(term)

  return matchesStatus && matchesTerm
}

function assertUniqueCodes(payload: SubCategoryPayload, ignoreCode?: SubCategoryId): void {
  const clash = getStore().some(
    (subCategory) =>
      subCategory.code !== ignoreCode &&
      subCategory.code.toUpperCase() === payload.code.toUpperCase()
  )

  if (clash) {
    throw new SubCategoryRequestError(
      'subCategory/duplicate-code',
      `A sub category with code ${payload.code} already exists.`
    )
  }
}

function requireSubCategory(code: SubCategoryId): SubCategory {
  const subCategory = getStore().find((item) => item.code === code)

  if (!subCategory) {
    throw new SubCategoryRequestError('subCategory/not-found', `Sub Category ${code} not found.`)
  }

  return subCategory
}

export const subCategoryService = {
  async list(
    query: SubCategoryListQuery,
    signal?: AbortSignal
  ): Promise<SubCategory[]> {
    await delay(signal)

    const matches = getStore()
      .filter((subCategory) => matchesQuery(subCategory, query))
      .map((subCategory) => ({ ...subCategory }))

    return parseSubCategoryList(matches)
  },

  /** Unfiltered master-data size — independent of the current search/status filter. */
  async count(signal?: AbortSignal): Promise<number> {
    await delay(signal)

    return getStore().length
  },

  async overview(
    range: SubCategoryTimeRange,
    signal?: AbortSignal
  ): Promise<SubCategoryOverview> {
    await delay(signal)

    return parseSubCategoryOverview(MOCK_SUB_CATEGORY_OVERVIEW[range])
  },

  async create(payload: SubCategoryPayload): Promise<SubCategory> {
    await delay()
    assertUniqueCodes(payload)

    const created: SubCategory = {
      ...payload,
      code: payload.code as SubCategoryId,
      updatedAt: new Date().toISOString(),
    }

    getStore().unshift(created)

    return parseSubCategory({ ...created })
  },

  async update(code: SubCategoryId, payload: SubCategoryPayload): Promise<SubCategory> {
    await delay()
    assertUniqueCodes(payload, code)

    const current = requireSubCategory(code)
    const updated: SubCategory = {
      ...current,
      ...payload,
      code: payload.code as SubCategoryId,
      updatedAt: new Date().toISOString(),
    }

    const items = getStore()
    items.splice(items.indexOf(current), 1, updated)

    return parseSubCategory({ ...updated })
  },

  async remove(code: SubCategoryId): Promise<void> {
    await delay()

    const current = requireSubCategory(code)
    const items = getStore()
    items.splice(items.indexOf(current), 1)
  },

  async createSubCategory(data: SubCategoryFormInput): Promise<SubCategoryResponse> {
    await delay()
    const imageUrl =
      data.selectedImage ||
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80'
    const newPayload: SubCategoryPayload = {
      code: data.code,
      name: data.name,
      description: data.description,
      status: data.status,
      imageUrl,
    }
    const created = await this.create(newPayload)
    return {
      ...data,
      code: created.code,
    }
  },

  async getSubCategoryByCode(code: string): Promise<SubCategoryFormInput> {
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
      return { ...MOCK_EDIT_SUB_CATEGORY }
    } catch {
      return { ...MOCK_EDIT_SUB_CATEGORY }
    }
  },

  async updateSubCategory(
    code: string,
    data: SubCategoryFormInput
  ): Promise<SubCategoryResponse> {
    await delay()
    const imageUrl =
      data.selectedImage ||
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80'
    const updatePayload: SubCategoryPayload = {
      code: data.code,
      name: data.name,
      description: data.description,
      status: data.status,
      imageUrl,
    }
    await this.update(code as SubCategoryId, updatePayload)
    return {
      ...data,
      code,
    }
  },
}
