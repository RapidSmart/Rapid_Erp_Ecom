import type { CommonStatus, SelectOption } from '../types/common-data.types'

export interface StatusOption {
  value: CommonStatus
  labelKey: string
}

export const STATUS_OPTIONS: readonly StatusOption[] = [
  { value: 'active', labelKey: 'common.status.active' },
  { value: 'inactive', labelKey: 'common.status.inactive' },
  { value: 'draft', labelKey: 'common.status.draft' },
  { value: 'delete', labelKey: 'common.status.delete' },
]

export const FORM_STATUS_OPTIONS: readonly SelectOption[] = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
]

export const DEFAULT_STATUS: CommonStatus = 'active'
