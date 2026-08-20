import type { DragEvent, ReactNode, InputHTMLAttributes, RefObject, FormEvent } from 'react'
import type { LucideIcon } from 'lucide-react'

export type DepartmentId = string & { readonly __brand: 'DepartmentId' }

export type DepartmentStatus = 'active' | 'inactive' | 'draft' | 'delete'

export interface Department {
  code: DepartmentId
  name: string
  description: string
  imageUrl: string
  status: DepartmentStatus
  /** ISO-8601 timestamp of the last mutation. */
  updatedAt: string
}

/** Payload accepted by create / update / duplicate endpoints. */
export interface DepartmentPayload {
  code: string
  name: string
  description: string
  imageUrl: string
  status: DepartmentStatus
}

export interface DepartmentListQuery {
  search: string
  status: DepartmentStatus | null
}

/** Time window the overview aggregates are computed over. */
export type DepartmentTimeRange = 'live' | '6h' | '24h' | '7d' | '30d'

/** The overview has one tile per status plus an all-statuses total. */
export type DepartmentStatTone = 'total' | DepartmentStatus

export interface DepartmentStat {
  value: number
  percentage: number
}

export type DepartmentOverview = Record<DepartmentStatTone, DepartmentStat>

/** Normalised shape every failed request is mapped to at the service boundary. */
export interface DepartmentError {
  code: string
  message: string
  details?: unknown
}

export type AsyncState<TData> =
  | { status: 'loading' }
  | { status: 'error'; error: DepartmentError }
  | { status: 'ready'; data: TData }

export type DepartmentFormMode = 'create' | 'edit' | 'duplicate'

/** Presentation mode for the listing — toggled from the page header. */
export type DepartmentView = 'grid' | 'list'

export type DepartmentPageSize = 10 | 25 | 50 | 75

export type DepartmentDialog =
  | { kind: 'none' }
  | { kind: 'form'; mode: DepartmentFormMode; department?: Department }
  | { kind: 'delete'; department: Department }
  | { kind: 'details'; department: Department }

export interface DepartmentFormValues {
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

export interface UseDepartmentPageFormOptions {
  code?: string
  initialValues?: Partial<DepartmentFormValues>
  isEditMode?: boolean
}

export interface UseDepartmentPageFormReturn {
  values: DepartmentFormValues
  isLoading?: boolean
  filledRequiredCount: number
  totalRequiredCount: number
  imageGallery: readonly ImageGalleryItem[]
  statusOptions: readonly SelectOption[]
  handleFieldChange: <K extends keyof DepartmentFormValues>(
    field: K,
    value: DepartmentFormValues[K],
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

export interface UseDepartmentImageUploadOptions {
  imageFile: File | null
  selectedImage: string | null
  imageGallery: readonly ImageGalleryItem[]
}

export interface UseDepartmentImageUploadReturn {
  fileRef: RefObject<HTMLInputElement | null>
  objectUrl: string | null
  selectedGalleryItem: ImageGalleryItem | null
  hasUploadedFile: boolean
  hasSelectedGalleryImage: boolean
}

export interface DepartmentPageFormProps {
  mode: 'add' | 'edit'
  form: UseDepartmentPageFormReturn
}

export interface DepartmentImageChipProps {
  item: ImageGalleryItem
  selected: boolean
  onClick: () => void
}

export interface DepartmentImageUploadAreaProps {
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

export type DepartmentFormField = 'name' | 'code' | 'description'

export type DepartmentFormErrors = Partial<Record<DepartmentFormField, string>>

export interface UseDepartmentFormOptions {
  mode: DepartmentFormMode
  department?: Department
  onSubmit: (payload: DepartmentPayload) => Promise<DepartmentError | null>
  onSuccess: () => void
}

export interface DepartmentFormController {
  values: DepartmentPayload
  errors: DepartmentFormErrors
  /** Non field-specific failure returned by the service. */
  formError: string | null
  setText: (field: DepartmentFormField, value: string) => void
  setStatus: (status: DepartmentStatus) => void
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export interface DepartmentCardProps {
  department: Department
  onOpenDetails: (department: Department) => void
  onEdit: (department: Department) => void
  onDuplicate: (department: Department) => void
  onDelete: (department: Department) => void
}

export interface DepartmentDetailsDialogProps {
  department: Department
  onEdit: (department: Department) => void
  onDuplicate: (department: Department) => void
  onDelete: (department: Department) => void
  onClose: () => void
}

export interface DepartmentGridProps {
  state: AsyncState<Department[]>
  isRefreshing: boolean
  isFiltered: boolean
  onRetry: () => void
  onClearFilters: () => void
  onAdd: () => void
  onOpenDetails: (department: Department) => void
  onEdit: (department: Department) => void
  onDuplicate: (department: Department) => void
  onDelete: (department: Department) => void
}

export interface DepartmentImageProps {
  imageUrl?: string
  name: string
  className?: string
}

export interface DepartmentListingHeaderProps {
  search: string
  onSearchChange: (value: string) => void
  onToggleMenu: () => void
  totalCount: number
  view: DepartmentView
  onToggleView: () => void
}

export interface DepartmentOverviewCardProps {
  status: DepartmentStatus
  label: string
  value: number
  percentage: number
  selected?: boolean
  actionLabel?: string
  onSelect?: () => void
}

export interface DepartmentOverviewPanelProps {
  overviewState: AsyncState<DepartmentOverview>
  range: DepartmentTimeRange
  onRangeChange: (range: DepartmentTimeRange) => void
  activeStatus: DepartmentStatus | null
  onStatusChange: (status: DepartmentStatus | null) => void
  onRetry: () => void
}

export interface DepartmentPaginationProps {
  page: number
  pageCount: number
  pageSize: DepartmentPageSize
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: DepartmentPageSize) => void
  totalCount: number
}

export interface DepartmentRangeSwitchProps {
  range: DepartmentTimeRange
  onRangeChange: (range: DepartmentTimeRange) => void
}

export interface DepartmentStatDonutProps {
  tone: DepartmentStatTone
  label: string
  value: number
  percentage: number
  selected?: boolean
  actionLabel?: string
  onSelect?: () => void
}

export interface DepartmentStatusBadgeProps {
  status: DepartmentStatus
  className?: string
}

export interface DepartmentStatusOverviewProps {
  overviewState: AsyncState<DepartmentOverview>
  range: DepartmentTimeRange
  onRangeChange: (range: DepartmentTimeRange) => void
  activeStatus: DepartmentStatus | null
  onStatusChange: (status: DepartmentStatus | null) => void
  onRetry: () => void
}

export interface DepartmentTableProps {
  state: AsyncState<Department[]>
  isRefreshing: boolean
  isFiltered: boolean
  page: number
  pageCount: number
  pageSize: DepartmentPageSize
  totalCount: number
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: DepartmentPageSize) => void
  onRetry: () => void
  onClearFilters: () => void
  onAdd: () => void
  onOpenDetails: (department: Department) => void
}

export interface DepartmentTableRowProps {
  department: Department
  selected: boolean
  onToggleSelected: (department: Department, checked: boolean) => void
  onOpenDetails: (department: Department) => void
}

export interface DepartmentViewToggleProps {
  view: DepartmentView
  onChange: (view: DepartmentView) => void
}

export interface DepartmentDeleteDialogProps {
  department: Department
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => Promise<void> | void
}

export interface DepartmentFeedbackProps {
  variant: 'empty' | 'no-results' | 'error'
  isRefreshing?: boolean
  title: string
  body: string
  actionLabel?: string
  actionIcon?: LucideIcon
  onAction?: () => void
}
