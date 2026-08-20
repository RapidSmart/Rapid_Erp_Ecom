export type ColorId = string & { readonly __color: 'ColorId' }

export type ColorStatus = 'active' | 'inactive' | 'draft' | 'delete'

export interface Color {
  id: ColorId
  code: string
  name: string
  description: string
  image?: string
  status: ColorStatus
  updatedAt: string
}

export interface ColorPayload {
  code: string
  name: string
  description: string
  image?: string
  status: ColorStatus
}

export interface ColorListQuery {
  search: string
  status: ColorStatus | null
}

export type ColorTimeRange = 'live' | '6h' | '24h' | '7d' | '30d'

export type ColorStatTone = 'total' | ColorStatus

export interface ColorStat {
  value: number
  percentage: number
}

export type ColorOverview = Record<ColorStatTone, ColorStat>

export interface ColorError {
  code: string
  message: string
  details?: unknown
}

export type AsyncState<TData> =
  | { status: 'loading' }
  | { status: 'error'; error: ColorError }
  | { status: 'ready'; data: TData }

export type ColorFormMode = 'create' | 'edit' | 'duplicate'

export type ColorView = 'grid' | 'list'

export type ColorPageSize = 10 | 25 | 50 | 75

export type ColorDialog =
  | { kind: 'none' }
  | { kind: 'delete'; color: Color }
  | { kind: 'details'; color: Color }
