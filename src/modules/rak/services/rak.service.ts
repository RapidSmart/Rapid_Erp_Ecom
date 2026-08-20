import {
  MOCK_RAK,
  MOCK_RAK_OVERVIEW,
} from '../constants/mock.rak'
import {
  parseRak,
  parseRakList,
  parseRakOverview,
} from '../validation/rak.schema'
import type {
  Rak,
  RakError,
  RakId,
  RakListQuery,
  RakOverview,
  RakPayload,
  RakTimeRange,
} from '../types/rak.types'

const LATENCY_MS = 380

export class RakRequestError extends Error {
  readonly code: string
  readonly details?: unknown

  constructor(code: string, message: string, details?: unknown) {
    super(message)
    this.name = 'RakRequestError'
    this.code = code
    this.details = details
  }
}

export function toRakError(error: unknown): RakError {
  if (error instanceof RakRequestError) {
    return { code: error.code, message: error.message, details: error.details }
  }

  if (error instanceof Error) {
    return { code: 'rak/unknown', message: error.message }
  }

  return { code: 'rak/unknown', message: 'Unexpected rak service error.' }
}

export function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError'
}

let store: Rak[] | null = null

function getStore(): Rak[] {
  store ??= [...MOCK_RAK]

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

function matchesQuery(rak: Rak, query: RakListQuery): boolean {
  const term = query.search.trim().toLowerCase()
  const matchesStatus = query.status === null || rak.status === query.status
  const matchesTerm =
    term.length === 0 ||
    rak.name.toLowerCase().includes(term) ||
    rak.code.toLowerCase().includes(term) ||
    rak.description.toLowerCase().includes(term)

  return matchesStatus && matchesTerm
}

function assertUniqueCodes(payload: RakPayload, ignoreId?: RakId): void {
  const clash = getStore().some(
    (rak) =>
      rak.id !== ignoreId &&
      (rak.code === payload.code || rak.name === payload.name)
  )

  if (clash) {
    throw new RakRequestError(
      'rak/duplicate-code',
      `A Rak with code ${payload.code} or name ${payload.name} already exists.`
    )
  }
}

function requireRak(id: RakId): Rak {
  const rak = getStore().find((item) => item.id === id)

  if (!rak) {
    throw new RakRequestError('rak/not-found', `Rak ${id} not found.`)
  }

  return rak
}

export const rakService = {
  async list(
    query: RakListQuery,
    signal?: AbortSignal
  ): Promise<Rak[]> {
    await delay(signal)

    const matches = getStore()
      .filter((rak) => matchesQuery(rak, query))
      .map((rak) => ({ ...rak }))

    return parseRakList(matches)
  },

  async count(signal?: AbortSignal): Promise<number> {
    await delay(signal)
    return getStore().length
  },

  async overview(
    range: RakTimeRange,
    signal?: AbortSignal
  ): Promise<RakOverview> {
    await delay(signal)
    // In a real app we'd fetch this. We'll just return the mock.
    return parseRakOverview(MOCK_RAK_OVERVIEW)
  },

  async get(id: RakId): Promise<Rak> {
    await delay()
    return requireRak(id)
  },

  async create(payload: RakPayload): Promise<Rak> {
    await delay()
    assertUniqueCodes(payload)

    const created: Rak = {
      ...payload,
      id: `rak-${crypto.randomUUID()}` as RakId,
      updatedAt: new Date().toISOString(),
    }

    getStore().unshift(created)

    return parseRak({ ...created })
  },

  async update(id: RakId, payload: RakPayload): Promise<Rak> {
    await delay()
    assertUniqueCodes(payload, id)

    const current = requireRak(id)
    const updated: Rak = {
      ...current,
      ...payload,
      updatedAt: new Date().toISOString(),
    }

    const items = getStore()
    items.splice(items.indexOf(current), 1, updated)

    return parseRak({ ...updated })
  },

  async remove(id: RakId): Promise<void> {
    await delay()

    const current = requireRak(id)
    const items = getStore()
    items.splice(items.indexOf(current), 1)
  },
}
