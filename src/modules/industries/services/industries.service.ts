import {
  MOCK_INDUSTRIES,
  MOCK_INDUSTRIES_OVERVIEW,
} from '../constants/mock.industries'
import {
  parseIndustry,
  parseIndustryList,
  parseIndustryOverview,
} from '../validation/industries.schema'
import type {
  Industry,
  IndustryError,
  IndustryId,
  IndustryListQuery,
  IndustryOverview,
  IndustryPayload,
  IndustryTimeRange,
} from '../types/industries.types'

const LATENCY_MS = 380

export class IndustryRequestError extends Error {
  readonly code: string
  readonly details?: unknown

  constructor(code: string, message: string, details?: unknown) {
    super(message)
    this.name = 'IndustryRequestError'
    this.code = code
    this.details = details
  }
}

export function toIndustryError(error: unknown): IndustryError {
  if (error instanceof IndustryRequestError) {
    return { code: error.code, message: error.message, details: error.details }
  }

  if (error instanceof Error) {
    return { code: 'industry/unknown', message: error.message }
  }

  return { code: 'industry/unknown', message: 'Unexpected industry service error.' }
}

export function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError'
}

let store: Industry[] | null = null

function getStore(): Industry[] {
  store ??= [...MOCK_INDUSTRIES]

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

function matchesQuery(industry: Industry, query: IndustryListQuery): boolean {
  const term = query.search.trim().toLowerCase()
  const matchesStatus = query.status === null || industry.status === query.status
  const matchesTerm =
    term.length === 0 ||
    industry.name.toLowerCase().includes(term) ||
    industry.code.toLowerCase().includes(term) ||
    industry.description.toLowerCase().includes(term)

  return matchesStatus && matchesTerm
}

function assertUniqueCodes(payload: IndustryPayload, ignoreId?: IndustryId): void {
  const clash = getStore().some(
    (industry) =>
      industry.id !== ignoreId &&
      (industry.code === payload.code || industry.name === payload.name)
  )

  if (clash) {
    throw new IndustryRequestError(
      'industry/duplicate-code',
      `An industry with code ${payload.code} or name ${payload.name} already exists.`
    )
  }
}

function requireIndustry(id: IndustryId): Industry {
  const industry = getStore().find((item) => item.id === id)

  if (!industry) {
    throw new IndustryRequestError('industry/not-found', `Industry ${id} not found.`)
  }

  return industry
}

export const industriesService = {
  async list(
    query: IndustryListQuery,
    signal?: AbortSignal
  ): Promise<Industry[]> {
    await delay(signal)

    const matches = getStore()
      .filter((industry) => matchesQuery(industry, query))
      .map((industry) => ({ ...industry }))

    return parseIndustryList(matches)
  },

  async count(signal?: AbortSignal): Promise<number> {
    await delay(signal)
    return getStore().length
  },

  async overview(
    _range: IndustryTimeRange,
    signal?: AbortSignal
  ): Promise<IndustryOverview> {
    await delay(signal)
    // In a real app we'd fetch this. We'll just return the mock.
    return parseIndustryOverview(MOCK_INDUSTRIES_OVERVIEW)
  },

  async get(id: IndustryId): Promise<Industry> {
    await delay()
    return requireIndustry(id)
  },

  async create(payload: IndustryPayload): Promise<Industry> {
    await delay()
    assertUniqueCodes(payload)

    const created: Industry = {
      ...payload,
      id: `ind-${crypto.randomUUID()}` as IndustryId,
      updatedAt: new Date().toISOString(),
    }

    getStore().unshift(created)

    return parseIndustry({ ...created })
  },

  async update(id: IndustryId, payload: IndustryPayload): Promise<Industry> {
    await delay()
    assertUniqueCodes(payload, id)

    const current = requireIndustry(id)
    const updated: Industry = {
      ...current,
      ...payload,
      updatedAt: new Date().toISOString(),
    }

    const items = getStore()
    items.splice(items.indexOf(current), 1, updated)

    return parseIndustry({ ...updated })
  },

  async remove(id: IndustryId): Promise<void> {
    await delay()

    const current = requireIndustry(id)
    const items = getStore()
    items.splice(items.indexOf(current), 1)
  },
}
