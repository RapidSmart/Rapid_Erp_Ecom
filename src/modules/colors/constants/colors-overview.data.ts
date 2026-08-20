import type { ColorStatTone, ColorStatus, ColorTimeRange } from '../types/colors.types'

export interface ColorStatTile {
  tone: ColorStatTone
  status: ColorStatus | null
  labelKey: string
}

export const COLORS_STAT_TILES: readonly ColorStatTile[] = [
  { tone: 'total', status: null, labelKey: 'colors.overview.stats.total' },
  { tone: 'active', status: 'active', labelKey: 'colors.overview.stats.active' },
  { tone: 'inactive', status: 'inactive', labelKey: 'colors.overview.stats.inactive' },
  { tone: 'draft', status: 'draft', labelKey: 'colors.overview.stats.draft' },
  { tone: 'delete', status: 'delete', labelKey: 'colors.overview.stats.delete' },
]

export interface ColorRangeOption {
  value: ColorTimeRange
  labelKey: string
}

export const COLOR_TIME_RANGES: readonly ColorRangeOption[] = [
  { value: 'live', labelKey: 'colors.overview.ranges.live' },
  { value: '6h', labelKey: 'colors.overview.ranges.6h' },
  { value: '24h', labelKey: 'colors.overview.ranges.24h' },
  { value: '7d', labelKey: 'colors.overview.ranges.7d' },
  { value: '30d', labelKey: 'colors.overview.ranges.30d' },
]

export const DEFAULT_COLOR_TIME_RANGE: ColorTimeRange = 'live'
