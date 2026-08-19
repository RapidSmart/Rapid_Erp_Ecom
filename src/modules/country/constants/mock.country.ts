import type {
  Country,
  CountryId,
  CountryOverview,
  CountryStatus,
  CountryTimeRange,
} from '../types/country.types'

/**
 * Mock dataset used while the country endpoints are being built. It is the only
 * data source `country.service.ts` reads from — swap that service over to
 * `httpService` once the real API ships and this file can be deleted.
 */
interface CountrySeed {
  name: string
  iso2: string
  iso3: string
  currency: string
  callingCode: string
  status: CountryStatus
  updatedMinutesAgo: number
}

const MINUTES_PER_DAY = 60 * 24

const COUNTRY_SEED: readonly CountrySeed[] = [
  { name: 'United States', iso2: 'US', iso3: 'USA', currency: 'USD', callingCode: '+1', status: 'active', updatedMinutesAgo: 2 * 60 },
  { name: 'Canada', iso2: 'CA', iso3: 'CAN', currency: 'CAD', callingCode: '+1', status: 'active', updatedMinutesAgo: 380 * MINUTES_PER_DAY },
  { name: 'Japan', iso2: 'JP', iso3: 'JPN', currency: 'JPY', callingCode: '+81', status: 'inactive', updatedMinutesAgo: 4 * 60 },
  { name: 'Germany', iso2: 'DE', iso3: 'DEU', currency: 'EUR', callingCode: '+49', status: 'active', updatedMinutesAgo: 5 * 60 },
  { name: 'France', iso2: 'FR', iso3: 'FRA', currency: 'EUR', callingCode: '+33', status: 'draft', updatedMinutesAgo: 400 * MINUTES_PER_DAY },
  { name: 'Italy', iso2: 'IT', iso3: 'ITA', currency: 'EUR', callingCode: '+39', status: 'active', updatedMinutesAgo: 6 * 60 },
  { name: 'Spain', iso2: 'ES', iso3: 'ESP', currency: 'EUR', callingCode: '+34', status: 'active', updatedMinutesAgo: 420 * MINUTES_PER_DAY },
  { name: 'Portugal', iso2: 'PT', iso3: 'PRT', currency: 'EUR', callingCode: '+351', status: 'inactive', updatedMinutesAgo: 14 * MINUTES_PER_DAY },
  { name: 'United Kingdom', iso2: 'GB', iso3: 'GBR', currency: 'GBP', callingCode: '+44', status: 'active', updatedMinutesAgo: 440 * MINUTES_PER_DAY },
  { name: 'Australia', iso2: 'AU', iso3: 'AUS', currency: 'AUD', callingCode: '+61', status: 'active', updatedMinutesAgo: 25 },
  { name: 'India', iso2: 'IN', iso3: 'IND', currency: 'INR', callingCode: '+91', status: 'active', updatedMinutesAgo: 40 },
  { name: 'Brazil', iso2: 'BR', iso3: 'BRA', currency: 'BRL', callingCode: '+55', status: 'draft', updatedMinutesAgo: 30 * 60 },
]

export function createMockCountries(): Country[] {
  const now = Date.now()

  return COUNTRY_SEED.map((seed, index) => ({
    id: `country-${index + 1}` as CountryId,
    name: seed.name,
    iso2: seed.iso2,
    iso3: seed.iso3,
    currency: seed.currency,
    callingCode: seed.callingCode,
    status: seed.status,
    updatedAt: new Date(now - seed.updatedMinutesAgo * 60_000).toISOString(),
  }))
}

/**
 * Overview aggregates are computed server-side over the selected time window,
 * so they intentionally do not mirror the paginated list on screen.
 */
export const MOCK_COUNTRY_OVERVIEW: Record<CountryTimeRange, CountryOverview> = {
  live: {
    total: { value: 15, percentage: 5 },
    active: { value: 0, percentage: 10 },
    inactive: { value: 57, percentage: 23 },
    draft: { value: 14, percentage: 32 },
    delete: { value: 14, percentage: 5 },
  },
  '6h': {
    total: { value: 24, percentage: 8 },
    active: { value: 11, percentage: 14 },
    inactive: { value: 49, percentage: 19 },
    draft: { value: 12, percentage: 27 },
    delete: { value: 9, percentage: 4 },
  },
  '24h': {
    total: { value: 63, percentage: 12 },
    active: { value: 38, percentage: 21 },
    inactive: { value: 41, percentage: 17 },
    draft: { value: 18, percentage: 24 },
    delete: { value: 6, percentage: 3 },
  },
  '7d': {
    total: { value: 184, percentage: 18 },
    active: { value: 122, percentage: 34 },
    inactive: { value: 35, percentage: 12 },
    draft: { value: 21, percentage: 19 },
    delete: { value: 11, percentage: 6 },
  },
  '30d': {
    total: { value: 512, percentage: 27 },
    active: { value: 388, percentage: 46 },
    inactive: { value: 28, percentage: 9 },
    draft: { value: 33, percentage: 15 },
    delete: { value: 19, percentage: 7 },
  },
}
