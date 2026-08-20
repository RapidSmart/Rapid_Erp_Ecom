import type { DragEvent, ReactNode, InputHTMLAttributes, RefObject, FormEvent } from 'react'
import type { LucideIcon } from 'lucide-react'

export type SubCategoryId = string & { readonly __brand: 'SubCategoryId' }

export type SubCategoryStatus = 'active' | 'inactive' | 'draft' | 'delete'

export interface SubCategory {
  code: SubCategoryId
  name: string
  description: string
  imageUrl: string
  status: SubCategoryStatus
  /** ISO-8601 timestamp of the last mutation. */
  updatedAt: string
}

/** Payload accepted by create / update / duplicate endpoints. */
export interface SubCategoryPayload {
  code: string
  name: string
  description: string
  imageUrl: string
  status: SubCategoryStatus
}

export interface SubCategoryListQuery {
  search: string
  status: SubCategoryStatus | null
}

/** Time window the overview aggregates are computed over. */
export type SubCategoryTimeRange = 'live' | '6h' | '24h' | '7d' | '30d'

/** The overview has one tile per status plus an all-statuses total. */
export type SubCategoryStatTone = 'total' | SubCategoryStatus

export interface SubCategoryStat {
  value: number
  percentage: number
}

export type SubCategoryOverview = Record<SubCategoryStatTone, SubCategoryStat>

/** Normalised shape every failed request is mapped to at the service boundary. */
export interface SubCategoryError {
  code: string
  message: string
  details?: unknown
}

export type AsyncState<TData> =
  | { status: 'loading' }
  | { status: 'error'; error: SubCategoryError }
  | { status: 'ready'; data: TData }

export type SubCategoryFormMode = 'create' | 'edit' | 'duplicate'

/** Presentation mode for the listing — toggled from the page header. */
export type SubCategoryView = 'grid' | 'list'

export type SubCategoryPageSize = 10 | 25 | 50 | 75

export type SubCategoryDialog =
  | { kind: 'none' }
  | { kind: 'form'; mode: SubCategoryFormMode; subCategory?: SubCategory }
  | { kind: 'delete'; subCategory: SubCategory }
  | { kind: 'details'; subCategory: SubCategory }

export interface SubCategoryFormValues {
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

export interface UseSubCategoryPageFormOptions {
  code?: string
  initialValues?: Partial<SubCategoryFormValues>
  isEditMode?: boolean
}

export interface UseSubCategoryPageFormReturn {
  values: SubCategoryFormValues
  isLoading?: boolean
  filledRequiredCount: number
  totalRequiredCount: number
  imageGallery: readonly ImageGalleryItem[]
  statusOptions: readonly SelectOption[]
  handleFieldChange: <K extends keyof SubCategoryFormValues>(
    field: K,
    value: SubCategoryFormValues[K],
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

export interface UseSubCategoryImageUploadOptions {
  imageFile: File | null
  selectedImage: string | null
  imageGallery: readonly ImageGalleryItem[]
}

export interface UseSubCategoryImageUploadReturn {
  fileRef: RefObject<HTMLInputElement | null>
  objectUrl: string | null
  selectedGalleryItem: ImageGalleryItem | null
  hasUploadedFile: boolean
  hasSelectedGalleryImage: boolean
}

export interface SubCategoryPageFormProps {
  mode: 'add' | 'edit'
  form: UseSubCategoryPageFormReturn
}

export interface SubCategoryImageChipProps {
  item: ImageGalleryItem
  selected: boolean
  onClick: () => void
}

export interface SubCategoryImageUploadAreaProps {
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

export type SubCategoryFormField = 'name' | 'code' | 'description'

export type SubCategoryFormErrors = Partial<Record<SubCategoryFormField, string>>

export interface UseSubCategoryFormOptions {
  mode: SubCategoryFormMode
  subCategory?: SubCategory
  onSubmit: (payload: SubCategoryPayload) => Promise<SubCategoryError | null>
  onSuccess: () => void
}

export interface SubCategoryFormController {
  values: SubCategoryPayload
  errors: SubCategoryFormErrors
  /** Non field-specific failure returned by the service. */
  formError: string | null
  setText: (field: SubCategoryFormField, value: string) => void
  setStatus: (status: SubCategoryStatus) => void
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export interface SubCategoryCardProps {
  subCategory: SubCategory
  onOpenDetails: (subCategory: SubCategory) => void
  onEdit: (subCategory: SubCategory) => void
  onDuplicate: (subCategory: SubCategory) => void
  onDelete: (subCategory: SubCategory) => void
}

export interface SubCategoryDetailsDialogProps {
  subCategory: SubCategory
  onEdit: (subCategory: SubCategory) => void
  onDuplicate: (subCategory: SubCategory) => void
  onDelete: (subCategory: SubCategory) => void
  onClose: () => void
}

export interface SubCategoryGridProps {
  state: AsyncState<SubCategory[]>
  isRefreshing: boolean
  isFiltered: boolean
  onRetry: () => void
  onClearFilters: () => void
  onAdd: () => void
  onOpenDetails: (subCategory: SubCategory) => void
  onEdit: (subCategory: SubCategory) => void
  onDuplicate: (subCategory: SubCategory) => void
  onDelete: (subCategory: SubCategory) => void
}

export interface SubCategoryImageProps {
  imageUrl?: string
  name: string
  className?: string
}

export interface SubCategoryListingHeaderProps {
  search: string
  onSearchChange: (value: string) => void
  onToggleMenu: () => void
  totalCount: number
  view: SubCategoryView
  onToggleView: () => void
}

export interface SubCategoryOverviewCardProps {
  status: SubCategoryStatus
  label: string
  value: number
  percentage: number
  selected?: boolean
  actionLabel?: string
  onSelect?: () => void
}

export interface SubCategoryOverviewPanelProps {
  overviewState: AsyncState<SubCategoryOverview>
  range: SubCategoryTimeRange
  onRangeChange: (range: SubCategoryTimeRange) => void
  activeStatus: SubCategoryStatus | null
  onStatusChange: (status: SubCategoryStatus | null) => void
  onRetry: () => void
}

export interface SubCategoryPaginationProps {
  page: number
  pageCount: number
  pageSize: SubCategoryPageSize
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: SubCategoryPageSize) => void
  totalCount: number
}

export interface SubCategoryRangeSwitchProps {
  range: SubCategoryTimeRange
  onRangeChange: (range: SubCategoryTimeRange) => void
}

export interface SubCategoryStatDonutProps {
  tone: SubCategoryStatTone
  label: string
  value: number
  percentage: number
  selected?: boolean
  actionLabel?: string
  onSelect?: () => void
}

export interface SubCategoryStatusBadgeProps {
  status: SubCategoryStatus
  className?: string
}

export interface SubCategoryStatusOverviewProps {
  overviewState: AsyncState<SubCategoryOverview>
  range: SubCategoryTimeRange
  onRangeChange: (range: SubCategoryTimeRange) => void
  activeStatus: SubCategoryStatus | null
  onStatusChange: (status: SubCategoryStatus | null) => void
  onRetry: () => void
}

export interface SubCategoryTableProps {
  state: AsyncState<SubCategory[]>
  isRefreshing: boolean
  isFiltered: boolean
  page: number
  pageCount: number
  pageSize: SubCategoryPageSize
  totalCount: number
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: SubCategoryPageSize) => void
  onRetry: () => void
  onClearFilters: () => void
  onAdd: () => void
  onOpenDetails: (subCategory: SubCategory) => void
}

export interface SubCategoryTableRowProps {
  subCategory: SubCategory
  selected: boolean
  onToggleSelected: (subCategory: SubCategory, checked: boolean) => void
  onOpenDetails: (subCategory: SubCategory) => void
}

export interface SubCategoryViewToggleProps {
  view: SubCategoryView
  onChange: (view: SubCategoryView) => void
}

export interface SubCategoryDeleteDialogProps {
  subCategory: SubCategory
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => Promise<void> | void
}

export interface SubCategoryFeedbackProps {
  variant: 'empty' | 'no-results' | 'error'
  isRefreshing?: boolean
  title: string
  body: string
  actionLabel?: string
  actionIcon?: LucideIcon
  onAction?: () => void
}
