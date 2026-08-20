# Department Module

Master-data module for enterprise departments: grid/list views, overview aggregates, search, status filtering, pagination, and CRUD using Unsplash images.

Exposes exactly 4 inputs: Code, Name, Description, Image. Uses Code as the unique identifier.

## Public surface

Everything outside this folder imports from `modules/department/index.ts` only:

| Export                  | Purpose                                          |
| ----------------------- | ------------------------------------------------ |
| `DEPARTMENT_ROUTE_PATH` | Route path used by `router/routes.tsx`           |
| `departmentRoutes`      | Lazy route list for department views             |
| `Department`            | Department interface representing domain model   |
| `DepartmentId`          | Branded ID type wrapping code                    |
| `DepartmentStatus`      | Department status union                          |
| `DepartmentPayload`     | Payload for CRUD requests                        |
| `DepartmentFormValues`  | Form values interface for edit page              |

## Layers

```
view/        DepartmentListing, DepartmentRouteError, AddDepartmentPage, EditDepartmentPage
components/  presentational only — cards, table rows, donuts, header, footer, dialogs, image picker
hooks/       useDepartmentListing, useDepartmentForm, useDepartmentPageForm, useDepartmentImageUpload
services/    department.service.ts
validation/  department.schema.ts (API boundary with Zod), department-form.schema.ts (limits: Code 10, Name 40, Description 200), department-page.schema.ts
constants/   status/overview options + mock.department.ts
utils/       relative + compact time formatting
i18n/        en.json, namespaced `department.*`, registered in `src/i18n`
```
