import { useState } from 'react'
import { Package, SearchX, TriangleAlert } from 'lucide-react'
import { useTranslation } from '@/i18n'
import { Checkbox } from '@/shared/components/ui/checkbox'
import { ProductFeedback } from './ProductFeedback'
import { ProductPagination } from './ProductPagination'
import { ProductTableRow } from './ProductTableRow'
import type {
  AsyncState,
  Product,
  ProductId,
  ProductPageSize,
} from '../types/product.types'

const SKELETON_ROW_COUNT = 8

const HEADER_CELL_CLASSES =
  'px-4 py-3 text-left text-[11px] font-medium text-ink-subtle'

export interface ProductTableProps {
  state: AsyncState<Product[]>
  isRefreshing: boolean
  isFiltered: boolean
  page: number
  pageCount: number
  pageSize: ProductPageSize
  totalCount: number
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: ProductPageSize) => void
  onRetry: () => void
  onClearFilters: () => void
  onAdd: () => void
  onOpenDetails: (product: Product) => void
}

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
        <div className="flex flex-col divide-y divide-surface-border" role="status" aria-busy="true">
          <span className="sr-only">{t('product.states.loading')}</span>
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
