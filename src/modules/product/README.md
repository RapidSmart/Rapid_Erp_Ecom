# Product Module

Master-data module for products: grid/list views, overview aggregates, search, status filtering, pagination, and CRUD using Unsplash images.

## Public surface

Everything outside this folder imports from `modules/product/index.ts` only:

| Export                | Purpose                                        |
| --------------------- | ---------------------------------------------- |
| `PRODUCT_ROUTE_PATH`  | Route path used by `router/routes.tsx`         |
| `productRoutes`       | Lazy route list for product views              |
| `Product`             | Product interface representing domain model    |
| `ProductId`           | Branded ID type                                |
| `ProductStatus`       | Product status union                           |
| `ProductPayload`      | Payload for CRUD requests                      |
| `ProductFormValues`   | Form values interface for edit page           |

## Layers

```
view/        ProductListing (route page, owns grid/list toggle), ProductRouteError, AddProductPage, EditProductPage
components/  presentational only — grid cards, table rows, donuts/rings, header, footer, dialogs
hooks/       useProductListing (server state, query params, pagination), useProductForm, useProductPageForm, useProductImageUpload
services/    product.service.ts — the only data-access point
validation/  product.schema.ts (API boundary), product-form.schema.ts (input), product-page.schema.ts (zod resolver)
constants/   status/overview/pagination option data + mock.product.ts
utils/       relative + absolute + compact timestamp formatting
i18n/        en.json, namespaced `product.*`, registered in `src/i18n`
```
