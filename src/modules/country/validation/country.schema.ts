import type {
  Country,
  CountryId,
  CountryOverview,
  CountryStat,
  CountryStatTone,
  CountryStatus,
} from '../types/country.types'

/**
 * Runtime schema for everything the country service receives from the network.
 * TypeScript types are erased at runtime, so every response is parsed here
 * before it reaches hooks or components.
 */
const COUNTRY_STATUSES: readonly CountryStatus[] = [
  'active',
  'inactive',
  'draft',
  'delete',
]

const STAT_TONES: readonly CountryStatTone[] = [
  'total',
  'active',
  'inactive',
  'draft',
  'delete',
]

export class CountrySchemaError extends Error {
  readonly path: string

  constructor(path: string, expected: string) {
    super(`Invalid country response at "${path}": expected ${expected}.`)
    this.name = 'CountrySchemaError'
    this.path = path
  }
}

function isRecord(input: unknown): input is Record<string, unknown> {
  return typeof input === 'object' && input !== null && !Array.isArray(input)
}

function parseString(input: unknown, path: string): string {
  if (typeof input !== 'string' || input.length === 0) {
    throw new CountrySchemaError(path, 'a non-empty string')
  }

  return input
}

function parseNumber(input: unknown, path: string): number {
  if (typeof input !== 'number' || !Number.isFinite(input)) {
    throw new CountrySchemaError(path, 'a finite number')
  }

  return input
}

function parseStatus(input: unknown, path: string): CountryStatus {
  if (!COUNTRY_STATUSES.includes(input as CountryStatus)) {
    throw new CountrySchemaError(path, COUNTRY_STATUSES.join(' | '))
  }

  return input as CountryStatus
}

export function parseCountry(input: unknown, path = 'country'): Country {
  if (!isRecord(input)) {
    throw new CountrySchemaError(path, 'an object')
  }

  return {
    id: parseString(input.id, `${path}.id`) as CountryId,
    name: parseString(input.name, `${path}.name`),
    iso2: parseString(input.iso2, `${path}.iso2`),
    iso3: parseString(input.iso3, `${path}.iso3`),
    currency: parseString(input.currency, `${path}.currency`),
    callingCode: parseString(input.callingCode, `${path}.callingCode`),
    status: parseStatus(input.status, `${path}.status`),
    updatedAt: parseString(input.updatedAt, `${path}.updatedAt`),
  }
}

export function parseCountryList(input: unknown, path = 'countries'): Country[] {
  if (!Array.isArray(input)) {
    throw new CountrySchemaError(path, 'an array')
  }

  return input.map((item, index) => parseCountry(item, `${path}[${index}]`))
}

function parseStat(input: unknown, path: string): CountryStat {
  if (!isRecord(input)) {
    throw new CountrySchemaError(path, 'an object')
  }

  return {
    value: parseNumber(input.value, `${path}.value`),
    percentage: parseNumber(input.percentage, `${path}.percentage`),
  }
}

export function parseCountryOverview(
  input: unknown,
  path = 'overview'
): CountryOverview {
  if (!isRecord(input)) {
    throw new CountrySchemaError(path, 'an object')
  }

  const entries = STAT_TONES.map(
    (tone) => [tone, parseStat(input[tone], `${path}.${tone}`)] as const
  )

  return Object.fromEntries(entries) as CountryOverview
}
