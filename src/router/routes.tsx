import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import App from "@/App";
import { SignIn, SignUp } from "@/modules/auth";

const AddCountryPage = lazy(() =>
  import("@/modules/countries").then((m) => ({ default: m.AddCountryPage })),
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
    path: "/auth/signup",
    element: (
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            Loading...
          </div>
        }
      >
        <SignUp />
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
]);
