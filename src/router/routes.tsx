import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import { primaryNavItems, type NavItem } from "@/shared/components/layout";
import { authRoutes } from "@/modules/auth";
import { COUNTRY_ROUTE_PATH, countryRoutes } from "@/modules/country";
import { PRODUCT_ROUTE_PATH, productRoutes } from "@/modules/product";
import { CATEGORY_ROUTE_PATH, categoryRoutes } from "@/modules/category";
import { INDUSTRIES_ROUTE_PATH, industriesRoutes } from "@/modules/industries";

function buildNavRoutes(navItems: NavItem[], excludePaths: string[]) {
  return navItems
    .filter((item) => item.href !== "/" && !excludePaths.includes(item.href))
    .map((item) => ({ path: item.href, element: null }));
}

const navRoutes = buildNavRoutes(primaryNavItems, [
  COUNTRY_ROUTE_PATH,
  PRODUCT_ROUTE_PATH,
  CATEGORY_ROUTE_PATH,
  INDUSTRIES_ROUTE_PATH,
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
      ...industriesRoutes,
    ],
  },
  ...authRoutes,
]);
