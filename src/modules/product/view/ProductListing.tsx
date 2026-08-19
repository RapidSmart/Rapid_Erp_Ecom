import { useState } from 'react'
import { useSidebar } from '@/shared/components/layout'
import { ProductDeleteDialog } from '../components/dialog/ProductDeleteDialog'
import { ProductDetailsDialog } from '../components/dialog/ProductDetailsDialog'
import { ProductFormDialog } from '../components/dialog/ProductFormDialog'
import { ProductGrid } from '../components/ProductGrid'
import { ProductListingFooter } from '../components/ProductListingFooter'
import { ProductListingHeader } from '../components/ProductListingHeader'
import { ProductOverviewPanel } from '../components/ProductOverviewPanel'
import { ProductStatusOverview } from '../components/ProductStatusOverview'
import { ProductTable } from '../components/ProductTable'
import { useProductListing } from '../hooks/useProductListing'
import type { Product, ProductDialog, ProductView } from '../types/product.types'

function ProductListing() {
  const { toggleCollapsed } = useSidebar()
  const [dialog, setDialog] = useState<ProductDialog>({ kind: 'none' })
  const [view, setView] = useState<ProductView>('list')
  const {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    range,
    setRange,
    list,
    overview,
    isRefreshing,
    isMutating,
    isFiltered,
    clearFilters,
    refresh,
    createProduct,
    updateProduct,
    deleteProduct,
    page,
    setPage,
    pageSize,
    setPageSize,
    pageCount,
    totalCount,
    masterCount,
    paginatedList,
  } = useProductListing()

  const closeDialog = () => setDialog({ kind: 'none' })
  const openCreate = () => setDialog({ kind: 'form', mode: 'create' })
  const openEdit = (product: Product) =>
    setDialog({ kind: 'form', mode: 'edit', product })
  const openDuplicate = (product: Product) =>
    setDialog({ kind: 'form', mode: 'duplicate', product })
  const openDelete = (product: Product) => setDialog({ kind: 'delete', product })
  const openDetails = (product: Product) =>
    setDialog({ kind: 'details', product })

  return (
    <div className="flex min-h-full flex-col gap-5 bg-canvas p-5">
      <div className="flex flex-col gap-4 rounded-xl bg-surface p-4">
        <ProductListingHeader
          search={search}
          onSearchChange={setSearch}
          onToggleMenu={toggleCollapsed}
          onAdd={openCreate}
          totalCount={masterCount}
          view={view}
          onToggleView={() =>
            setView((current) => (current === 'grid' ? 'list' : 'grid'))
          }
        />

        {view === 'grid' ? (
          <ProductOverviewPanel
            state={overview}
            range={range}
            onRangeChange={setRange}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            onRetry={refresh}
          />
        ) : (
          <ProductStatusOverview
            state={overview}
            recordCount={totalCount}
            range={range}
            onRangeChange={setRange}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            onRetry={refresh}
          />
        )}
      </div>

      {view === 'grid' ? (
        <ProductGrid
          state={list}
          isRefreshing={isRefreshing}
          isFiltered={isFiltered}
          onRetry={refresh}
          onClearFilters={clearFilters}
          onAdd={openCreate}
          onOpenDetails={openDetails}
          onEdit={openEdit}
          onDuplicate={openDuplicate}
          onDelete={openDelete}
        />
      ) : (
        <ProductTable
          state={paginatedList}
          isRefreshing={isRefreshing}
          isFiltered={isFiltered}
          page={page}
          pageCount={pageCount}
          pageSize={pageSize}
          totalCount={totalCount}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          onRetry={refresh}
          onClearFilters={clearFilters}
          onAdd={openCreate}
          onOpenDetails={openDetails}
        />
      )}

      <ProductListingFooter />

      {dialog.kind === 'form' && (
        <ProductFormDialog
          mode={dialog.mode}
          product={dialog.product}
          submitting={isMutating}
          onSubmit={(payload) => {
            const target = dialog.product

            return dialog.mode === 'edit' && target
              ? updateProduct(target.id, payload)
              : createProduct(payload)
          }}
          onClose={closeDialog}
        />
      )}

      {dialog.kind === 'delete' && (
        <ProductDeleteDialog
          product={dialog.product}
          submitting={isMutating}
          onConfirm={deleteProduct}
          onClose={closeDialog}
        />
      )}

      {dialog.kind === 'details' && (
        <ProductDetailsDialog
          product={dialog.product}
          onEdit={openEdit}
          onDuplicate={openDuplicate}
          onDelete={openDelete}
          onClose={closeDialog}
        />
      )}
    </div>
  )
}

export { ProductListing }
