# Sub Category Module

Master-data module for granular product sub categories: grid/list views, overview aggregates, search, status filtering, pagination, and CRUD with image gallery and upload.

Exposes exactly 4 inputs: Code, Name, Description, Image. Uses Code as the unique identifier.

## Public surface

Everything outside this folder imports from `modules/sub-category/index.ts` only:

| Export                    | Purpose                                          |
| ------------------------- | ------------------------------------------------ |
| `SUB_CATEGORY_ROUTE_PATH` | Route path used by `router/routes.tsx`           |
| `subCategoryRoutes`       | Lazy route list for sub category views           |
| `SubCategory`             | Sub category interface representing domain model |
| `SubCategoryId`           | Branded ID type wrapping code                    |
| `SubCategoryStatus`       | Sub category status union                        |
| `SubCategoryPayload`      | Payload for CRUD requests                        |
| `SubCategoryFormValues`   | Form values interface for edit page              |

## Layers

```
view/        SubCategoryListing, SubCategoryRouteError, AddSubCategoryPage, EditSubCategoryPage
components/  presentational only — cards, table rows, donuts, header, footer, dialogs, image picker
hooks/       useSubCategoryListing, useSubCategoryForm, useSubCategoryPageForm, useSubCategoryImageUpload
services/    sub-category.service.ts
validation/  sub-category.schema.ts (API boundary with Zod), sub-category-form.schema.ts (limits: Code 10, Name 40, Description 200), sub-category-page.schema.ts
constants/   status/overview options + mock.sub-category.ts
utils/       relative + compact time formatting
i18n/        en.json, namespaced `subCategory.*`, registered in `src/i18n`
```
