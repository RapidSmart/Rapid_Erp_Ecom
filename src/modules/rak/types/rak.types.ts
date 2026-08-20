export type RakId = string & { readonly __rak: 'RakId' }

export type RakStatus = 'active' | 'inactive' | 'draft' | 'delete'

export interface Rak {
  id: RakId
  code: string
  name: string
  description: string
  image?: string
  status: RakStatus
  updatedAt: string
}

export interface RakPayload {
  code: string
  name: string
  description: string
  image?: string
  status: RakStatus
}

export interface RakListQuery {
  search: string
  status: RakStatus | null
}

export type RakTimeRange = 'live' | '6h' | '24h' | '7d' | '30d'

export type RakStatTone = 'total' | RakStatus

export interface RakStat {
  value: number
  percentage: number
}

export type RakOverview = Record<RakStatTone, RakStat>

export interface RakError {
  code: string
  message: string
  details?: unknown
}

export type AsyncState<TData> =
  | { status: 'loading' }
  | { status: 'error'; error: RakError }
  | { status: 'ready'; data: TData }

export type RakFormMode = 'create' | 'edit' | 'duplicate'

export type RakView = 'grid' | 'list'

export type RakPageSize = 10 | 25 | 50 | 75

export type RakDialog =
  | { kind: 'none' }
  | { kind: 'delete'; rak: Rak }
  | { kind: 'details'; rak: Rak }
