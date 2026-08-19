import { lazy, Suspense } from 'react'
import type { RouteObject } from 'react-router-dom'
import { CountryRouteError } from './view/CountryRouteError'
import { CountryCardSkeleton } from './components/skeleton/CountryCardSkeleton'

export const COUNTRY_ROUTE_PATH = '/country'

const CountryListing = lazy(() =>
  import('./view/CountryListing').then((module) => ({
    default: module.CountryListing,
  }))
)

const AddCountryPage = lazy(() =>
  import('./view/AddCountryPage').then((module) => ({
    default: module.AddCountryPage,
  }))
)

const EditCountryPage = lazy(() =>
  import('./view/EditCountryPage').then((module) => ({
    default: module.EditCountryPage,
  }))
)

const countryFallback = (
  <div className="grid min-h-full grid-cols-[repeat(auto-fill,minmax(min(260px,100%),1fr))] gap-x-3.5 gap-y-5 bg-canvas p-5">
    {Array.from({ length: 8 }, (_, index) => (
      <CountryCardSkeleton key={index} />
    ))}
  </div>
)

const loadingFallback = (
  <div className="flex h-screen items-center justify-center">
    Loading...
  </div>
)

export const countryRoutes: RouteObject[] = [
  {
    path: COUNTRY_ROUTE_PATH,
    element: (
      <Suspense fallback={countryFallback}>
        <CountryListing />
      </Suspense>
    ),
    errorElement: <CountryRouteError />,
  },
  {
    path: `${COUNTRY_ROUTE_PATH}/new`,
    element: (
      <Suspense fallback={loadingFallback}>
        <AddCountryPage />
      </Suspense>
    ),
  },
  {
    path: `${COUNTRY_ROUTE_PATH}/:id/edit`,
    element: (
      <Suspense fallback={loadingFallback}>
        <EditCountryPage />
      </Suspense>
    ),
  },
]
