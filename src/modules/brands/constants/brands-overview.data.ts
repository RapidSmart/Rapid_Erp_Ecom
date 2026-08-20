import type { BrandStatTone, BrandStatus, BrandTimeRange } from '../types/brands.types'

export interface BrandStatTile {
  tone: BrandStatTone
  status: BrandStatus | null
  labelKey: string
}

export const BRANDS_STAT_TILES: readonly BrandStatTile[] = [
  { tone: 'total', status: null, labelKey: 'brands.overview.stats.total' },
  { tone: 'active', status: 'active', labelKey: 'brands.overview.stats.active' },
  { tone: 'inactive', status: 'inactive', labelKey: 'brands.overview.stats.inactive' },
  { tone: 'draft', status: 'draft', labelKey: 'brands.overview.stats.draft' },
  { tone: 'delete', status: 'delete', labelKey: 'brands.overview.stats.delete' },
]

export interface BrandRangeOption {
  value: BrandTimeRange
  labelKey: string
}

export const BRAND_TIME_RANGES: readonly BrandRangeOption[] = [
  { value: 'live', labelKey: 'brands.overview.ranges.live' },
  { value: '6h', labelKey: 'brands.overview.ranges.6h' },
  { value: '24h', labelKey: 'brands.overview.ranges.24h' },
  { value: '7d', labelKey: 'brands.overview.ranges.7d' },
  { value: '30d', labelKey: 'brands.overview.ranges.30d' },
]

export const DEFAULT_BRAND_TIME_RANGE: BrandTimeRange = 'live'
