import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";

const COLORS_ROUTE_PATH = "/colors";

const ColorsListing = lazy(() => import("./view/ColorsListing"));
const ColorsAdd = lazy(() => import("./view/ColorsAdd"));
const ColorsEdit = lazy(() => import("./view/ColorsEdit"));

const fallback = <div className="flex h-screen items-center justify-center">Loading...</div>;

export const colorsRoutes: RouteObject[] = [
  {
    path: COLORS_ROUTE_PATH,
    element: (
      <Suspense fallback={fallback}>
        <ColorsListing />
      </Suspense>
    ),
  },
  {
    path: "/colors/new",
    element: (
      <Suspense fallback={fallback}>
        <ColorsAdd />
      </Suspense>
    ),
  },
  {
    path: "/colors/:id/edit",
    element: (
      <Suspense fallback={fallback}>
        <ColorsEdit />
      </Suspense>
    ),
  },
];
