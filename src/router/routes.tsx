import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import { primaryNavItems } from "@/shared/components/layout";
import { authRoutes } from "@/modules/auth";
import {
  COUNTRY_ROUTE_PATH,
  CountryCardSkeleton,
  CountryListing,
  CountryRouteError,
} from "@/modules/country";
import {
  BRANDS_ROUTE_PATH,
  brandsRoutes,
} from "@/modules/brands";
import {
  COLORS_ROUTE_PATH,
  colorsRoutes,
} from "@/modules/colors";

const AddCountryPage = lazy(() =>
  import("@/modules/countries").then((m) => ({ default: m.AddCountryPage })),
);
const EditCountryPage = lazy(() =>
  import("@/modules/countries").then((m) => ({ default: m.EditCountryPage })),
);

const navRoutes = primaryNavItems
  .filter((item) => item.href !== "/" && item.href !== COUNTRY_ROUTE_PATH && item.href !== BRANDS_ROUTE_PATH && item.href !== COLORS_ROUTE_PATH)
  .map((item) => ({ path: item.href, element: null }));

const countryFallback = (
  <div className="grid min-h-full grid-cols-[repeat(auto-fill,minmax(min(260px,100%),1fr))] gap-x-3.5 gap-y-5 bg-canvas p-5">
    {Array.from({ length: 8 }, (_, index) => (
      <CountryCardSkeleton key={index} />
    ))}
  </div>
);

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
      {
        path: "/country/new",
        element: (
          <Suspense
            fallback={
              <div className="flex h-screen items-center justify-center">
                Loading...
              </div>
            }
          >
            <AddCountryPage />
          </Suspense>
        ),
      },
      {
        path: "/country/:id/edit",
        element: (
          <Suspense
            fallback={
              <div className="flex h-screen items-center justify-center">
                Loading...
              </div>
            }
          >
            <EditCountryPage />
          </Suspense>
        ),
      },
      ...brandsRoutes,
      ...colorsRoutes,
    ],
  },
  ...authRoutes,
]);
