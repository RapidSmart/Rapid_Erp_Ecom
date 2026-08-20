# Country Module (`src/modules/country`)

## Overview
The `country` module manages country master data (ISO codes, currency, calling codes, status, and flag assets) for the Rapid ERP dashboard.

## Architecture & Integration
- **Shared Primitives**: Consumes reusable input fields (`PillInput`, `PillSelect`, `SectionHeader`, `FormFooter`), layout components (`ListingHeader`, `ListingFooter`, `Pagination`, `ViewToggle`), feedback components (`StatusBadge`, `Feedback`, `TableSkeleton`, `CardSkeleton`), and overview widgets (`StatDonut`, `OverviewCard`, `RangeSwitch`) from `@/modules/common-data`.
- **Domain Components**:
  - `CountryCard.tsx`: Grid card presentation for a single country.
  - `CountryTable.tsx` & `CountryTableRow.tsx`: Data table and interactive rows.
  - `CountryGrid.tsx`: Responsive grid view container.
  - `CountryForm.tsx`: Create / edit country form with validation and flag picker.
  - `CountryFlag.tsx`, `FlagChip.tsx`, `FlagUploadArea.tsx`: Domain-specific country flag display and asset handling.
  - `CountryDetailsDialog.tsx` & `CountryTemplateDialog.tsx`: Modal dialogs for viewing country details and quick-filling from presets.
  - `LanguageDropdown.tsx`: Multilingual translation dropdown for country names.
- **State & Service**:
  - `useCountryListing.ts`: Owns server data fetching, debounced search, status filter, client-side pagination, and mutation wrappers.
  - `useCountryForm.ts`: Controls dialog-based create/edit mutations with Zod schema validation.
  - `useCountryPageForm.ts`: Controls page-based `/country/new` and `/country/:id/edit` forms.
  - `country.service.ts`: API service communicating through `shared/services/http.service.ts`.
- **Routes**:
  - `/country`: Country list and grid view.
  - `/country/new`: Add country page.
  - `/country/:id/edit`: Edit country page.

## Guidelines for AI Agents
1. **Import Boundaries**: Always import shared UI and utilities from `@/modules/common-data`. Never duplicate pill inputs, footers, or formatters inside this module.
2. **Type Safety**: Use nominal `CountryId` for country identifiers.
3. **i18n**: All UI copy must resolve through `useTranslation()` under the `country.*` namespace in `i18n/en.json`.
