import { useState } from 'react'
import { Folder, SearchX, TriangleAlert } from 'lucide-react'
import { useTranslation } from '@/i18n'
import { Checkbox } from '@/shared/components/ui/checkbox'
import { CategoryFeedback } from './CategoryFeedback'
import { CategoryPagination } from './CategoryPagination'
import { CategoryTableRow } from './CategoryTableRow'
import type {
  AsyncState,
  Category,
  CategoryId,
  CategoryPageSize,
} from '../types/category.types'

const SKELETON_ROW_COUNT = 8

const HEADER_CELL_CLASSES =
  'px-4 py-3 text-left text-[11px] font-medium text-ink-subtle'

export interface CategoryTableProps {
  state: AsyncState<Category[]>
  isRefreshing: boolean
  isFiltered: boolean
  page: number
  pageCount: number
  pageSize: CategoryPageSize
  totalCount: number
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: CategoryPageSize) => void
  onRetry: () => void
  onClearFilters: () => void
  onAdd: () => void
  onOpenDetails: (category: Category) => void
}

function CategoryTable({
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
}: CategoryTableProps) {
  const { t } = useTranslation()
  const [selectedIds, setSelectedIds] = useState<ReadonlySet<CategoryId>>(
    new Set()
  )

  const rows = state.status === 'ready' ? state.data : []
  const allSelected = rows.length > 0 && rows.every((row) => selectedIds.has(row.code))
  const someSelected = rows.some((row) => selectedIds.has(row.code))

  function toggleRow(category: Category, checked: boolean) {
    setSelectedIds((current) => {
      const next = new Set(current)

      if (checked) {
        next.add(category.code)
      } else {
        next.delete(category.code)
      }

      return next
    })
  }

  function toggleAll(checked: boolean) {
    setSelectedIds(checked ? new Set(rows.map((row) => row.code)) : new Set())
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
                  aria-label={t('category.table.selectAll')}
                />
              </th>
              <th scope="col" className={HEADER_CELL_CLASSES}>
                {t('category.table.category')}
              </th>
              <th scope="col" className={HEADER_CELL_CLASSES}>
                {t('category.table.code')}
              </th>
              <th scope="col" className={HEADER_CELL_CLASSES}>
                {t('category.table.description')}
              </th>
              <th scope="col" className={HEADER_CELL_CLASSES}>
                {t('category.table.status')}
              </th>
              <th scope="col" className={HEADER_CELL_CLASSES}>
                {t('category.table.updated')}
              </th>
            </tr>
          </thead>

          {state.status === 'ready' && rows.length > 0 && (
            <tbody
              aria-busy={isRefreshing}
              className={isRefreshing ? 'opacity-60 transition-opacity' : undefined}
            >
              {rows.map((category) => (
                <CategoryTableRow
                  key={category.code}
                  category={category}
                  selected={selectedIds.has(category.code)}
                  onToggleSelected={toggleRow}
                  onOpenDetails={onOpenDetails}
                />
              ))}
            </tbody>
          )}
        </table>
      </div>

      {state.status === 'loading' && (
        <div className="flex flex-col divide-y divide-surface-border" role="status" aria-busy="true">
          <span className="sr-only">{t('category.states.loading')}</span>
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
        <CategoryFeedback
          bare
          icon={TriangleAlert}
          tone="danger"
          title={t('category.states.errorTitle')}
          body={state.error.message}
          actionLabel={t('category.states.errorAction')}
          onAction={onRetry}
        />
      )}

      {state.status === 'ready' && rows.length === 0 && (
        <>
          {isFiltered ? (
            <CategoryFeedback
              bare
              icon={SearchX}
              title={t('category.states.noResultsTitle')}
              body={t('category.states.noResultsBody')}
              actionLabel={t('category.states.noResultsAction')}
              onAction={onClearFilters}
            />
          ) : (
            <CategoryFeedback
              bare
              icon={Folder}
              title={t('category.states.emptyTitle')}
              body={t('category.states.emptyBody')}
              actionLabel={t('category.states.emptyAction')}
              onAction={onAdd}
            />
          )}
        </>
      )}

      {state.status === 'ready' && rows.length > 0 && (
        <div className="border-t border-surface-border">
          <CategoryPagination
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

export { CategoryTable }
