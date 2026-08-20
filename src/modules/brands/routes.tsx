import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";

const INDUSTRIES_ROUTE_PATH = "/industries";

const IndustriesListing = lazy(() => import("./view/IndustriesListing"));
const IndustriesAdd = lazy(() => import("./view/IndustriesAdd"));
const IndustriesEdit = lazy(() => import("./view/IndustriesEdit"));

const fallback = <div className="flex h-screen items-center justify-center">Loading...</div>;

export const industriesRoutes: RouteObject[] = [
  {
    path: INDUSTRIES_ROUTE_PATH,
    element: (
      <Suspense fallback={fallback}>
        <IndustriesListing />
      </Suspense>
    ),
  },
  {
    path: "/industries/new",
    element: (
      <Suspense fallback={fallback}>
        <IndustriesAdd />
      </Suspense>
    ),
  },
  {
    path: "/industries/:id/edit",
    element: (
      <Suspense fallback={fallback}>
        <IndustriesEdit />
      </Suspense>
    ),
  },
];
