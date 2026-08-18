import { lazy } from 'react'

export const COUNTRY_ROUTE_PATH = '/country'

export const CountryListing = lazy(() =>
  import('./view/CountryListing').then((module) => ({
    default: module.CountryListing,
  }))
)

export { CountryRouteError } from './view/CountryRouteError'
export { CountryCardSkeleton } from './components/CountryCardSkeleton'
export type {
  Country,
  CountryId,
  CountryStatus,
  CountryPayload,
} from './types/country.types'
