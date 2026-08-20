import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";

const RAK_ROUTE_PATH = "/rak";

const RakListing = lazy(() => import("./view/RakListing"));
const RakAdd = lazy(() => import("./view/RakAdd"));
const RakEdit = lazy(() => import("./view/RakEdit"));

const fallback = <div className="flex h-screen items-center justify-center">Loading...</div>;

export const rakRoutes: RouteObject[] = [
  {
    path: RAK_ROUTE_PATH,
    element: (
      <Suspense fallback={fallback}>
        <RakListing />
      </Suspense>
    ),
  },
  {
    path: "/rak/new",
    element: (
      <Suspense fallback={fallback}>
        <RakAdd />
      </Suspense>
    ),
  },
  {
    path: "/rak/:id/edit",
    element: (
      <Suspense fallback={fallback}>
        <RakEdit />
      </Suspense>
    ),
  },
];
