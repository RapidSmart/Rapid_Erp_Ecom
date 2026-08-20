export type IndustryId = string & { readonly __brand: 'IndustryId' }

export type IndustryStatus = 'active' | 'inactive' | 'draft' | 'delete'

export interface Industry {
  id: IndustryId
  code: string
  name: string
  description: string
  image?: string
  status: IndustryStatus
  updatedAt: string
}

export interface IndustryPayload {
  code: string
  name: string
  description: string
  image?: string
  status: IndustryStatus
}

export interface IndustryListQuery {
  search: string
  status: IndustryStatus | null
}

export type IndustryTimeRange = 'live' | '6h' | '24h' | '7d' | '30d'

export type IndustryStatTone = 'total' | IndustryStatus

export interface IndustryStat {
  value: number
  percentage: number
}

export type IndustryOverview = Record<IndustryStatTone, IndustryStat>

export interface IndustryError {
  code: string
  message: string
  details?: unknown
}

export type AsyncState<TData> =
  | { status: 'loading' }
  | { status: 'error'; error: IndustryError }
  | { status: 'ready'; data: TData }

export type IndustryFormMode = 'create' | 'edit' | 'duplicate'

export type IndustryView = 'grid' | 'list'

export type IndustryPageSize = 10 | 25 | 50 | 75

export type IndustryDialog =
  | { kind: 'none' }
  | { kind: 'delete'; industry: Industry }
  | { kind: 'details'; industry: Industry }
