export type BrandId = string & { readonly __brand: 'BrandId' }

export type BrandStatus = 'active' | 'inactive' | 'draft' | 'delete'

export interface Brand {
  id: BrandId
  code: string
  name: string
  description: string
  image?: string
  status: BrandStatus
  updatedAt: string
}

export interface BrandPayload {
  code: string
  name: string
  description: string
  image?: string
  status: BrandStatus
}

export interface BrandListQuery {
  search: string
  status: BrandStatus | null
}

export type BrandTimeRange = 'live' | '6h' | '24h' | '7d' | '30d'

export type BrandStatTone = 'total' | BrandStatus

export interface BrandStat {
  value: number
  percentage: number
}

export type BrandOverview = Record<BrandStatTone, BrandStat>

export interface BrandError {
  code: string
  message: string
  details?: unknown
}

export type AsyncState<TData> =
  | { status: 'loading' }
  | { status: 'error'; error: BrandError }
  | { status: 'ready'; data: TData }

export type BrandFormMode = 'create' | 'edit' | 'duplicate'

export type BrandView = 'grid' | 'list'

export type BrandPageSize = 10 | 25 | 50 | 75

export type BrandDialog =
  | { kind: 'none' }
  | { kind: 'delete'; brand: Brand }
  | { kind: 'details'; brand: Brand }
