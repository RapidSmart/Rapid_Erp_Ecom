import { lazy, Suspense } from 'react'
import type { RouteObject } from 'react-router-dom'
import { DepartmentRouteError } from './view/DepartmentRouteError'
import { DepartmentCardSkeleton } from './components/skeleton/DepartmentCardSkeleton'

export const DEPARTMENT_ROUTE_PATH = '/department'

const DepartmentListing = lazy(() =>
  import('./view/DepartmentListing').then((module) => ({
    default: module.DepartmentListing,
  }))
)

const AddDepartmentPage = lazy(() =>
  import('./view/AddDepartmentPage').then((module) => ({
    default: module.AddDepartmentPage,
  }))
)

const EditDepartmentPage = lazy(() =>
  import('./view/EditDepartmentPage').then((module) => ({
    default: module.EditDepartmentPage,
  }))
)

const departmentFallback = (
  <div className="grid min-h-full grid-cols-[repeat(auto-fill,minmax(min(260px,100%),1fr))] gap-x-3.5 gap-y-5 bg-canvas p-5">
    {Array.from({ length: 8 }, (_, index) => (
      <DepartmentCardSkeleton key={index} />
    ))}
  </div>
)

const loadingFallback = (
  <div className="flex h-screen items-center justify-center">
    Loading...
  </div>
)

export const departmentRoutes: RouteObject[] = [
  {
    path: DEPARTMENT_ROUTE_PATH,
    element: (
      <Suspense fallback={departmentFallback}>
        <DepartmentListing />
      </Suspense>
    ),
    errorElement: <DepartmentRouteError />,
  },
  {
    path: `${DEPARTMENT_ROUTE_PATH}/new`,
    element: (
      <Suspense fallback={loadingFallback}>
        <AddDepartmentPage />
      </Suspense>
    ),
  },
  {
    path: `${DEPARTMENT_ROUTE_PATH}/:code/edit`,
    element: (
      <Suspense fallback={loadingFallback}>
        <EditDepartmentPage />
      </Suspense>
    ),
  },
]
