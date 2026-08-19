import type {
  ProductStatTone,
  ProductStatus,
  ProductTimeRange,
} from '../types/product.types'

export interface ProductStatTile {
  tone: ProductStatTone
  status: ProductStatus | null
  labelKey: string
}

export const PRODUCT_STAT_TILES: readonly ProductStatTile[] = [
  { tone: 'total', status: null, labelKey: 'product.overview.stats.total' },
  { tone: 'active', status: 'active', labelKey: 'product.overview.stats.active' },
  { tone: 'inactive', status: 'inactive', labelKey: 'product.overview.stats.inactive' },
  { tone: 'draft', status: 'draft', labelKey: 'product.overview.stats.draft' },
  { tone: 'delete', status: 'delete', labelKey: 'product.overview.stats.delete' },
]

export interface ProductRangeOption {
  value: ProductTimeRange
  labelKey: string
}

export const PRODUCT_TIME_RANGES: readonly ProductRangeOption[] = [
  { value: 'live', labelKey: 'product.overview.ranges.live' },
  { value: '6h', labelKey: 'product.overview.ranges.6h' },
  { value: '24h', labelKey: 'product.overview.ranges.24h' },
  { value: '7d', labelKey: 'product.overview.ranges.7d' },
  { value: '30d', labelKey: 'product.overview.ranges.30d' },
]

export const DEFAULT_PRODUCT_TIME_RANGE: ProductTimeRange = 'live'
