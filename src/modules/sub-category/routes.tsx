import { lazy, Suspense } from 'react'
import type { RouteObject } from 'react-router-dom'
import { SubCategoryRouteError } from './view/SubCategoryRouteError'
import { SubCategoryCardSkeleton } from './components/skeleton/SubCategoryCardSkeleton'

export const SUB_CATEGORY_ROUTE_PATH = '/sub-category'

const SubCategoryListing = lazy(() =>
  import('./view/SubCategoryListing').then((module) => ({
    default: module.SubCategoryListing,
  }))
)

const AddSubCategoryPage = lazy(() =>
  import('./view/AddSubCategoryPage').then((module) => ({
    default: module.AddSubCategoryPage,
  }))
)

const EditSubCategoryPage = lazy(() =>
  import('./view/EditSubCategoryPage').then((module) => ({
    default: module.EditSubCategoryPage,
  }))
)

const subCategoryFallback = (
  <div className="grid min-h-full grid-cols-[repeat(auto-fill,minmax(min(260px,100%),1fr))] gap-x-3.5 gap-y-5 bg-canvas p-5">
    {Array.from({ length: 8 }, (_, index) => (
      <SubCategoryCardSkeleton key={index} />
    ))}
  </div>
)

const loadingFallback = (
  <div className="flex h-screen items-center justify-center">
    Loading...
  </div>
)

export const subCategoryRoutes: RouteObject[] = [
  {
    path: SUB_CATEGORY_ROUTE_PATH,
    element: (
      <Suspense fallback={subCategoryFallback}>
        <SubCategoryListing />
      </Suspense>
    ),
    errorElement: <SubCategoryRouteError />,
  },
  {
    path: `${SUB_CATEGORY_ROUTE_PATH}/new`,
    element: (
      <Suspense fallback={loadingFallback}>
        <AddSubCategoryPage />
      </Suspense>
    ),
  },
  {
    path: `${SUB_CATEGORY_ROUTE_PATH}/:code/edit`,
    element: (
      <Suspense fallback={loadingFallback}>
        <EditSubCategoryPage />
      </Suspense>
    ),
  },
]
