import {
  MOCK_COLORS,
  MOCK_COLORS_OVERVIEW,
} from '../constants/mock.colors'
import {
  parseColor,
  parseColorList,
  parseColorOverview,
} from '../validation/colors.schema'
import type {
  Color,
  ColorError,
  ColorId,
  ColorListQuery,
  ColorOverview,
  ColorPayload,
  ColorTimeRange,
} from '../types/colors.types'

const LATENCY_MS = 380

export class ColorRequestError extends Error {
  readonly code: string
  readonly details?: unknown

  constructor(code: string, message: string, details?: unknown) {
    super(message)
    this.name = 'ColorRequestError'
    this.code = code
    this.details = details
  }
}

export function toColorError(error: unknown): ColorError {
  if (error instanceof ColorRequestError) {
    return { code: error.code, message: error.message, details: error.details }
  }

  if (error instanceof Error) {
    return { code: 'color/unknown', message: error.message }
  }

  return { code: 'color/unknown', message: 'Unexpected color service error.' }
}

export function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError'
}

let store: Color[] | null = null

function getStore(): Color[] {
  store ??= [...MOCK_COLORS]

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

function matchesQuery(color: Color, query: ColorListQuery): boolean {
  const term = query.search.trim().toLowerCase()
  const matchesStatus = query.status === null || color.status === query.status
  const matchesTerm =
    term.length === 0 ||
    color.name.toLowerCase().includes(term) ||
    color.code.toLowerCase().includes(term) ||
    color.description.toLowerCase().includes(term)

  return matchesStatus && matchesTerm
}

function assertUniqueCodes(payload: ColorPayload, ignoreId?: ColorId): void {
  const clash = getStore().some(
    (color) =>
      color.id !== ignoreId &&
      (color.code === payload.code || color.name === payload.name)
  )

  if (clash) {
    throw new ColorRequestError(
      'color/duplicate-code',
      `A color with code ${payload.code} or name ${payload.name} already exists.`
    )
  }
}

function requireColor(id: ColorId): Color {
  const color = getStore().find((item) => item.id === id)

  if (!color) {
    throw new ColorRequestError('color/not-found', `Color ${id} not found.`)
  }

  return color
}

export const colorsService = {
  async list(
    query: ColorListQuery,
    signal?: AbortSignal
  ): Promise<Color[]> {
    await delay(signal)

    const matches = getStore()
      .filter((color) => matchesQuery(color, query))
      .map((color) => ({ ...color }))

    return parseColorList(matches)
  },

  async count(signal?: AbortSignal): Promise<number> {
    await delay(signal)
    return getStore().length
  },

  async overview(
    range: ColorTimeRange,
    signal?: AbortSignal
  ): Promise<ColorOverview> {
    await delay(signal)
    // In a real app we'd fetch this. We'll just return the mock.
    return parseColorOverview(MOCK_COLORS_OVERVIEW)
  },

  async get(id: ColorId): Promise<Color> {
    await delay()
    return requireColor(id)
  },

  async create(payload: ColorPayload): Promise<Color> {
    await delay()
    assertUniqueCodes(payload)

    const created: Color = {
      ...payload,
      id: `color-${crypto.randomUUID()}` as ColorId,
      updatedAt: new Date().toISOString(),
    }

    getStore().unshift(created)

    return parseColor({ ...created })
  },

  async update(id: ColorId, payload: ColorPayload): Promise<Color> {
    await delay()
    assertUniqueCodes(payload, id)

    const current = requireColor(id)
    const updated: Color = {
      ...current,
      ...payload,
      updatedAt: new Date().toISOString(),
    }

    const items = getStore()
    items.splice(items.indexOf(current), 1, updated)

    return parseColor({ ...updated })
  },

  async remove(id: ColorId): Promise<void> {
    await delay()

    const current = requireColor(id)
    const items = getStore()
    items.splice(items.indexOf(current), 1)
  },
}
