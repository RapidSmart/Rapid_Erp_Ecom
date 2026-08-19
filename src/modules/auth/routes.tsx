import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";

const SignIn = lazy(() => import("./view/SignIn"));
const VerifyEmail = lazy(() => import("./view/VerifyEmail"));
const AccountVerified = lazy(() => import("./view/AccountVerified"));
const ForgotPassword = lazy(() => import("./view/ForgotPassword"));
const CheckEmail = lazy(() => import("./view/CheckEmail"));
const SetNewPassword = lazy(() => import("./view/SetNewPassword"));

const fallback = <div className="flex h-screen items-center justify-center">Loading...</div>;

export const authRoutes: RouteObject[] = [
  {
    path: "/auth/signin",
    element: (
      <Suspense fallback={fallback}>
        <SignIn />
      </Suspense>
    ),
  },
  {
    path: "/auth/verify-email",
    element: (
      <Suspense fallback={fallback}>
        <VerifyEmail />
      </Suspense>
    ),
  },
  {
    path: "/auth/verified",
    element: (
      <Suspense fallback={fallback}>
        <AccountVerified />
      </Suspense>
    ),
  },
  {
    path: "/auth/forgot-password",
    element: (
      <Suspense fallback={fallback}>
        <ForgotPassword />
      </Suspense>
    ),
  },
  {
    path: "/auth/check-email",
    element: (
      <Suspense fallback={fallback}>
        <CheckEmail />
      </Suspense>
    ),
  },
  {
    path: "/auth/set-new-password",
    element: (
      <Suspense fallback={fallback}>
        <SetNewPassword />
      </Suspense>
    ),
  },
];
