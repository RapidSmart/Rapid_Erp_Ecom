import type { DragEvent, InputHTMLAttributes, ReactNode, RefObject } from 'react'
import type { LucideIcon } from 'lucide-react'

export type CommonStatus = 'active' | 'inactive' | 'draft' | 'delete'

export type TimeRange = 'live' | '6h' | '24h' | '7d' | '30d'

export type StatTone = 'total' | CommonStatus

export interface StatItem {
  value: number
  percentage: number
}

export type StatOverview = Record<StatTone, StatItem>

export interface CommonError {
  code: string
  message: string
  details?: unknown
}

export type AsyncState<TData> =
  | { status: 'loading' }
  | { status: 'error'; error: CommonError }
  | { status: 'ready'; data: TData }

export type ListingView = 'grid' | 'list'

export type PageSize = 10 | 25 | 50 | 75

export interface SelectOption {
  readonly value: string
  readonly label: string
}

export interface GalleryItem {
  readonly url?: string
  readonly label?: string
  readonly code?: string
  readonly flagGradient?: string
}

/* ==========================================================================
   Component Props Types
   ========================================================================== */

export interface PillInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  id: string
  placeholder: string
  value: string
  type?: 'text' | 'tel' | 'number' | 'email' | 'password'
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

export interface SectionHeaderProps {
  label: string
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

export interface ImageUploadAreaProps {
  imageFile?: File | null
  selectedImage?: string | null
  imageGallery?: readonly GalleryItem[]
  uploadText?: string
  onUpload: (file: File) => void
  onClearImage: () => void
  onDragOver?: (e: DragEvent<HTMLDivElement | HTMLButtonElement>) => void
  onDrop?: (e: DragEvent<HTMLDivElement | HTMLButtonElement>) => void
  className?: string
  ariaLabel?: string
}

export interface ImageChipProps {
  item: GalleryItem
  selected: boolean
  onClick: () => void
}

export interface OverviewRingProps {
  status: CommonStatus
  percentage: number
}

export interface OverviewRingIconProps {
  status: CommonStatus
  percentage: number
}

export interface StatDonutProps {
  tone: StatTone
  label: string
  value: number
  percentage: number
  selected?: boolean
  actionLabel?: string
  onSelect?: () => void
}

export interface OverviewCardProps {
  status: CommonStatus
  label: string
  value: number
  percentage: number
  selected?: boolean
  actionLabel?: string
  onSelect?: () => void
}

export interface RangeSwitchProps {
  range: TimeRange
  onRangeChange: (range: TimeRange) => void
  ariaLabel?: string
}

export interface PaginationProps {
  page: number
  pageCount: number
  pageSize: PageSize
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: PageSize) => void
  totalCount: number
}

export interface ViewToggleProps {
  view: ListingView
  onToggle: () => void
  ariaLabel?: string
}

export interface ListingHeaderProps {
  title: string
  subtitle?: string
  totalCount?: number
  search: string
  onSearchChange: (value: string) => void
  onToggleMenu: () => void
  view: ListingView
  onToggleView: () => void
  addHref: string
  addLabel: string
  searchPlaceholder?: string
  searchLabel?: string
  menuLabel?: string
}

export interface ListingFooterProps {
  poweredByText?: string
  brandText?: string
  helpText?: string
  chatText?: string
}

export interface FeedbackProps {
  icon?: LucideIcon
  tone?: 'muted' | 'danger'
  variant?: 'empty' | 'no-results' | 'error'
  title: string
  body: string
  actionLabel?: string
  onAction?: () => void
  bare?: boolean
}

export interface StatusBadgeProps {
  status: CommonStatus
  className?: string
  label?: string
}

export interface TableSkeletonProps {
  rowCount?: number
}

export interface DeleteConfirmDialogProps {
  open: boolean
  title?: string
  description: string
  confirmText?: string
  cancelText?: string
  deletingText?: string
  submitting?: boolean
  error?: CommonError | string | null
  onConfirm: () => Promise<void> | void
  onClose: () => void
}

export interface UseImageUploadOptions {
  imageFile?: File | null
  selectedImage?: string | null
  imageGallery?: readonly GalleryItem[]
}

export interface UseImageUploadReturn {
  fileRef: RefObject<HTMLInputElement | null>
  objectUrl: string | null
  selectedGalleryItem: GalleryItem | null
  hasUploadedFile: boolean
  hasSelectedGalleryImage: boolean
}
