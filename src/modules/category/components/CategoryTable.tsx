import { useState } from 'react'
import { Folder, SearchX, TriangleAlert } from 'lucide-react'
import { useTranslation } from '@/i18n'
import { Checkbox } from '@/shared/components/ui/checkbox'
import { Feedback, Pagination, TableSkeleton } from '@/modules/common-data'
import { CategoryTableRow } from './CategoryTableRow'
import type {
  Category,
  CategoryId,
  CategoryTableProps,
} from '../types/category.types'

const SKELETON_ROW_COUNT = 8

const HEADER_CELL_CLASSES =
  'px-4 py-3 text-left text-[11px] font-medium text-ink-subtle'

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
        <TableSkeleton rowCount={SKELETON_ROW_COUNT} />
      )}

      {state.status === 'error' && (
        <Feedback
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
            <Feedback
              bare
              icon={SearchX}
              title={t('category.states.noResultsTitle')}
              body={t('category.states.noResultsBody')}
              actionLabel={t('category.states.noResultsAction')}
              onAction={onClearFilters}
            />
          ) : (
            <Feedback
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
          <Pagination
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
