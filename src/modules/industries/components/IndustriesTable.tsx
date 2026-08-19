import { useState } from 'react'
import { Factory, SearchX, TriangleAlert } from 'lucide-react'
import { useTranslation } from '@/i18n'
import { Checkbox } from '@/shared/components/ui/checkbox'
import { IndustriesFeedback } from './IndustriesFeedback'
import { IndustriesPagination } from './IndustriesPagination'
import type { AsyncState, Industry, IndustryId, IndustryPageSize } from '../types/industries.types'


const SKELETON_ROW_COUNT = 8

const HEADER_CELL_CLASSES = 'px-4 py-3 text-left text-[11px] font-medium text-ink-subtle'

export interface IndustriesTableProps {
  state: AsyncState<Industry[]>
  isRefreshing: boolean
  isFiltered: boolean
  page: number
  pageCount: number
  pageSize: IndustryPageSize
  totalCount: number
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: IndustryPageSize) => void
  onRetry: () => void
  onClearFilters: () => void
  onAdd: () => void
  onEdit: (industry: Industry) => void
  onOpenDetails: (industry: Industry) => void
}

export function IndustriesTable({
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
  onEdit,
  onOpenDetails,
}: IndustriesTableProps) {
  const { t } = useTranslation()
  const [selectedIds, setSelectedIds] = useState<ReadonlySet<IndustryId>>(new Set())

  const rows = state.status === 'ready' ? state.data : []
  const allSelected = rows.length > 0 && rows.every((row) => selectedIds.has(row.id))
  const someSelected = rows.some((row) => selectedIds.has(row.id))

  function toggleRow(industry: Industry, checked: boolean) {
    setSelectedIds((current) => {
      const next = new Set(current)
      if (checked) {
        next.add(industry.id)
      } else {
        next.delete(industry.id)
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
                  aria-label={t('industries.table.selectAll') || 'Select all'}
                />
              </th>
              <th scope="col" className={HEADER_CELL_CLASSES}>
                {t('industries.table.industry') || 'Industry'}
              </th>
              <th scope="col" className={HEADER_CELL_CLASSES}>
                {t('industries.table.code') || 'Code'}
              </th>
              <th scope="col" className={HEADER_CELL_CLASSES}>
                {t('industries.table.description') || 'Description'}
              </th>
              <th scope="col" className={HEADER_CELL_CLASSES}>
                {t('industries.table.status') || 'Status'}
              </th>
              <th scope="col" className={HEADER_CELL_CLASSES}>
                {t('industries.table.updated') || 'Updated'}
              </th>
            </tr>
          </thead>

          {state.status === 'ready' && rows.length > 0 && (
            <tbody
              aria-busy={isRefreshing}
              className={isRefreshing ? 'opacity-60 transition-opacity' : undefined}
            >
              {rows.map((industry) => (
                <tr key={industry.id} className="group border-b border-surface-border last:border-0 hover:bg-surface-muted">
                  <td className="w-10 px-4 py-3">
                    <Checkbox
                      checked={selectedIds.has(industry.id)}
                      onCheckedChange={(checked) => toggleRow(industry, !!checked)}
                      aria-label={t('industries.table.selectRow') || 'Select row'}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => onOpenDetails(industry)}
                      aria-label={t('industries.card.details', { name: industry.name }) || 'View details'}
                      className="flex cursor-pointer items-center gap-2.5 text-left focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                    >
                      {industry.image ? (
                        <img src={industry.image} alt={industry.name} className="h-5 w-7 rounded object-cover" />
                      ) : (
                        <div className="flex h-5 w-7 items-center justify-center rounded bg-surface-border"><Factory className="size-3 text-ink-muted" /></div>
                      )}
                      <span className="truncate text-[13px] font-semibold text-ink">
                        {industry.name}
                      </span>
                    </button>
                  </td>
                  <td className="px-4 py-3 text-[13px] text-ink-subtle">
                    {industry.code}
                  </td>
                  <td className="px-4 py-3 text-[13px] text-ink-subtle max-w-[200px] truncate">
                    {industry.description || '-'}
                  </td>
                  <td className="px-4 py-3 text-[13px]">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium ${industry.status === 'active' ? 'bg-status-active-canvas text-status-active-ink' : industry.status === 'inactive' ? 'bg-status-inactive-canvas text-status-inactive-ink' : 'bg-status-draft-canvas text-status-draft-ink'}`}>
                      <span className={`size-1.5 rounded-full ${industry.status === 'active' ? 'bg-status-active-solid' : industry.status === 'inactive' ? 'bg-status-inactive-solid' : 'bg-status-draft-solid'}`} />
                      <span className="capitalize">{industry.status}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[13px] text-ink-subtle">
                    {industry.updatedAt ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(industry.updatedAt)) : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      {state.status === 'loading' && (
        <div className="flex flex-col divide-y divide-surface-border" role="status" aria-busy="true">
          <span className="sr-only">{t('industries.states.loading') || 'Loading...'}</span>
          {Array.from({ length: SKELETON_ROW_COUNT }, (_, index) => (
            <div key={index} className="flex items-center gap-4 px-4 py-3.5">
              <span className="size-4 shrink-0 animate-pulse rounded-[4px] bg-surface-muted" />
              <span className="h-5 w-32 shrink-0 animate-pulse rounded-full bg-surface-muted" />
              <span className="ml-auto h-3 w-40 animate-pulse rounded-full bg-surface-muted" />
            </div>
          ))}
        </div>
      )}

      {state.status === 'error' && (
        <IndustriesFeedback
          bare
          icon={TriangleAlert}
          tone="danger"
          title={t('industries.states.errorTitle') || 'Error'}
          body={state.error.message}
          actionLabel={t('industries.states.errorAction') || 'Retry'}
          onAction={onRetry}
        />
      )}

      {state.status === 'ready' && rows.length === 0 && (
        <>
          {isFiltered ? (
            <IndustriesFeedback
              bare
              icon={SearchX}
              title={t('industries.states.noResultsTitle') || 'No results found'}
              body={t('industries.states.noResultsBody') || 'Try adjusting your search or filters.'}
              actionLabel={t('industries.states.noResultsAction') || 'Clear filters'}
              onAction={onClearFilters}
            />
          ) : (
            <IndustriesFeedback
              bare
              icon={Factory}
              title={t('industries.states.emptyTitle') || 'No industries yet'}
              body={t('industries.states.emptyBody') || 'Get started by creating a new industry.'}
              actionLabel={t('industries.states.emptyAction') || 'Add industry'}
              onAction={onAdd}
            />
          )}
        </>
      )}

      {state.status === 'ready' && rows.length > 0 && (
        <div className="border-t border-surface-border">
          <IndustriesPagination
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
