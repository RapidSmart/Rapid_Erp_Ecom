# Department Module (`src/modules/department`)

## Overview
The `department` module manages company departments (code, name, description, status, image assets) for the Rapid ERP dashboard.

## Architecture & Integration
- **Shared Primitives**: Consumes reusable input fields (`PillInput`, `PillSelect`, `SectionHeader`, `FormFooter`), layout components (`ListingHeader`, `ListingFooter`, `Pagination`, `ViewToggle`), feedback components (`StatusBadge`, `Feedback`, `TableSkeleton`, `CardSkeleton`), and overview widgets (`StatDonut`, `OverviewCard`, `RangeSwitch`) from `@/modules/common-data`.
- **Domain Components**:
  - `DepartmentCard.tsx`: Grid card presentation for a single department.
  - `DepartmentTable.tsx` & `DepartmentTableRow.tsx`: Data table and interactive rows.
  - `DepartmentGrid.tsx`: Responsive grid view container.
  - `DepartmentForm.tsx`: Create / edit department form with image upload and gallery.
  - `DepartmentImage.tsx`: Department thumbnail with fallback.
  - `DepartmentDetailsDialog.tsx`: Modal dialog for viewing department details and quick actions.
- **State & Service**:
  - `useDepartmentListing.ts`: Server data fetching, debounced search, status filter, client-side pagination, and mutation wrappers.
  - `useDepartmentForm.ts`: Controls modal dialog create/edit mutations with validation.
  - `useDepartmentPageForm.ts`: Controls page-based `/department/new` and `/department/:code/edit` forms.
  - `department.service.ts`: API service communicating through `shared/services/http.service.ts`.
- **Routes**:
  - `/department`: Department list and grid view.
  - `/department/new`: Add department page.
  - `/department/:code/edit`: Edit department page.

## Guidelines for AI Agents
1. **Import Boundaries**: Always import shared UI and utilities from `@/modules/common-data`. Never duplicate pill inputs, footers, or formatters inside this module.
2. **Type Safety**: Use nominal `DepartmentId` for department identifiers.
3. **i18n**: All UI copy must resolve through `useTranslation()` under the `department.*` namespace in `i18n/en.json`.
