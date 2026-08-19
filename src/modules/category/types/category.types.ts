import type { DragEvent, ReactNode, InputHTMLAttributes, RefObject, FormEvent } from 'react'
import type { LucideIcon } from 'lucide-react'

export type CategoryId = string & { readonly __brand: 'CategoryId' }

export type CategoryStatus = 'active' | 'inactive' | 'draft' | 'delete'

export interface Category {
  code: CategoryId
  name: string
  description: string
  imageUrl: string
  status: CategoryStatus
  /** ISO-8601 timestamp of the last mutation. */
  updatedAt: string
}

/** Payload accepted by create / update / duplicate endpoints. */
export interface CategoryPayload {
  code: string
  name: string
  description: string
  imageUrl: string
  status: CategoryStatus
}

export interface CategoryListQuery {
  search: string
  status: CategoryStatus | null
}

/** Time window the overview aggregates are computed over. */
export type CategoryTimeRange = 'live' | '6h' | '24h' | '7d' | '30d'

/** The overview has one tile per status plus an all-statuses total. */
export type CategoryStatTone = 'total' | CategoryStatus

export interface CategoryStat {
  value: number
  percentage: number
}

export type CategoryOverview = Record<CategoryStatTone, CategoryStat>

/** Normalised shape every failed request is mapped to at the service boundary. */
export interface CategoryError {
  code: string
  message: string
  details?: unknown
}

export type AsyncState<TData> =
  | { status: 'loading' }
  | { status: 'error'; error: CategoryError }
  | { status: 'ready'; data: TData }

export type CategoryFormMode = 'create' | 'edit' | 'duplicate'

/** Presentation mode for the listing — toggled from the page header. */
export type CategoryView = 'grid' | 'list'

export type CategoryPageSize = 10 | 25 | 50 | 75

export type CategoryDialog =
  | { kind: 'none' }
  | { kind: 'form'; mode: CategoryFormMode; category?: Category }
  | { kind: 'delete'; category: Category }
  | { kind: 'details'; category: Category }

export interface CategoryFormValues {
  code: string
  name: string
  description: string
  status: 'active' | 'inactive'
  imageFile: File | null
  selectedImage: string | null
}

export interface SelectOption {
  readonly value: string
  readonly label: string
}

export interface ImageGalleryItem {
  readonly url: string
  readonly label: string
}

export interface UseCategoryPageFormOptions {
  code?: string
  initialValues?: Partial<CategoryFormValues>
  isEditMode?: boolean
}

export interface UseCategoryPageFormReturn {
  values: CategoryFormValues
  isLoading?: boolean
  filledRequiredCount: number
  totalRequiredCount: number
  imageGallery: readonly ImageGalleryItem[]
  statusOptions: readonly SelectOption[]
  handleFieldChange: <K extends keyof CategoryFormValues>(
    field: K,
    value: CategoryFormValues[K],
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

export interface UseCategoryImageUploadOptions {
  imageFile: File | null
  selectedImage: string | null
  imageGallery: readonly ImageGalleryItem[]
}

export interface UseCategoryImageUploadReturn {
  fileRef: RefObject<HTMLInputElement | null>
  objectUrl: string | null
  selectedGalleryItem: ImageGalleryItem | null
  hasUploadedFile: boolean
  hasSelectedGalleryImage: boolean
}

export interface CategoryPageFormProps {
  mode: 'add' | 'edit'
  form: UseCategoryPageFormReturn
}

export interface CategoryImageChipProps {
  item: ImageGalleryItem
  selected: boolean
  onClick: () => void
}

export interface CategoryImageUploadAreaProps {
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

export type CategoryFormField = 'name' | 'code' | 'description'

export type CategoryFormErrors = Partial<Record<CategoryFormField, string>>

export interface UseCategoryFormOptions {
  mode: CategoryFormMode
  category?: Category
  onSubmit: (payload: CategoryPayload) => Promise<CategoryError | null>
  onSuccess: () => void
}

export interface CategoryFormController {
  values: CategoryPayload
  errors: CategoryFormErrors
  /** Non field-specific failure returned by the service. */
  formError: string | null
  setText: (field: CategoryFormField, value: string) => void
  setStatus: (status: CategoryStatus) => void
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export interface CategoryCardProps {
  category: Category
  onOpenDetails: (category: Category) => void
  onEdit: (category: Category) => void
  onDuplicate: (category: Category) => void
  onDelete: (category: Category) => void
}

export interface CategoryDetailsDialogProps {
  category: Category
  onEdit: (category: Category) => void
  onDuplicate: (category: Category) => void
  onDelete: (category: Category) => void
  onClose: () => void
}

export interface CategoryGridProps {
  state: AsyncState<Category[]>
  isRefreshing: boolean
  isFiltered: boolean
  onRetry: () => void
  onClearFilters: () => void
  onAdd: () => void
  onOpenDetails: (category: Category) => void
  onEdit: (category: Category) => void
  onDuplicate: (category: Category) => void
  onDelete: (category: Category) => void
}

export interface CategoryImageProps {
  imageUrl?: string
  name: string
  className?: string
}

export interface CategoryListingHeaderProps {
  search: string
  onSearchChange: (value: string) => void
  onToggleMenu: () => void
  totalCount: number
  view: CategoryView
  onToggleView: () => void
}

export interface CategoryOverviewCardProps {
  status: CategoryStatus
  label: string
  value: number
  percentage: number
  selected?: boolean
  actionLabel?: string
  onSelect?: () => void
}

export interface CategoryOverviewPanelProps {
  state: AsyncState<CategoryOverview>
  range: CategoryTimeRange
  onRangeChange: (range: CategoryTimeRange) => void
  statusFilter: CategoryStatus | null
  onStatusFilterChange: (status: CategoryStatus | null) => void
  onRetry: () => void
}

export interface CategoryPaginationProps {
  page: number
  pageCount: number
  pageSize: CategoryPageSize
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: CategoryPageSize) => void
  totalCount: number
}

export interface CategoryStatDonutProps {
  tone: CategoryStatTone
  label: string
  value: number
  percentage: number
  selected?: boolean
  actionLabel?: string
  onSelect?: () => void
}

export interface CategoryStatusBadgeProps {
  status: CategoryStatus
  className?: string
}

export interface CategoryTableProps {
  state: AsyncState<Category[]>
  isRefreshing: boolean
  isFiltered: boolean
  page: number
  pageCount: number
  pageSize: CategoryPageSize
  totalCount: number
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: CategoryPageSize) => void
  onRetry: () => void
  onClearFilters: () => void
  onAdd: () => void
  onOpenDetails: (category: Category) => void
}

export interface CategoryTableRowProps {
  category: Category
  selected: boolean
  onToggleSelected: (category: Category, selected: boolean) => void
  onOpenDetails: (category: Category) => void
}

export interface CategoryFeedbackProps {
  icon: LucideIcon
  tone?: 'muted' | 'danger'
  title: string
  body: string
  actionLabel?: string
  onAction?: () => void
  /** Skip the card border/background when already nested inside one. */
  bare?: boolean
}

