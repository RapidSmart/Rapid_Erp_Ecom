import type {
  SubCategoryStatTone,
  SubCategoryStatus,
  SubCategoryTimeRange,
} from '../types/sub-category.types'

export interface SubCategoryStatTile {
  tone: SubCategoryStatTone
  status: SubCategoryStatus | null
  labelKey: string
}

export const SUB_CATEGORY_STAT_TILES: readonly SubCategoryStatTile[] = [
  { tone: 'total', status: null, labelKey: 'subCategory.overview.stats.total' },
  { tone: 'active', status: 'active', labelKey: 'subCategory.overview.stats.active' },
  { tone: 'inactive', status: 'inactive', labelKey: 'subCategory.overview.stats.inactive' },
  { tone: 'draft', status: 'draft', labelKey: 'subCategory.overview.stats.draft' },
  { tone: 'delete', status: 'delete', labelKey: 'subCategory.overview.stats.delete' },
]

export interface SubCategoryRangeOption {
  value: SubCategoryTimeRange
  labelKey: string
}

export const SUB_CATEGORY_TIME_RANGES: readonly SubCategoryRangeOption[] = [
  { value: 'live', labelKey: 'subCategory.overview.ranges.live' },
  { value: '6h', labelKey: 'subCategory.overview.ranges.6h' },
  { value: '24h', labelKey: 'subCategory.overview.ranges.24h' },
  { value: '7d', labelKey: 'subCategory.overview.ranges.7d' },
  { value: '30d', labelKey: 'subCategory.overview.ranges.30d' },
]

export const DEFAULT_SUB_CATEGORY_TIME_RANGE: SubCategoryTimeRange = 'live'
