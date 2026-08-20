import type { CommonStatus, StatTone, TimeRange } from '../types/common-data.types'

export interface StatTileConfig {
  tone: StatTone
  status: CommonStatus | null
  labelKey: string
}

export const STAT_TILES: readonly StatTileConfig[] = [
  { tone: 'total', status: null, labelKey: 'common.overview.stats.total' },
  { tone: 'active', status: 'active', labelKey: 'common.overview.stats.active' },
  { tone: 'inactive', status: 'inactive', labelKey: 'common.overview.stats.inactive' },
  { tone: 'draft', status: 'draft', labelKey: 'common.overview.stats.draft' },
  { tone: 'delete', status: 'delete', labelKey: 'common.overview.stats.delete' },
]

export interface RangeOption {
  value: TimeRange
  labelKey: string
}

export const TIME_RANGES: readonly RangeOption[] = [
  { value: 'live', labelKey: 'common.overview.ranges.live' },
  { value: '6h', labelKey: 'common.overview.ranges.6h' },
  { value: '24h', labelKey: 'common.overview.ranges.24h' },
  { value: '7d', labelKey: 'common.overview.ranges.7d' },
  { value: '30d', labelKey: 'common.overview.ranges.30d' },
]

export const DEFAULT_TIME_RANGE: TimeRange = 'live'
