import type { DragEvent, ReactNode, InputHTMLAttributes, RefObject } from 'react'

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

export interface UseCountryFormOptions {
  id?: string
  initialValues?: Partial<CountryFormValues>
  isEditMode?: boolean
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

export interface UseFlagUploadAreaOptions {
  flagFile: File | null
  selectedFlag: string | null
  flagGallery: readonly FlagGalleryItem[]
}

export interface UseFlagUploadAreaReturn {
  fileRef: RefObject<HTMLInputElement | null>
  objectUrl: string | null
  selectedGalleryItem: FlagGalleryItem | null
  hasUploadedFile: boolean
  hasSelectedGalleryFlag: boolean
}

export interface CountryFormProps {
  mode: 'add' | 'edit'
  form: UseCountryFormReturn
}

export interface FlagChipProps {
  item: FlagGalleryItem
  selected: boolean
  onClick: () => void
}

export interface FlagUploadAreaProps {
  flagFile: File | null
  selectedFlag: string | null
  flagGallery: readonly FlagGalleryItem[]
  uploadText: string
  onUpload: (file: File) => void
  onClearFlag: () => void
  onDragOver: (e: DragEvent<HTMLDivElement | HTMLButtonElement>) => void
  onDrop: (e: DragEvent<HTMLDivElement | HTMLButtonElement>) => void
}

export interface FormFooterProps {
  filledCount: number
  totalCount: number
  filledText: string
  duplicateText: string
  printText: string
  clearText: string
  saveText: string
  onDuplicate: () => void
  onPrint: () => void
  onClear: () => void
  onSave: () => void
}

export interface PillInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  placeholder: string
  value: string
  type?: 'text' | 'tel'
  rightIcon?: ReactNode
  required?: boolean
  onChange: (value: string) => void
}

export interface PillSelectProps {
  id: string
  placeholder: string
  value: string
  options: readonly SelectOption[]
  required?: boolean
  onChange: (value: string) => void
  prefix?: ReactNode
}

export interface LanguageTranslationValues {
  arabic: string
  hindi: string
  urdu: string
  bangla: string
}

export interface LanguageDropdownProps {
  initialValues?: Partial<LanguageTranslationValues>
  onSave?: (translations: LanguageTranslationValues) => void
}
