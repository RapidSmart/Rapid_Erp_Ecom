import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import App from "@/App";
import { SignIn, SignUp } from "@/modules/auth";

const AddCountryPage = lazy(() =>
  import("@/modules/countries").then((m) => ({ default: m.AddCountryPage })),
);
const EditCountryPage = lazy(() =>
  import("@/modules/countries").then((m) => ({ default: m.EditCountryPage })),
);
import { primaryNavItems } from "@/shared/components/layout";

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
