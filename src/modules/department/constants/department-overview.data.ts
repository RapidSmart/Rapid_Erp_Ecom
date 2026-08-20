import type {
  DepartmentStatTone,
  DepartmentStatus,
  DepartmentTimeRange,
} from '../types/department.types'

export interface DepartmentStatTile {
  tone: DepartmentStatTone
  status: DepartmentStatus | null
  labelKey: string
}

export const DEPARTMENT_STAT_TILES: readonly DepartmentStatTile[] = [
  { tone: 'total', status: null, labelKey: 'department.overview.stats.total' },
  { tone: 'active', status: 'active', labelKey: 'department.overview.stats.active' },
  { tone: 'inactive', status: 'inactive', labelKey: 'department.overview.stats.inactive' },
  { tone: 'draft', status: 'draft', labelKey: 'department.overview.stats.draft' },
  { tone: 'delete', status: 'delete', labelKey: 'department.overview.stats.delete' },
]

export interface DepartmentRangeOption {
  value: DepartmentTimeRange
  labelKey: string
}

export const DEPARTMENT_TIME_RANGES: readonly DepartmentRangeOption[] = [
  { value: 'live', labelKey: 'department.overview.ranges.live' },
  { value: '6h', labelKey: 'department.overview.ranges.6h' },
  { value: '24h', labelKey: 'department.overview.ranges.24h' },
  { value: '7d', labelKey: 'department.overview.ranges.7d' },
  { value: '30d', labelKey: 'department.overview.ranges.30d' },
]

export const DEFAULT_DEPARTMENT_TIME_RANGE: DepartmentTimeRange = 'live'
