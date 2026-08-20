import { useState } from 'react'
import { SearchX, SwatchBook, TriangleAlert } from 'lucide-react'
import { useTranslation } from '@/i18n'
import { Checkbox } from '@/shared/components/ui/checkbox'
import { ColorSwatch } from './ColorSwatch'
import { ColorsFeedback } from './ColorsFeedback'
import { ColorsPagination } from './ColorsPagination'
import type { AsyncState, Color, ColorId, ColorPageSize } from '../types/colors.types'


const SKELETON_ROW_COUNT = 8

const HEADER_CELL_CLASSES = 'px-4 py-3 text-left text-[11px] font-medium text-ink-subtle'

export interface ColorsTableProps {
  state: AsyncState<Color[]>
  isRefreshing: boolean
  isFiltered: boolean
  page: number
  pageCount: number
  pageSize: ColorPageSize
  totalCount: number
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: ColorPageSize) => void
  onRetry: () => void
  onClearFilters: () => void
  onAdd: () => void
  onEdit: (color: Color) => void
  onOpenDetails: (color: Color) => void
}

export function ColorsTable({
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
}: ColorsTableProps) {
  const { t } = useTranslation()
  const [selectedIds, setSelectedIds] = useState<ReadonlySet<ColorId>>(new Set())

  const rows = state.status === 'ready' ? state.data : []
  const allSelected = rows.length > 0 && rows.every((row) => selectedIds.has(row.id))
  const someSelected = rows.some((row) => selectedIds.has(row.id))

  function toggleRow(color: Color, checked: boolean) {
    setSelectedIds((current) => {
      const next = new Set(current)
      if (checked) {
        next.add(color.id)
      } else {
        next.delete(color.id)
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
                  aria-label={t('colors.table.selectAll') || 'Select all'}
                />
              </th>
              <th scope="col" className={HEADER_CELL_CLASSES}>
                {t('colors.table.color') || 'Color'}
              </th>
              <th scope="col" className={HEADER_CELL_CLASSES}>
                {t('colors.table.code') || 'Code'}
              </th>
              <th scope="col" className={HEADER_CELL_CLASSES}>
                {t('colors.table.description') || 'Description'}
              </th>
              <th scope="col" className={HEADER_CELL_CLASSES}>
                {t('colors.table.status') || 'Status'}
              </th>
              <th scope="col" className={HEADER_CELL_CLASSES}>
                {t('colors.table.updated') || 'Updated'}
              </th>
            </tr>
          </thead>

          {state.status === 'ready' && rows.length > 0 && (
            <tbody
              aria-busy={isRefreshing}
              className={isRefreshing ? 'opacity-60 transition-opacity' : undefined}
            >
              {rows.map((color) => (
                <tr key={color.id} className="group border-b border-surface-border last:border-0 hover:bg-surface-muted">
                  <td className="w-10 px-4 py-3">
                    <Checkbox
                      checked={selectedIds.has(color.id)}
                      onCheckedChange={(checked) => toggleRow(color, !!checked)}
                      aria-label={t('colors.table.selectRow') || 'Select row'}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => onOpenDetails(color)}
                      aria-label={t('colors.card.details', { name: color.name }) || 'View details'}
                      className="flex cursor-pointer items-center gap-2.5 text-left focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                    >
                      {color.image ? (
                        <img src={color.image} alt={color.name} className="h-5 w-7 rounded object-cover" />
                      ) : (
                        <ColorSwatch color={color} size="md" />
                      )}
                      <span className="truncate text-[13px] font-semibold text-ink">
                        {color.name}
                      </span>
                    </button>
                  </td>
                  <td className="px-4 py-3 text-[13px] text-ink-subtle">
                    {color.code}
                  </td>
                  <td className="px-4 py-3 text-[13px] text-ink-subtle max-w-[200px] truncate">
                    {color.description || '-'}
                  </td>
                  <td className="px-4 py-3 text-[13px]">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium ${color.status === 'active' ? 'bg-status-active-canvas text-status-active-ink' : color.status === 'inactive' ? 'bg-status-inactive-canvas text-status-inactive-ink' : 'bg-status-draft-canvas text-status-draft-ink'}`}>
                      <span className={`size-1.5 rounded-full ${color.status === 'active' ? 'bg-status-active-solid' : color.status === 'inactive' ? 'bg-status-inactive-solid' : 'bg-status-draft-solid'}`} />
                      <span className="capitalize">{color.status}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[13px] text-ink-subtle">
                    {color.updatedAt ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(color.updatedAt)) : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      {state.status === 'loading' && (
        <div className="flex flex-col divide-y divide-surface-border" role="status" aria-busy="true">
          <span className="sr-only">{t('colors.states.loading') || 'Loading...'}</span>
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
        <ColorsFeedback
          bare
          icon={TriangleAlert}
          tone="danger"
          title={t('colors.states.errorTitle') || 'Error'}
          body={state.error.message}
          actionLabel={t('colors.states.errorAction') || 'Retry'}
          onAction={onRetry}
        />
      )}

      {state.status === 'ready' && rows.length === 0 && (
        <>
          {isFiltered ? (
            <ColorsFeedback
              bare
              icon={SearchX}
              title={t('colors.states.noResultsTitle') || 'No results found'}
              body={t('colors.states.noResultsBody') || 'Try adjusting your search or filters.'}
              actionLabel={t('colors.states.noResultsAction') || 'Clear filters'}
              onAction={onClearFilters}
            />
          ) : (
            <ColorsFeedback
              bare
              icon={SwatchBook}
              title={t('colors.states.emptyTitle') || 'No colors yet'}
              body={t('colors.states.emptyBody') || 'Get started by creating a new color.'}
              actionLabel={t('colors.states.emptyAction') || 'Add color'}
              onAction={onAdd}
            />
          )}
        </>
      )}

      {state.status === 'ready' && rows.length > 0 && (
        <div className="border-t border-surface-border">
          <ColorsPagination
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
