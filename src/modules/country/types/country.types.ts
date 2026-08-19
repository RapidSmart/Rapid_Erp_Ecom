import type { DragEvent, ReactNode, InputHTMLAttributes, RefObject } from 'react'

export type CountryId = string & { readonly __brand: 'CountryId' }

export type CountryStatus = 'active' | 'inactive' | 'draft' | 'delete'

export interface Country {
  id: CountryId
  name: string
  iso2: string
  iso3: string
  /** ISO 4217 currency code, e.g. "USD". */
  currency: string
  /** E.164 calling code, e.g. "+1". */
  callingCode: string
  status: CountryStatus
  /** ISO-8601 timestamp of the last mutation. */
  updatedAt: string
}

/** Payload accepted by create / update / duplicate endpoints. */
export interface CountryPayload {
  name: string
  iso2: string
  iso3: string
  currency: string
  callingCode: string
  status: CountryStatus
}

export interface CountryListQuery {
  search: string
  status: CountryStatus | null
}

/** Time window the overview aggregates are computed over. */
export type CountryTimeRange = 'live' | '6h' | '24h' | '7d' | '30d'

/** The overview has one tile per status plus an all-statuses total. */
export type CountryStatTone = 'total' | CountryStatus

export interface CountryStat {
  value: number
  percentage: number
}

export type CountryOverview = Record<CountryStatTone, CountryStat>

/** Normalised shape every failed request is mapped to at the service boundary. */
export interface CountryError {
  code: string
  message: string
  details?: unknown
}

export type AsyncState<TData> =
  | { status: 'loading' }
  | { status: 'error'; error: CountryError }
  | { status: 'ready'; data: TData }

export type CountryFormMode = 'create' | 'edit' | 'duplicate'

/** Presentation mode for the listing — toggled from the page header. */
export type CountryView = 'grid' | 'list'

export type CountryPageSize = 10 | 25 | 50 | 75

export type CountryDialog =
  | { kind: 'none' }
  | { kind: 'form'; mode: CountryFormMode; country?: Country }
  | { kind: 'delete'; country: Country }
  | { kind: 'details'; country: Country }

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

export interface UseCountryPageFormOptions {
  id?: string
  initialValues?: Partial<CountryFormValues>
  isEditMode?: boolean
}

export interface UseCountryPageFormReturn {
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

export interface CountryPageFormProps {
  mode: 'add' | 'edit'
  form: UseCountryPageFormReturn
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

export interface PillInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
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
  currentLanguage?: string
  onSelectLanguage?: (lang: any) => void
}

