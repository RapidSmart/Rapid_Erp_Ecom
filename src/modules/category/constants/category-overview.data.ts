import type {
  CategoryStatTone,
  CategoryStatus,
  CategoryTimeRange,
} from '../types/category.types'

export interface CategoryStatTile {
  tone: CategoryStatTone
  status: CategoryStatus | null
  labelKey: string
}

export const CATEGORY_STAT_TILES: readonly CategoryStatTile[] = [
  { tone: 'total', status: null, labelKey: 'category.overview.stats.total' },
  { tone: 'active', status: 'active', labelKey: 'category.overview.stats.active' },
  { tone: 'inactive', status: 'inactive', labelKey: 'category.overview.stats.inactive' },
  { tone: 'draft', status: 'draft', labelKey: 'category.overview.stats.draft' },
  { tone: 'delete', status: 'delete', labelKey: 'category.overview.stats.delete' },
]

export interface CategoryRangeOption {
  value: CategoryTimeRange
  labelKey: string
}

export const CATEGORY_TIME_RANGES: readonly CategoryRangeOption[] = [
  { value: 'live', labelKey: 'category.overview.ranges.live' },
  { value: '6h', labelKey: 'category.overview.ranges.6h' },
  { value: '24h', labelKey: 'category.overview.ranges.24h' },
  { value: '7d', labelKey: 'category.overview.ranges.7d' },
  { value: '30d', labelKey: 'category.overview.ranges.30d' },
]

export const DEFAULT_CATEGORY_TIME_RANGE: CategoryTimeRange = 'live'
