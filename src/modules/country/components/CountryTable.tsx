import { useState } from 'react'
import { Globe, SearchX, TriangleAlert } from 'lucide-react'
import { useTranslation } from '@/i18n'
import { Checkbox } from '@/shared/components/ui/checkbox'
import { CountryFeedback } from './CountryFeedback'
import { CountryPagination } from './CountryPagination'
import { CountryTableRow } from './CountryTableRow'
import { CountryTableSkeleton } from './skeleton/CountryTableSkeleton'
import type {
  Country,
  CountryId,
  CountryTableProps,
} from '../types/country.types'

const SKELETON_ROW_COUNT = 8

const HEADER_CELL_CLASSES =
  'px-4 py-3 text-left text-[11px] font-medium text-ink-subtle'


function CountryTable({
  state,
  isRefreshing,
  isFiltered,
  page,
  pageCount,
  pageSize,
  totalCount,
  onPageChange,
  onPageSizeChange,
  onRetry,
  onClearFilters,
  onAdd,
  onOpenDetails,
}: CountryTableProps) {
  const { t } = useTranslation()
  const [selectedIds, setSelectedIds] = useState<ReadonlySet<CountryId>>(
    new Set()
  )

  const rows = state.status === 'ready' ? state.data : []
  const allSelected = rows.length > 0 && rows.every((row) => selectedIds.has(row.id))
  const someSelected = rows.some((row) => selectedIds.has(row.id))

  function toggleRow(country: Country, checked: boolean) {
    setSelectedIds((current) => {
      const next = new Set(current)

      if (checked) {
        next.add(country.id)
      } else {
        next.delete(country.id)
      }

      return next
    })
  }

  function toggleAll(checked: boolean) {
    setSelectedIds(checked ? new Set(rows.map((row) => row.id)) : new Set())
  }

  return (
    <div className="overflow-hidden rounded-xl border border-surface-border bg-surface">
      <div className="overflow-x-auto">
        <table className="w-full min-w-220 border-collapse">
          <thead>
            <tr className="border-b border-surface-border">
              <th scope="col" className="w-10 px-4 py-3">
                <Checkbox
                  checked={allSelected}
                  indeterminate={someSelected && !allSelected}
                  onCheckedChange={toggleAll}
                  aria-label={t('country.table.selectAll')}
                />
              </th>
              <th scope="col" className={HEADER_CELL_CLASSES}>
                {t('country.table.countryCode')}
              </th>
              <th scope="col" className={HEADER_CELL_CLASSES}>
                {t('country.table.country')}
              </th>
              <th scope="col" className={HEADER_CELL_CLASSES}>
                {t('country.table.nativeName')}
              </th>

              <th scope="col" className={HEADER_CELL_CLASSES}>
                {t('country.table.iso2')}
              </th>
              <th scope="col" className={HEADER_CELL_CLASSES}>
                {t('country.table.iso3')}
              </th>
              <th scope="col" className={HEADER_CELL_CLASSES}>
                {t('country.table.isoNumeric')}
              </th>
              <th scope="col" className={HEADER_CELL_CLASSES}>
                {t('country.table.status')}
              </th>
              <th scope="col" className={HEADER_CELL_CLASSES}>
                {t('country.table.updated')}
              </th>
            </tr>
          </thead>

          {state.status === 'ready' && rows.length > 0 && (
            <tbody
              aria-busy={isRefreshing}
              className={isRefreshing ? 'opacity-60 transition-opacity' : undefined}
            >
              {rows.map((country) => (
                <CountryTableRow
                  key={country.id}
                  country={country}
                  selected={selectedIds.has(country.id)}
                  onToggleSelected={toggleRow}
                  onOpenDetails={onOpenDetails}
                />
              ))}
            </tbody>
          )}
        </table>
      </div>

      {state.status === 'loading' && (
        <CountryTableSkeleton rowCount={SKELETON_ROW_COUNT} />
      )}

      {state.status === 'error' && (
        <CountryFeedback
          bare
          icon={TriangleAlert}
          tone="danger"
          title={t('country.states.errorTitle')}
          body={state.error.message}
          actionLabel={t('country.states.errorAction')}
          onAction={onRetry}
        />
      )}

      {state.status === 'ready' && rows.length === 0 && (
        <>
          {isFiltered ? (
            <CountryFeedback
              bare
              icon={SearchX}
              title={t('country.states.noResultsTitle')}
              body={t('country.states.noResultsBody')}
              actionLabel={t('country.states.noResultsAction')}
              onAction={onClearFilters}
            />
          ) : (
            <CountryFeedback
              bare
              icon={Globe}
              title={t('country.states.emptyTitle')}
              body={t('country.states.emptyBody')}
              actionLabel={t('country.states.emptyAction')}
              onAction={onAdd}
            />
          )}
        </>
      )}

      {state.status === 'ready' && rows.length > 0 && (
        <div className="border-t border-surface-border">
          <CountryPagination
            page={page}
            pageCount={pageCount}
            pageSize={pageSize}
            totalCount={totalCount}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
        </div>
      )}
    </div>
  )
}

export { CountryTable }
