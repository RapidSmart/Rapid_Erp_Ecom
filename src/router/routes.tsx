import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import { primaryNavItems, type NavItem } from "@/shared/components/layout";
import {
  SignIn,
  VerifyEmail,
  AccountVerified,
  ForgotPassword,
  CheckEmail,
  SetNewPassword,
} from "@/modules/auth";
import { COUNTRY_ROUTE_PATH, countryRoutes } from "@/modules/country";
import { PRODUCT_ROUTE_PATH, productRoutes } from "@/modules/product";
import { CATEGORY_ROUTE_PATH, categoryRoutes } from "@/modules/category";

function buildNavRoutes(navItems: NavItem[], excludePaths: string[]) {
  return navItems
    .filter((item) => item.href !== "/" && !excludePaths.includes(item.href))
    .map((item) => ({ path: item.href, element: null }));
}

const navRoutes = buildNavRoutes(primaryNavItems, [
  COUNTRY_ROUTE_PATH,
  PRODUCT_ROUTE_PATH,
  CATEGORY_ROUTE_PATH,
]);

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { index: true, element: null },
      ...navRoutes,
      ...countryRoutes,
      ...productRoutes,
      ...categoryRoutes,
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
