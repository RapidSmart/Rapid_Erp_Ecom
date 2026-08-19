import { lazy, Suspense } from 'react'
import type { RouteObject } from 'react-router-dom'
import { ProductRouteError } from './view/ProductRouteError'
import { ProductCardSkeleton } from './components/skeleton/ProductCardSkeleton'

export const PRODUCT_ROUTE_PATH = '/product'

const ProductListing = lazy(() =>
  import('./view/ProductListing').then((module) => ({
    default: module.ProductListing,
  }))
)

const AddProductPage = lazy(() =>
  import('./view/AddProductPage').then((module) => ({
    default: module.AddProductPage,
  }))
)

const EditProductPage = lazy(() =>
  import('./view/EditProductPage').then((module) => ({
    default: module.EditProductPage,
  }))
)

const productFallback = (
  <div className="grid min-h-full grid-cols-[repeat(auto-fill,minmax(min(260px,100%),1fr))] gap-x-3.5 gap-y-5 bg-canvas p-5">
    {Array.from({ length: 8 }, (_, index) => (
      <ProductCardSkeleton key={index} />
    ))}
  </div>
)

const loadingFallback = (
  <div className="flex h-screen items-center justify-center">
    Loading...
  </div>
)

export const productRoutes: RouteObject[] = [
  {
    path: PRODUCT_ROUTE_PATH,
    element: (
      <Suspense fallback={productFallback}>
        <ProductListing />
      </Suspense>
    ),
    errorElement: <ProductRouteError />,
  },
  {
    path: `${PRODUCT_ROUTE_PATH}/new`,
    element: (
      <Suspense fallback={loadingFallback}>
        <AddProductPage />
      </Suspense>
    ),
  },
  {
    path: `${PRODUCT_ROUTE_PATH}/:id/edit`,
    element: (
      <Suspense fallback={loadingFallback}>
        <EditProductPage />
      </Suspense>
    ),
  },
]
