import {
  createMockDepartments,
  MOCK_DEPARTMENT_OVERVIEW,
} from '../constants/mock.department'
import {
  type DepartmentFormInput,
  type DepartmentResponse,
} from '../validation/department-page.schema'
import { MOCK_EDIT_DEPARTMENT } from '../constants/mock.departments'
import {
  parseDepartment,
  parseDepartmentList,
  parseDepartmentOverview,
} from '../validation/department.schema'
import type {
  Department,
  DepartmentError,
  DepartmentId,
  DepartmentListQuery,
  DepartmentOverview,
  DepartmentPayload,
  DepartmentTimeRange,
} from '../types/department.types'

const LATENCY_MS = 380

export class DepartmentRequestError extends Error {
  readonly code: string
  readonly details?: unknown

  constructor(code: string, message: string, details?: unknown) {
    super(message)
    this.name = 'DepartmentRequestError'
    this.code = code
    this.details = details
  }
}

export function toDepartmentError(error: unknown): DepartmentError {
  if (error instanceof DepartmentRequestError) {
    return { code: error.code, message: error.message, details: error.details }
  }

  if (error instanceof Error) {
    return { code: 'department/unknown', message: error.message }
  }

  return { code: 'department/unknown', message: 'Unexpected department service error.' }
}

export function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError'
}

let store: Department[] | null = null

function getStore(): Department[] {
  store ??= createMockDepartments()

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

function matchesQuery(department: Department, query: DepartmentListQuery): boolean {
  const term = query.search.trim().toLowerCase()
  const matchesStatus = query.status === null || department.status === query.status
  const matchesTerm =
    term.length === 0 ||
    department.name.toLowerCase().includes(term) ||
    department.code.toLowerCase().includes(term) ||
    department.description.toLowerCase().includes(term)

  return matchesStatus && matchesTerm
}

function assertUniqueCodes(payload: DepartmentPayload, ignoreCode?: DepartmentId): void {
  const clash = getStore().some(
    (department) =>
      department.code !== ignoreCode &&
      department.code.toUpperCase() === payload.code.toUpperCase()
  )

  if (clash) {
    throw new DepartmentRequestError(
      'department/duplicate-code',
      `A department with code ${payload.code} already exists.`
    )
  }
}

function requireDepartment(code: DepartmentId): Department {
  const department = getStore().find((item) => item.code === code)

  if (!department) {
    throw new DepartmentRequestError('department/not-found', `Department ${code} not found.`)
  }

  return department
}

export const departmentService = {
  async list(
    query: DepartmentListQuery,
    signal?: AbortSignal
  ): Promise<Department[]> {
    await delay(signal)

    const matches = getStore()
      .filter((department) => matchesQuery(department, query))
      .map((department) => ({ ...department }))

    return parseDepartmentList(matches)
  },

  /** Unfiltered master-data size — independent of the current search/status filter. */
  async count(signal?: AbortSignal): Promise<number> {
    await delay(signal)

    return getStore().length
  },

  async overview(
    range: DepartmentTimeRange,
    signal?: AbortSignal
  ): Promise<DepartmentOverview> {
    await delay(signal)

    return parseDepartmentOverview(MOCK_DEPARTMENT_OVERVIEW[range])
  },

  async create(payload: DepartmentPayload): Promise<Department> {
    await delay()
    assertUniqueCodes(payload)

    const created: Department = {
      ...payload,
      code: payload.code as DepartmentId,
      updatedAt: new Date().toISOString(),
    }

    getStore().unshift(created)

    return parseDepartment({ ...created })
  },

  async update(code: DepartmentId, payload: DepartmentPayload): Promise<Department> {
    await delay()
    assertUniqueCodes(payload, code)

    const current = requireDepartment(code)
    const updated: Department = {
      ...current,
      ...payload,
      code: payload.code as DepartmentId,
      updatedAt: new Date().toISOString(),
    }

    const items = getStore()
    items.splice(items.indexOf(current), 1, updated)

    return parseDepartment({ ...updated })
  },

  async remove(code: DepartmentId): Promise<void> {
    await delay()

    const current = requireDepartment(code)
    const items = getStore()
    items.splice(items.indexOf(current), 1)
  },

  async createDepartment(data: DepartmentFormInput): Promise<DepartmentResponse> {
    await delay()
    const imageUrl =
      data.selectedImage ||
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'
    const newDepartmentPayload: DepartmentPayload = {
      code: data.code,
      name: data.name,
      description: data.description,
      status: data.status,
      imageUrl,
    }
    const created = await this.create(newDepartmentPayload)
    return {
      ...data,
      code: created.code,
    }
  },

  async getDepartmentByCode(code: string): Promise<DepartmentFormInput> {
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
      return { ...MOCK_EDIT_DEPARTMENT }
    } catch {
      return { ...MOCK_EDIT_DEPARTMENT }
    }
  },

  async updateDepartment(
    code: string,
    data: DepartmentFormInput
  ): Promise<DepartmentResponse> {
    await delay()
    const imageUrl =
      data.selectedImage ||
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'
    const updatePayload: DepartmentPayload = {
      code: data.code,
      name: data.name,
      description: data.description,
      status: data.status,
      imageUrl,
    }
    await this.update(code as DepartmentId, updatePayload)
    return {
      ...data,
      code,
    }
  },
}
