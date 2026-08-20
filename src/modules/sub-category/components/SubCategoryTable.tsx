import { useState } from 'react'
import { FolderTree, SearchX, TriangleAlert } from 'lucide-react'
import { useTranslation } from '@/i18n'
import { Checkbox } from '@/shared/components/ui/checkbox'
import { SubCategoryFeedback } from './SubCategoryFeedback'
import { SubCategoryPagination } from './SubCategoryPagination'
import { SubCategoryTableRow } from './SubCategoryTableRow'
import { SubCategoryTableSkeleton } from './skeleton/SubCategoryTableSkeleton'
import type {
  SubCategory,
  SubCategoryId,
  SubCategoryPageSize,
  SubCategoryTableProps,
} from '../types/sub-category.types'

const SKELETON_ROW_COUNT = 8

const HEADER_CELL_CLASSES =
  'px-4 py-3 text-left text-[11px] font-medium text-ink-subtle'

export function SubCategoryTable({
  state,
  isRefreshing,
  isFiltered,
  onRetry,
  onClearFilters,
  onAdd,
  onOpenDetails,
  page = 1,
  pageCount = 1,
  pageSize = 10,
  totalCount = 0,
  onPageChange = () => {},
  onPageSizeChange = () => {},
}: SubCategoryTableProps & {
  page?: number
  pageCount?: number
  pageSize?: SubCategoryPageSize
  totalCount?: number
  onPageChange?: (page: number) => void
  onPageSizeChange?: (pageSize: SubCategoryPageSize) => void
}) {
  const { t } = useTranslation()
  const [selectedIds, setSelectedIds] = useState<ReadonlySet<SubCategoryId>>(
    new Set()
  )

  const rows = state.status === 'ready' ? state.data : []
  const allSelected = rows.length > 0 && rows.every((row) => selectedIds.has(row.code))
  const someSelected = rows.some((row) => selectedIds.has(row.code))

  function toggleRow(subCategory: SubCategory, checked: boolean) {
    setSelectedIds((current) => {
      const next = new Set(current)

      if (checked) {
        next.add(subCategory.code)
      } else {
        next.delete(subCategory.code)
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
                  onCheckedChange={(checked) => toggleAll(!!checked)}
                  aria-label={t('subCategory.table.selectAll')}
                />
              </th>
              <th scope="col" className={HEADER_CELL_CLASSES}>
                {t('subCategory.table.subCategory')}
              </th>
              <th scope="col" className={HEADER_CELL_CLASSES}>
                {t('subCategory.table.code')}
              </th>
              <th scope="col" className={HEADER_CELL_CLASSES}>
                {t('subCategory.table.description')}
              </th>
              <th scope="col" className={HEADER_CELL_CLASSES}>
                {t('subCategory.table.status')}
              </th>
              <th scope="col" className={HEADER_CELL_CLASSES}>
                {t('subCategory.table.updated')}
              </th>
            </tr>
          </thead>

          {state.status === 'ready' && rows.length > 0 && (
            <tbody
              aria-busy={isRefreshing}
              className={isRefreshing ? 'opacity-60 transition-opacity' : undefined}
            >
              {rows.map((subCategory) => (
                <SubCategoryTableRow
                  key={subCategory.code}
                  subCategory={subCategory}
                  selected={selectedIds.has(subCategory.code)}
                  onToggleSelected={toggleRow}
                  onOpenDetails={onOpenDetails}
                />
              ))}
            </tbody>
          )}
        </table>
      </div>

      {state.status === 'loading' && (
        <SubCategoryTableSkeleton rowCount={SKELETON_ROW_COUNT} />
      )}

      {state.status === 'error' && (
        <SubCategoryFeedback
          actionIcon={TriangleAlert}
          variant="error"
          title={t('subCategory.states.errorTitle')}
          body={state.error.message}
          actionLabel={t('subCategory.states.errorAction')}
          onAction={onRetry}
        />
      )}

      {state.status === 'ready' && rows.length === 0 && (
        isFiltered ? (
          <SubCategoryFeedback
            actionIcon={SearchX}
            variant="no-results"
            title={t('subCategory.states.noResultsTitle')}
            body={t('subCategory.states.noResultsBody')}
            actionLabel={t('subCategory.states.noResultsAction')}
            onAction={onClearFilters}
          />
        ) : (
          <SubCategoryFeedback
            actionIcon={FolderTree}
            variant="empty"
            title={t('subCategory.states.emptyTitle')}
            body={t('subCategory.states.emptyBody')}
            actionLabel={t('subCategory.states.emptyAction')}
            onAction={onAdd}
          />
        )
      )}

      {state.status === 'ready' && rows.length > 0 && (
        <div className="border-t border-surface-border">
          <SubCategoryPagination
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
