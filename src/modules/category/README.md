# Category Module

Master-data module for categories: grid/list views, overview aggregates, search, status filtering, pagination, and CRUD using Unsplash images.

Exposes exactly 4 inputs: Code, Name, Description, Image. Uses Code as the unique identifier.

## Public surface

Everything outside this folder imports from `modules/category/index.ts` only:

| Export                | Purpose                                        |
| --------------------- | ---------------------------------------------- |
| `CATEGORY_ROUTE_PATH` | Route path used by `router/routes.tsx`         |
| `categoryRoutes`      | Lazy route list for category views             |
| `Category`            | Category interface representing domain model   |
| `CategoryId`          | Branded ID type wrapping code                  |
| `CategoryStatus`      | Category status union                          |
| `CategoryPayload`     | Payload for CRUD requests                      |
| `CategoryFormValues`  | Form values interface for edit page            |

## Layers

```
view/        CategoryListing, CategoryRouteError, AddCategoryPage, EditCategoryPage
components/  presentational only — cards, table rows, donuts, header, footer, dialogs, image picker
hooks/       useCategoryListing, useCategoryForm, useCategoryPageForm, useCategoryImageUpload
services/    category.service.ts
validation/  category.schema.ts (API boundary), category-form.schema.ts (limits: Code 10, Name 40, Description 200), category-page.schema.ts
constants/   status/overview options + mock.category.ts
utils/       relative + compact time formatting
i18n/        en.json, namespaced `category.*`, registered in `src/i18n`
```
