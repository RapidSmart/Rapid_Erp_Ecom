import type { CountryStatus } from '../types/country.types'

export interface CountryStatusOption {
  value: CountryStatus
  labelKey: string
}

export const COUNTRY_STATUS_OPTIONS: readonly CountryStatusOption[] = [
  { value: 'active', labelKey: 'country.status.active' },
  { value: 'inactive', labelKey: 'country.status.inactive' },
  { value: 'draft', labelKey: 'country.status.draft' },
  { value: 'delete', labelKey: 'country.status.delete' },
]

export const DEFAULT_COUNTRY_STATUS: CountryStatus = 'active'
