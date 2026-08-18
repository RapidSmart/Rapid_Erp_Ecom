import type {
  CountryStatTone,
  CountryStatus,
  CountryTimeRange,
} from '../types/country.types'

export interface CountryStatTile {
  tone: CountryStatTone
  /** Status this tile filters the list by — `null` clears the filter. */
  status: CountryStatus | null
  labelKey: string
}

/** Order of the five donuts in the overview panel. */
export const COUNTRY_STAT_TILES: readonly CountryStatTile[] = [
  { tone: 'total', status: null, labelKey: 'country.overview.stats.total' },
  { tone: 'active', status: 'active', labelKey: 'country.overview.stats.active' },
  {
    tone: 'inactive',
    status: 'inactive',
    labelKey: 'country.overview.stats.inactive',
  },
  { tone: 'draft', status: 'draft', labelKey: 'country.overview.stats.draft' },
  { tone: 'delete', status: 'delete', labelKey: 'country.overview.stats.delete' },
]

export interface CountryRangeOption {
  value: CountryTimeRange
  labelKey: string
}

export const COUNTRY_TIME_RANGES: readonly CountryRangeOption[] = [
  { value: 'live', labelKey: 'country.overview.ranges.live' },
  { value: '6h', labelKey: 'country.overview.ranges.6h' },
  { value: '24h', labelKey: 'country.overview.ranges.24h' },
  { value: '7d', labelKey: 'country.overview.ranges.7d' },
  { value: '30d', labelKey: 'country.overview.ranges.30d' },
]

export const DEFAULT_COUNTRY_TIME_RANGE: CountryTimeRange = 'live'
