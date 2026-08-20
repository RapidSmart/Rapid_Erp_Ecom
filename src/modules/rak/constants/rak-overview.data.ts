import type { RakStatTone, RakStatus, RakTimeRange } from '../types/rak.types'

export interface RakStatTile {
  tone: RakStatTone
  status: RakStatus | null
  labelKey: string
}

export const RAK_STAT_TILES: readonly RakStatTile[] = [
  { tone: 'total', status: null, labelKey: 'rak.overview.stats.total' },
  { tone: 'active', status: 'active', labelKey: 'rak.overview.stats.active' },
  { tone: 'inactive', status: 'inactive', labelKey: 'rak.overview.stats.inactive' },
  { tone: 'draft', status: 'draft', labelKey: 'rak.overview.stats.draft' },
  { tone: 'delete', status: 'delete', labelKey: 'rak.overview.stats.delete' },
]

export interface RakRangeOption {
  value: RakTimeRange
  labelKey: string
}

export const RAK_TIME_RANGES: readonly RakRangeOption[] = [
  { value: 'live', labelKey: 'rak.overview.ranges.live' },
  { value: '6h', labelKey: 'rak.overview.ranges.6h' },
  { value: '24h', labelKey: 'rak.overview.ranges.24h' },
  { value: '7d', labelKey: 'rak.overview.ranges.7d' },
  { value: '30d', labelKey: 'rak.overview.ranges.30d' },
]

export const DEFAULT_RAK_TIME_RANGE: RakTimeRange = 'live'
