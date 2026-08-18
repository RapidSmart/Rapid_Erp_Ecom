import { createBrowserRouter } from 'react-router-dom'
import { Suspense } from 'react'
import App from '@/App'
import { SignIn, SignUp } from '@/modules/auth'
import {
  COUNTRY_ROUTE_PATH,
  CountryCardSkeleton,
  CountryListing,
  CountryRouteError,
} from '@/modules/country'
import { primaryNavItems } from '@/shared/components/layout'

const navRoutes = primaryNavItems
  .filter((item) => item.href !== '/' && item.href !== COUNTRY_ROUTE_PATH)
  .map((item) => ({ path: item.href, element: null }))

const countryFallback = (
  <div className="grid min-h-full grid-cols-[repeat(auto-fill,minmax(min(260px,100%),1fr))] gap-x-3.5 gap-y-5 bg-canvas p-5">
    {Array.from({ length: 8 }, (_, index) => (
      <CountryCardSkeleton key={index} />
    ))}
  </div>
)

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { index: true, element: null },
      ...navRoutes,
      {
        path: COUNTRY_ROUTE_PATH,
        element: (
          <Suspense fallback={countryFallback}>
            <CountryListing />
          </Suspense>
        ),
        errorElement: <CountryRouteError />,
      },
    ],
  },
  {
    path: '/auth/signin',
    element: (
      <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
        <SignIn />
      </Suspense>
    ),
  },
  {
    path: '/auth/signup',
    element: (
      <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
        <SignUp />
      </Suspense>
    ),
  },
])
