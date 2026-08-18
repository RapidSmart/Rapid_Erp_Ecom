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
