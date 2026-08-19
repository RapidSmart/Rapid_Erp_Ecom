import type { IndustryStatTone, IndustryStatus, IndustryTimeRange } from '../types/industries.types'

export interface IndustryStatTile {
  tone: IndustryStatTone
  status: IndustryStatus | null
  labelKey: string
}

export const INDUSTRIES_STAT_TILES: readonly IndustryStatTile[] = [
  { tone: 'total', status: null, labelKey: 'industries.overview.stats.total' },
  { tone: 'active', status: 'active', labelKey: 'industries.overview.stats.active' },
  { tone: 'inactive', status: 'inactive', labelKey: 'industries.overview.stats.inactive' },
  { tone: 'draft', status: 'draft', labelKey: 'industries.overview.stats.draft' },
  { tone: 'delete', status: 'delete', labelKey: 'industries.overview.stats.delete' },
]

export interface IndustryRangeOption {
  value: IndustryTimeRange
  labelKey: string
}

export const INDUSTRY_TIME_RANGES: readonly IndustryRangeOption[] = [
  { value: 'live', labelKey: 'industries.overview.ranges.live' },
  { value: '6h', labelKey: 'industries.overview.ranges.6h' },
  { value: '24h', labelKey: 'industries.overview.ranges.24h' },
  { value: '7d', labelKey: 'industries.overview.ranges.7d' },
  { value: '30d', labelKey: 'industries.overview.ranges.30d' },
]

export const DEFAULT_INDUSTRY_TIME_RANGE: IndustryTimeRange = 'live'
