import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import { primaryNavItems } from "@/shared/components/layout";
import {
  SignIn,
  VerifyEmail,
  AccountVerified,
  ForgotPassword,
  CheckEmail,
  SetNewPassword,
} from "@/modules/auth";
import {
  COUNTRY_ROUTE_PATH,
  CountryCardSkeleton,
  CountryListing,
  CountryRouteError,
} from "@/modules/country";

const AddCountryPage = lazy(() =>
  import("@/modules/countries").then((m) => ({ default: m.AddCountryPage })),
);
const EditCountryPage = lazy(() =>
  import("@/modules/countries").then((m) => ({ default: m.EditCountryPage })),
);

const navRoutes = primaryNavItems
  .filter((item) => item.href !== "/" && item.href !== COUNTRY_ROUTE_PATH)
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
        path: "/countries/new",
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
        path: "/countries/:id/edit",
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
    ],
  },
  {
    path: "/auth/signin",
    element: (
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            Loading...
          </div>
        }
      >
        <SignIn />
      </Suspense>
    ),
  },
  {
    path: "/auth/verify-email",
    element: (
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            Loading...
          </div>
        }
      >
        <VerifyEmail />
      </Suspense>
    ),
  },
  {
    path: "/auth/verified",
    element: (
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            Loading...
          </div>
        }
      >
        <AccountVerified />
      </Suspense>
    ),
  },
  {
    path: "/auth/forgot-password",
    element: (
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            Loading...
          </div>
        }
      >
        <ForgotPassword />
      </Suspense>
    ),
  },
  {
    path: "/auth/check-email",
    element: (
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            Loading...
          </div>
        }
      >
        <CheckEmail />
      </Suspense>
    ),
  },
  {
    path: "/auth/set-new-password",
    element: (
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            Loading...
          </div>
        }
      >
        <SetNewPassword />
      </Suspense>
    ),
  },
]);


