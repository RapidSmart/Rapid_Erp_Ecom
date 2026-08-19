import type { CategoryStatus } from '../types/category.types'

export interface CategoryStatusOption {
  value: CategoryStatus
  labelKey: string
}

export const CATEGORY_STATUS_OPTIONS: readonly CategoryStatusOption[] = [
  { value: 'active', labelKey: 'category.status.active' },
  { value: 'inactive', labelKey: 'category.status.inactive' },
  { value: 'draft', labelKey: 'category.status.draft' },
  { value: 'delete', labelKey: 'category.status.delete' },
]

export const DEFAULT_CATEGORY_STATUS: CategoryStatus = 'active'
