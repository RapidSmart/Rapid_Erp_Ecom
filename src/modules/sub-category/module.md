# SubCategory Module (`src/modules/sub-category`)

## Overview
The `sub-category` module manages item sub-categories (code, name, description, status, image assets) for the Rapid ERP dashboard.

## Architecture & Integration
- **Shared Primitives**: Consumes reusable input fields (`PillInput`, `PillSelect`, `SectionHeader`, `FormFooter`), layout components (`ListingHeader`, `ListingFooter`, `Pagination`, `ViewToggle`), feedback components (`StatusBadge`, `Feedback`, `TableSkeleton`, `CardSkeleton`), and overview widgets (`StatDonut`, `OverviewCard`, `RangeSwitch`) from `@/modules/common-data`.
- **Domain Components**:
  - `SubCategoryCard.tsx`: Grid card presentation for a single sub-category.
  - `SubCategoryTable.tsx` & `SubCategoryTableRow.tsx`: Data table and interactive rows.
  - `SubCategoryGrid.tsx`: Responsive grid view container.
  - `SubCategoryForm.tsx`: Create / edit sub-category form with image upload and gallery.
  - `SubCategoryImage.tsx`: Sub-category thumbnail with fallback.
  - `SubCategoryDetailsDialog.tsx`: Modal dialog for viewing sub-category details and quick actions.
- **State & Service**:
  - `useSubCategoryListing.ts`: Server data fetching, debounced search, status filter, client-side pagination, and mutation wrappers.
  - `useSubCategoryForm.ts`: Controls modal dialog create/edit mutations with validation.
  - `useSubCategoryPageForm.ts`: Controls page-based `/sub-category/new` and `/sub-category/:code/edit` forms.
  - `sub-category.service.ts`: API service communicating through `shared/services/http.service.ts`.
- **Routes**:
  - `/sub-category`: Sub-category list and grid view.
  - `/sub-category/new`: Add sub-category page.
  - `/sub-category/:code/edit`: Edit sub-category page.

## Guidelines for AI Agents
1. **Import Boundaries**: Always import shared UI and utilities from `@/modules/common-data`. Never duplicate pill inputs, footers, or formatters inside this module.
2. **Type Safety**: Use nominal `SubCategoryId` for sub-category identifiers.
3. **i18n**: All UI copy must resolve through `useTranslation()` under the `subCategory.*` namespace in `i18n/en.json`.
