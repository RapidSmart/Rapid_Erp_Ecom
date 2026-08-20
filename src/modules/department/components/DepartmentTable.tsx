import { useState } from 'react'
import { Building2, SearchX, TriangleAlert } from 'lucide-react'
import { useTranslation } from '@/i18n'
import { Checkbox } from '@/shared/components/ui/checkbox'
import { DepartmentFeedback } from './DepartmentFeedback'
import { DepartmentPagination } from './DepartmentPagination'
import { DepartmentTableRow } from './DepartmentTableRow'
import { DepartmentTableSkeleton } from './skeleton/DepartmentTableSkeleton'
import type {
  Department,
  DepartmentId,
  DepartmentPageSize,
  DepartmentTableProps,
} from '../types/department.types'

const SKELETON_ROW_COUNT = 8

const HEADER_CELL_CLASSES =
  'px-4 py-3 text-left text-[11px] font-medium text-ink-subtle'

export function DepartmentTable({
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
}: DepartmentTableProps & {
  page?: number
  pageCount?: number
  pageSize?: DepartmentPageSize
  totalCount?: number
  onPageChange?: (page: number) => void
  onPageSizeChange?: (pageSize: DepartmentPageSize) => void
}) {
  const { t } = useTranslation()
  const [selectedIds, setSelectedIds] = useState<ReadonlySet<DepartmentId>>(
    new Set()
  )

  const rows = state.status === 'ready' ? state.data : []
  const allSelected = rows.length > 0 && rows.every((row) => selectedIds.has(row.code))
  const someSelected = rows.some((row) => selectedIds.has(row.code))

  function toggleRow(department: Department, checked: boolean) {
    setSelectedIds((current) => {
      const next = new Set(current)

      if (checked) {
        next.add(department.code)
      } else {
        next.delete(department.code)
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
                  aria-label={t('department.table.selectAll')}
                />
              </th>
              <th scope="col" className={HEADER_CELL_CLASSES}>
                {t('department.table.department')}
              </th>
              <th scope="col" className={HEADER_CELL_CLASSES}>
                {t('department.table.code')}
              </th>
              <th scope="col" className={HEADER_CELL_CLASSES}>
                {t('department.table.description')}
              </th>
              <th scope="col" className={HEADER_CELL_CLASSES}>
                {t('department.table.status')}
              </th>
              <th scope="col" className={HEADER_CELL_CLASSES}>
                {t('department.table.updated')}
              </th>
            </tr>
          </thead>

          {state.status === 'ready' && rows.length > 0 && (
            <tbody
              aria-busy={isRefreshing}
              className={isRefreshing ? 'opacity-60 transition-opacity' : undefined}
            >
              {rows.map((department) => (
                <DepartmentTableRow
                  key={department.code}
                  department={department}
                  selected={selectedIds.has(department.code)}
                  onToggleSelected={toggleRow}
                  onOpenDetails={onOpenDetails}
                />
              ))}
            </tbody>
          )}
        </table>
      </div>

      {state.status === 'loading' && (
        <DepartmentTableSkeleton rowCount={SKELETON_ROW_COUNT} />
      )}

      {state.status === 'error' && (
        <DepartmentFeedback
          actionIcon={TriangleAlert}
          variant="error"
          title={t('department.states.errorTitle')}
          body={state.error.message}
          actionLabel={t('department.states.errorAction')}
          onAction={onRetry}
        />
      )}

      {state.status === 'ready' && rows.length === 0 && (
        isFiltered ? (
          <DepartmentFeedback
            actionIcon={SearchX}
            variant="no-results"
            title={t('department.states.noResultsTitle')}
            body={t('department.states.noResultsBody')}
            actionLabel={t('department.states.noResultsAction')}
            onAction={onClearFilters}
          />
        ) : (
          <DepartmentFeedback
            actionIcon={Building2}
            variant="empty"
            title={t('department.states.emptyTitle')}
            body={t('department.states.emptyBody')}
            actionLabel={t('department.states.emptyAction')}
            onAction={onAdd}
          />
        )
      )}

      {state.status === 'ready' && rows.length > 0 && (
        <div className="border-t border-surface-border">
          <DepartmentPagination
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
