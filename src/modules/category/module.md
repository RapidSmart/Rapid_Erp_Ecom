# Category Module (`src/modules/category`)

## Overview
The `category` module manages item categories (code, name, description, status, image assets) for the Rapid ERP dashboard.

## Architecture & Integration
- **Shared Primitives**: Consumes reusable input fields (`PillInput`, `PillSelect`, `SectionHeader`, `FormFooter`), layout components (`ListingHeader`, `ListingFooter`, `Pagination`, `ViewToggle`), feedback components (`StatusBadge`, `Feedback`, `TableSkeleton`, `CardSkeleton`), and overview widgets (`StatDonut`, `OverviewCard`, `RangeSwitch`) from `@/modules/common-data`.
- **Domain Components**:
  - `CategoryCard.tsx`: Grid card presentation for a single category.
  - `CategoryTable.tsx` & `CategoryTableRow.tsx`: Data table and interactive rows.
  - `CategoryGrid.tsx`: Responsive grid view container.
  - `CategoryForm.tsx`: Create / edit category form with image upload and gallery.
  - `CategoryImage.tsx`: Category thumbnail with fallback.
  - `CategoryDetailsDialog.tsx`: Modal dialog for viewing category details and quick actions.
- **State & Service**:
  - `useCategoryListing.ts`: Server data fetching, debounced search, status filter, client-side pagination, and mutation wrappers.
  - `useCategoryForm.ts`: Controls modal dialog create/edit mutations with validation.
  - `useCategoryPageForm.ts`: Controls page-based `/category/new` and `/category/:code/edit` forms.
  - `category.service.ts`: API service communicating through `shared/services/http.service.ts`.
- **Routes**:
  - `/category`: Category list and grid view.
  - `/category/new`: Add category page.
  - `/category/:code/edit`: Edit category page.

## Guidelines for AI Agents
1. **Import Boundaries**: Always import shared UI and utilities from `@/modules/common-data`. Never duplicate pill inputs, footers, or formatters inside this module.
2. **Type Safety**: Use nominal `CategoryId` for category identifiers.
3. **i18n**: All UI copy must resolve through `useTranslation()` under the `category.*` namespace in `i18n/en.json`.
