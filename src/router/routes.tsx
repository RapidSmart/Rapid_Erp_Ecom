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

const AddCountryPage = lazy(() =>
  import("@/modules/countries").then((m) => ({ default: m.AddCountryPage })),
);
const EditCountryPage = lazy(() =>
  import("@/modules/countries").then((m) => ({ default: m.EditCountryPage })),
);

const navRoutes = primaryNavItems
  .filter((item) => item.href !== "/")
  .map((item) => ({ path: item.href, element: <App /> }));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  ...navRoutes,
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
]);

