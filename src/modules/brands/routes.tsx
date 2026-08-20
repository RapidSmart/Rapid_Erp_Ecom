import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";

const BRANDS_ROUTE_PATH = "/brands";

const BrandsListing = lazy(() => import("./view/BrandsListing"));
const BrandsAdd = lazy(() => import("./view/BrandsAdd"));
const BrandsEdit = lazy(() => import("./view/BrandsEdit"));

const fallback = <div className="flex h-screen items-center justify-center">Loading...</div>;

export const brandsRoutes: RouteObject[] = [
  {
    path: BRANDS_ROUTE_PATH,
    element: (
      <Suspense fallback={fallback}>
        <BrandsListing />
      </Suspense>
    ),
  },
  {
    path: "/brands/new",
    element: (
      <Suspense fallback={fallback}>
        <BrandsAdd />
      </Suspense>
    ),
  },
  {
    path: "/brands/:id/edit",
    element: (
      <Suspense fallback={fallback}>
        <BrandsEdit />
      </Suspense>
    ),
  },
];
