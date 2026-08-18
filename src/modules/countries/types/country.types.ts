import type { DragEvent } from 'react'

export interface CountryFormValues {
  isoCode: string
  countryName: string
  diallingCode: string
  continent: string
  currency: string
  status: 'active' | 'inactive'
  defaultCountry: string
  flagFile: File | null
  selectedFlag: string | null
  internalNote: string
}

export interface SelectOption {
  readonly value: string
  readonly label: string
}

export interface FlagGalleryItem {
  readonly code: string
  readonly flagGradient: string
}

export interface UseCountryFormReturn {
  values: CountryFormValues
  isLoading?: boolean
  filledRequiredCount: number
  totalRequiredCount: number
  flagGallery: readonly FlagGalleryItem[]
  continentOptions: readonly SelectOption[]
  currencyOptions: readonly SelectOption[]
  statusOptions: readonly SelectOption[]
  defaultCountryOptions: readonly SelectOption[]
  handleFieldChange: <K extends keyof CountryFormValues>(
    field: K,
    value: CountryFormValues[K],
  ) => void
  handleFlagUpload: (file: File) => void
  handleFlagSelect: (code: string) => void
  handleDragOver: (e: DragEvent<HTMLElement>) => void
  handleDrop: (e: DragEvent<HTMLElement>) => void
  handleClear: () => void
  handleSave: () => void
  handleDuplicate: () => void
  handlePrint: () => void
}
