import type { SubCategoryStatus } from '../types/sub-category.types'

export interface SubCategoryStatusOption {
  value: SubCategoryStatus
  labelKey: string
}

export const SUB_CATEGORY_STATUS_OPTIONS: readonly SubCategoryStatusOption[] = [
  { value: 'active', labelKey: 'subCategory.status.active' },
  { value: 'inactive', labelKey: 'subCategory.status.inactive' },
  { value: 'draft', labelKey: 'subCategory.status.draft' },
  { value: 'delete', labelKey: 'subCategory.status.delete' },
]

export const DEFAULT_SUB_CATEGORY_STATUS: SubCategoryStatus = 'active'
