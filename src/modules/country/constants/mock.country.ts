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
  countryCode: string
  name: string
  nativeName: string
  iso2: string
  iso3: string
  isoNumeric: string
  status: CountryStatus
  isDefault: boolean
  updatedMinutesAgo: number
}

const MINUTES_PER_DAY = 60 * 24

const COUNTRY_SEED: readonly CountrySeed[] = [
  { countryCode: 'US', name: 'United States', nativeName: 'Estados Unidos', iso2: 'US', iso3: 'USA', isoNumeric: '840', status: 'active', isDefault: true, updatedMinutesAgo: 2 * 60 },
  { countryCode: 'CA', name: 'Canada', nativeName: 'Canada', iso2: 'CA', iso3: 'CAN', isoNumeric: '124', status: 'active', isDefault: false, updatedMinutesAgo: 380 * MINUTES_PER_DAY },
  { countryCode: 'JP', name: 'Japan', nativeName: 'Nippon', iso2: 'JP', iso3: 'JPN', isoNumeric: '392', status: 'inactive', isDefault: false, updatedMinutesAgo: 4 * 60 },
  { countryCode: 'DE', name: 'Germany', nativeName: 'Deutschland', iso2: 'DE', iso3: 'DEU', isoNumeric: '276', status: 'active', isDefault: false, updatedMinutesAgo: 5 * 60 },
  { countryCode: 'FR', name: 'France', nativeName: 'France', iso2: 'FR', iso3: 'FRA', isoNumeric: '250', status: 'draft', isDefault: false, updatedMinutesAgo: 400 * MINUTES_PER_DAY },
  { countryCode: 'IT', name: 'Italy', nativeName: 'Italia', iso2: 'IT', iso3: 'ITA', isoNumeric: '380', status: 'active', isDefault: false, updatedMinutesAgo: 6 * 60 },
  { countryCode: 'ES', name: 'Spain', nativeName: 'España', iso2: 'ES', iso3: 'ESP', isoNumeric: '724', status: 'active', isDefault: false, updatedMinutesAgo: 420 * MINUTES_PER_DAY },
  { countryCode: 'PT', name: 'Portugal', nativeName: 'Portugal', iso2: 'PT', iso3: 'PRT', isoNumeric: '620', status: 'inactive', isDefault: false, updatedMinutesAgo: 14 * MINUTES_PER_DAY },
  { countryCode: 'GB', name: 'United Kingdom', nativeName: 'United Kingdom', iso2: 'GB', iso3: 'GBR', isoNumeric: '826', status: 'active', isDefault: false, updatedMinutesAgo: 440 * MINUTES_PER_DAY },
  { countryCode: 'AU', name: 'Australia', nativeName: 'Australia', iso2: 'AU', iso3: 'AUS', isoNumeric: '036', status: 'active', isDefault: false, updatedMinutesAgo: 25 },
  { countryCode: 'IN', name: 'India', nativeName: 'Bharat', iso2: 'IN', iso3: 'IND', isoNumeric: '356', status: 'active', isDefault: false, updatedMinutesAgo: 40 },
  { countryCode: 'BR', name: 'Brazil', nativeName: 'Brasil', iso2: 'BR', iso3: 'BRA', isoNumeric: '076', status: 'draft', isDefault: false, updatedMinutesAgo: 30 * 60 },
]

export function createMockCountries(): Country[] {
  const now = Date.now()

  return COUNTRY_SEED.map((seed, index) => ({
    id: `country-${index + 1}` as CountryId,
    countryCode: seed.countryCode,
    name: seed.name,
    nativeName: seed.nativeName,
    iso2: seed.iso2,
    iso3: seed.iso3,
    isoNumeric: seed.isoNumeric,
    status: seed.status,
    isDefault: seed.isDefault,
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
