import { lazy, Suspense } from 'react'
import type { RouteObject } from 'react-router-dom'
import { CategoryRouteError } from './view/CategoryRouteError'
import { CategoryCardSkeleton } from './components/CategoryCardSkeleton'

export const CATEGORY_ROUTE_PATH = '/category'

const CategoryListing = lazy(() =>
  import('./view/CategoryListing').then((module) => ({
    default: module.CategoryListing,
  }))
)

const AddCategoryPage = lazy(() =>
  import('./view/AddCategoryPage').then((module) => ({
    default: module.AddCategoryPage,
  }))
)

const EditCategoryPage = lazy(() =>
  import('./view/EditCategoryPage').then((module) => ({
    default: module.EditCategoryPage,
  }))
)

const categoryFallback = (
  <div className="grid min-h-full grid-cols-[repeat(auto-fill,minmax(min(260px,100%),1fr))] gap-x-3.5 gap-y-5 bg-canvas p-5">
    {Array.from({ length: 8 }, (_, index) => (
      <CategoryCardSkeleton key={index} />
    ))}
  </div>
)

const loadingFallback = (
  <div className="flex h-screen items-center justify-center">
    Loading...
  </div>
)

export const categoryRoutes: RouteObject[] = [
  {
    path: CATEGORY_ROUTE_PATH,
    element: (
      <Suspense fallback={categoryFallback}>
        <CategoryListing />
      </Suspense>
    ),
    errorElement: <CategoryRouteError />,
  },
  {
    path: `${CATEGORY_ROUTE_PATH}/new`,
    element: (
      <Suspense fallback={loadingFallback}>
        <AddCategoryPage />
      </Suspense>
    ),
  },
  {
    path: `${CATEGORY_ROUTE_PATH}/:code/edit`,
    element: (
      <Suspense fallback={loadingFallback}>
        <EditCategoryPage />
      </Suspense>
    ),
  },
]
