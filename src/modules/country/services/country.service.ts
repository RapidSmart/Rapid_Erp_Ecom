import {
  createMockCountries,
  MOCK_COUNTRY_OVERVIEW,
} from '../constants/mock.country'
import {
  parseCountry,
  parseCountryList,
  parseCountryOverview,
} from '../validation/country.schema'
import type {
  Country,
  CountryError,
  CountryId,
  CountryListQuery,
  CountryOverview,
  CountryPayload,
  CountryTimeRange,
} from '../types/country.types'

/**
 * Country data access.
 *
 * The country endpoints do not exist yet, so requests are served from the
 * in-memory mock store in `constants/mock.country.ts` with the same async
 * contract (latency, abort, normalised errors, schema-validated payloads) the
 * HTTP layer will have. When the API ships, replace the `read`/`write` helpers
 * with `httpService` calls from `@/shared/services` — nothing above this file
 * has to change.
 */
const LATENCY_MS = 380

export class CountryRequestError extends Error {
  readonly code: string
  readonly details?: unknown

  constructor(code: string, message: string, details?: unknown) {
    super(message)
    this.name = 'CountryRequestError'
    this.code = code
    this.details = details
  }
}

export function toCountryError(error: unknown): CountryError {
  if (error instanceof CountryRequestError) {
    return { code: error.code, message: error.message, details: error.details }
  }

  if (error instanceof Error) {
    return { code: 'country/unknown', message: error.message }
  }

  return { code: 'country/unknown', message: 'Unexpected country service error.' }
}

export function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError'
}

let store: Country[] | null = null

function getStore(): Country[] {
  store ??= createMockCountries()

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

function matchesQuery(country: Country, query: CountryListQuery): boolean {
  const term = query.search.trim().toLowerCase()
  const matchesStatus = query.status === null || country.status === query.status
  const matchesTerm =
    term.length === 0 ||
    country.name.toLowerCase().includes(term) ||
    country.iso2.toLowerCase().includes(term) ||
    country.iso3.toLowerCase().includes(term) ||
    country.currency.toLowerCase().includes(term) ||
    country.callingCode.toLowerCase().includes(term)

  return matchesStatus && matchesTerm
}

function assertUniqueCodes(payload: CountryPayload, ignoreId?: CountryId): void {
  const clash = getStore().some(
    (country) =>
      country.id !== ignoreId &&
      (country.iso2 === payload.iso2 || country.iso3 === payload.iso3)
  )

  if (clash) {
    throw new CountryRequestError(
      'country/duplicate-code',
      `A country with code ${payload.iso2} already exists.`
    )
  }
}

function requireCountry(id: CountryId): Country {
  const country = getStore().find((item) => item.id === id)

  if (!country) {
    throw new CountryRequestError('country/not-found', `Country ${id} not found.`)
  }

  return country
}

export const countryService = {
  async list(
    query: CountryListQuery,
    signal?: AbortSignal
  ): Promise<Country[]> {
    await delay(signal)

    const matches = getStore()
      .filter((country) => matchesQuery(country, query))
      .map((country) => ({ ...country }))

    return parseCountryList(matches)
  },

  /** Unfiltered master-data size — independent of the current search/status filter. */
  async count(signal?: AbortSignal): Promise<number> {
    await delay(signal)

    return getStore().length
  },

  async overview(
    range: CountryTimeRange,
    signal?: AbortSignal
  ): Promise<CountryOverview> {
    await delay(signal)

    return parseCountryOverview(MOCK_COUNTRY_OVERVIEW[range])
  },

  async create(payload: CountryPayload): Promise<Country> {
    await delay()
    assertUniqueCodes(payload)

    const created: Country = {
      ...payload,
      id: `country-${crypto.randomUUID()}` as CountryId,
      updatedAt: new Date().toISOString(),
    }

    getStore().unshift(created)

    return parseCountry({ ...created })
  },

  async update(id: CountryId, payload: CountryPayload): Promise<Country> {
    await delay()
    assertUniqueCodes(payload, id)

    const current = requireCountry(id)
    const updated: Country = {
      ...current,
      ...payload,
      updatedAt: new Date().toISOString(),
    }

    const items = getStore()
    items.splice(items.indexOf(current), 1, updated)

    return parseCountry({ ...updated })
  },

  async remove(id: CountryId): Promise<void> {
    await delay()

    const current = requireCountry(id)
    const items = getStore()
    items.splice(items.indexOf(current), 1)
  },
}
