# Country Module

Master-data module for countries: grid/list views, overview aggregates, search,
status filtering, pagination and CRUD.

## Public surface

Everything outside this folder imports from `modules/country/index.ts` only:

| Export                 | Purpose                                        |
| ---------------------- | ---------------------------------------------- |
| `COUNTRY_ROUTE_PATH`   | Route path used by `router/routes.tsx`         |
| `CountryListing`       | Lazy route component for `/country`            |
| `CountryRouteError`    | Route-level error boundary element             |
| `CountryCardSkeleton`  | Suspense fallback tile                         |
| `Country`, `CountryId`, `CountryStatus`, `CountryPayload` | DTOs |

## Layers

```
view/        CountryListing (route page, owns grid/list toggle), CountryRouteError
components/  presentational only — grid cards, table rows, donuts/rings, header, footer, dialogs
hooks/       useCountryListing (server state, query params, pagination), useCountryForm
services/    country.service.ts — the only data-access point
validation/  country.schema.ts (API boundary), country-form.schema.ts (input)
constants/   status/overview/pagination option data + mock.country.ts
utils/       relative + absolute + compact timestamp formatting
i18n/        en.json, namespaced `country.*`, registered in `src/i18n`
```

## Grid vs. list view

`CountryListing` holds `view: 'grid' | 'list'` as local state and renders the
matching pair of presentational components — `CountryOverviewPanel` +
`CountryGrid`, or `CountryStatusOverview` + `CountryTable`. Both pairs consume
the exact same `useCountryListing()` output (search, status filter, time
range, mutations), so search/filter results and CRUD stay identical across the
toggle; only presentation changes, and toggling never triggers a refetch.

The two overview panels intentionally don't share a stat-tile component: the
grid view's `CountryStatDonut` is a fixed-sweep gauge (value+label centered,
percentage below), while the list view's `CountryOverviewRing` inside
`CountryOverviewCard` is a plain circle whose fill is proportional to the
percentage, sitting on a status-tinted card. They're different specs that can
evolve independently, so duplicating the small amount of arc math was chosen
over forcing one shared, more complex primitive. `CountryRangeSwitch` (the
Live/6h/24h/7d/30d pill group) *is* shared between both, since it's visually
and behaviourally identical in both places.

Pagination (`page`, `pageSize`, `paginatedList`) lives in `useCountryListing`
too, sliced client-side over the already-filtered list. Only the list view
renders pagination controls; the grid view still renders every filtered
result, matching each view's own reference design.

## Data source

The country endpoints do not exist yet, so `services/country.service.ts` serves
`constants/mock.country.ts` from an in-memory store behind the same async
contract the HTTP layer will have (latency, `AbortSignal`, normalised
`{ code, message, details }` errors, schema-validated payloads).

When the API ships, replace the store access inside the service with
`httpService` calls from `@/shared/services` and add the paths to
`config/api-routes.ts`. Nothing above the service — hooks, components, view —
has to change.

Overview aggregates are a separate server-side resource computed over the
selected time range, which is why their totals do not mirror the list on screen.

The header subtitle ("Total Countries N") reads `countryService.count()` — the
unfiltered master-data size — not the current search/status-filtered result
count, so it doesn't shrink when you search.

`shared/components/ui/checkbox.tsx` (a `@base-ui/react/checkbox` wrapper,
matching the existing `button.tsx`/`input.tsx`/`dialog.tsx` pattern) was added
for the table's row-selection checkboxes. It's a generic primitive, not
country-specific, so it lives in `shared/ui` rather than this module.

## Reference-screenshot data normalized

The list-view mock repeats "+1" / "US" / "USA" for every row's calling
code/ISO2/ISO3 regardless of the actual country — a placeholder artifact of
the design mockup, not real per-country data. `constants/mock.country.ts`
uses the correct value for each of the 12 seeded countries instead (e.g.
Japan → `+81`/`JP`/`JPN`), so search-by-code and the ISO2/ISO3 columns are
actually meaningful. Same call as the earlier grid-view normalization.

## Deviations from AGENTS.md

The repository does not have React Query, Zod, React Hook Form or an i18n
runtime installed, and the task brief forbids adding dependencies. The
equivalent guarantees are implemented without them:

- server state → `useCountryListing` (abortable requests, loading/error/empty
  states, refetch after every mutation) instead of React Query
- response validation → hand-written parsers in `validation/country.schema.ts`
  instead of Zod schemas
- form state → `useCountryForm` + `validation/country-form.schema.ts` instead of
  React Hook Form + Zod resolver
- translations → `src/i18n` loader/merger with `useTranslation()` and a
  missing-key fallback instead of i18next
