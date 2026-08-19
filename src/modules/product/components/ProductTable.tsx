import { useState } from 'react'
import { Package, SearchX, TriangleAlert } from 'lucide-react'
import { useTranslation } from '@/i18n'
import { Checkbox } from '@/shared/components/ui/checkbox'
import { ProductFeedback } from './ProductFeedback'
import { ProductPagination } from './ProductPagination'
import { ProductTableRow } from './ProductTableRow'
import { ProductTableSkeleton } from './skeleton/ProductTableSkeleton'
import type {
  Product,
  ProductId,
  ProductTableProps,
} from '../types/product.types'

const SKELETON_ROW_COUNT = 8

const HEADER_CELL_CLASSES =
  'px-4 py-3 text-left text-[11px] font-medium text-ink-subtle'


function ProductTable({
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
}: ProductTableProps) {
  const { t } = useTranslation()
  const [selectedIds, setSelectedIds] = useState<ReadonlySet<ProductId>>(
    new Set()
  )

  const rows = state.status === 'ready' ? state.data : []
  const allSelected = rows.length > 0 && rows.every((row) => selectedIds.has(row.id))
  const someSelected = rows.some((row) => selectedIds.has(row.id))

  function toggleRow(product: Product, checked: boolean) {
    setSelectedIds((current) => {
      const next = new Set(current)

      if (checked) {
        next.add(product.id)
      } else {
        next.delete(product.id)
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
                  aria-label={t('product.table.selectAll')}
                />
              </th>
              <th scope="col" className={HEADER_CELL_CLASSES}>
                {t('product.table.product')}
              </th>
              <th scope="col" className={HEADER_CELL_CLASSES}>
                {t('product.table.sku')}
              </th>
              <th scope="col" className={HEADER_CELL_CLASSES}>
                {t('product.table.category')}
              </th>
              <th scope="col" className={HEADER_CELL_CLASSES}>
                {t('product.table.price')}
              </th>
              <th scope="col" className={HEADER_CELL_CLASSES}>
                {t('product.table.stock')}
              </th>
              <th scope="col" className={HEADER_CELL_CLASSES}>
                {t('product.table.status')}
              </th>
              <th scope="col" className={HEADER_CELL_CLASSES}>
                {t('product.table.updated')}
              </th>
            </tr>
          </thead>

          {state.status === 'ready' && rows.length > 0 && (
            <tbody
              aria-busy={isRefreshing}
              className={isRefreshing ? 'opacity-60 transition-opacity' : undefined}
            >
              {rows.map((product) => (
                <ProductTableRow
                  key={product.id}
                  product={product}
                  selected={selectedIds.has(product.id)}
                  onToggleSelected={toggleRow}
                  onOpenDetails={onOpenDetails}
                />
              ))}
            </tbody>
          )}
        </table>
      </div>

      {state.status === 'loading' && (
        <ProductTableSkeleton rowCount={SKELETON_ROW_COUNT} />
      )}

      {state.status === 'error' && (
        <ProductFeedback
          bare
          icon={TriangleAlert}
          tone="danger"
          title={t('product.states.errorTitle')}
          body={state.error.message}
          actionLabel={t('product.states.errorAction')}
          onAction={onRetry}
        />
      )}

      {state.status === 'ready' && rows.length === 0 && (
        <>
          {isFiltered ? (
            <ProductFeedback
              bare
              icon={SearchX}
              title={t('product.states.noResultsTitle')}
              body={t('product.states.noResultsBody')}
              actionLabel={t('product.states.noResultsAction')}
              onAction={onClearFilters}
            />
          ) : (
            <ProductFeedback
              bare
              icon={Package}
              title={t('product.states.emptyTitle')}
              body={t('product.states.emptyBody')}
              actionLabel={t('product.states.emptyAction')}
              onAction={onAdd}
            />
          )}
        </>
      )}

      {state.status === 'ready' && rows.length > 0 && (
        <div className="border-t border-surface-border">
          <ProductPagination
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

export { ProductTable }
