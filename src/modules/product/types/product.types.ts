import type { DragEvent, ReactNode, InputHTMLAttributes, RefObject } from 'react'

export type ProductId = string & { readonly __brand: 'ProductId' }

export type ProductStatus = 'active' | 'inactive' | 'draft' | 'delete'

export interface Product {
  id: ProductId
  name: string
  sku: string
  price: number
  category: string
  status: ProductStatus
  stock: number
  imageUrl: string
  /** ISO-8601 timestamp of the last mutation. */
  updatedAt: string
}

/** Payload accepted by create / update / duplicate endpoints. */
export interface ProductPayload {
  name: string
  sku: string
  price: number
  category: string
  status: ProductStatus
  stock: number
  imageUrl: string
}

export interface ProductListQuery {
  search: string
  status: ProductStatus | null
}

/** Time window the overview aggregates are computed over. */
export type ProductTimeRange = 'live' | '6h' | '24h' | '7d' | '30d'

/** The overview has one tile per status plus an all-statuses total. */
export type ProductStatTone = 'total' | ProductStatus

export interface ProductStat {
  value: number
  percentage: number
}

export type ProductOverview = Record<ProductStatTone, ProductStat>

/** Normalised shape every failed request is mapped to at the service boundary. */
export interface ProductError {
  code: string
  message: string
  details?: unknown
}

export type AsyncState<TData> =
  | { status: 'loading' }
  | { status: 'error'; error: ProductError }
  | { status: 'ready'; data: TData }

export type ProductFormMode = 'create' | 'edit' | 'duplicate'

/** Presentation mode for the listing — toggled from the page header. */
export type ProductView = 'grid' | 'list'

export type ProductPageSize = 10 | 25 | 50 | 75

export type ProductDialog =
  | { kind: 'none' }
  | { kind: 'form'; mode: ProductFormMode; product?: Product }
  | { kind: 'delete'; product: Product }
  | { kind: 'details'; product: Product }

export interface ProductFormValues {
  sku: string
  name: string
  price: string
  category: string
  stock: string
  status: 'active' | 'inactive'
  featured: string
  imageFile: File | null
  selectedImage: string | null
  description: string
}

export interface SelectOption {
  readonly value: string
  readonly label: string
}

export interface ImageGalleryItem {
  readonly url: string
  readonly label: string
}

export interface UseProductPageFormOptions {
  id?: string
  initialValues?: Partial<ProductFormValues>
  isEditMode?: boolean
}

export interface UseProductPageFormReturn {
  values: ProductFormValues
  isLoading?: boolean
  filledRequiredCount: number
  totalRequiredCount: number
  imageGallery: readonly ImageGalleryItem[]
  categoryOptions: readonly SelectOption[]
  statusOptions: readonly SelectOption[]
  featuredOptions: readonly SelectOption[]
  handleFieldChange: <K extends keyof ProductFormValues>(
    field: K,
    value: ProductFormValues[K],
  ) => void
  handleImageUpload: (file: File) => void
  handleImageSelect: (url: string) => void
  handleDragOver: (e: DragEvent<HTMLElement>) => void
  handleDrop: (e: DragEvent<HTMLElement>) => void
  handleClear: () => void
  handleSave: () => void
  handleDuplicate: () => void
  handlePrint: () => void
}

export interface UseProductImageUploadOptions {
  imageFile: File | null
  selectedImage: string | null
  imageGallery: readonly ImageGalleryItem[]
}

export interface UseProductImageUploadReturn {
  fileRef: RefObject<HTMLInputElement | null>
  objectUrl: string | null
  selectedGalleryItem: ImageGalleryItem | null
  hasUploadedFile: boolean
  hasSelectedGalleryImage: boolean
}

export interface ProductPageFormProps {
  mode: 'add' | 'edit'
  form: UseProductPageFormReturn
}

export interface ProductImageChipProps {
  item: ImageGalleryItem
  selected: boolean
  onClick: () => void
}

export interface ProductImageUploadAreaProps {
  imageFile: File | null
  selectedImage: string | null
  imageGallery: readonly ImageGalleryItem[]
  uploadText: string
  onUpload: (file: File) => void
  onClearImage: () => void
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
  type?: 'text' | 'tel' | 'number'
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
