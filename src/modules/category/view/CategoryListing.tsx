import { useState } from 'react'
import { useSidebar } from '@/shared/components/layout'
import { CategoryDeleteDialog } from '../components/CategoryDeleteDialog'
import { CategoryDetailsDialog } from '../components/CategoryDetailsDialog'
import { CategoryFormDialog } from '../components/CategoryFormDialog'
import { CategoryGrid } from '../components/CategoryGrid'
import { CategoryListingFooter } from '../components/CategoryListingFooter'
import { CategoryListingHeader } from '../components/CategoryListingHeader'
import { CategoryOverviewPanel } from '../components/CategoryOverviewPanel'
import { CategoryStatusOverview } from '../components/CategoryStatusOverview'
import { CategoryTable } from '../components/CategoryTable'
import { useCategoryListing } from '../hooks/useCategoryListing'
import type { Category, CategoryDialog, CategoryView } from '../types/category.types'

function CategoryListing() {
  const { toggleCollapsed } = useSidebar()
  const [dialog, setDialog] = useState<CategoryDialog>({ kind: 'none' })
  const [view, setView] = useState<CategoryView>('list')
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
    createCategory,
    updateCategory,
    deleteCategory,
    page,
    setPage,
    pageSize,
    setPageSize,
    pageCount,
    totalCount,
    masterCount,
    paginatedList,
  } = useCategoryListing()

  const closeDialog = () => setDialog({ kind: 'none' })
  const openCreate = () => setDialog({ kind: 'form', mode: 'create' })
  const openEdit = (category: Category) =>
    setDialog({ kind: 'form', mode: 'edit', category })
  const openDuplicate = (category: Category) =>
    setDialog({ kind: 'form', mode: 'duplicate', category })
  const openDelete = (category: Category) => setDialog({ kind: 'delete', category })
  const openDetails = (category: Category) =>
    setDialog({ kind: 'details', category })

  return (
    <div className="flex min-h-full flex-col gap-5 bg-canvas p-5">
      <div className="flex flex-col gap-4 rounded-xl bg-surface p-4">
        <CategoryListingHeader
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
          <CategoryOverviewPanel
            state={overview}
            range={range}
            onRangeChange={setRange}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            onRetry={refresh}
          />
        ) : (
          <CategoryStatusOverview
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
        <CategoryGrid
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
        <CategoryTable
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

      <CategoryListingFooter />

      {dialog.kind === 'form' && (
        <CategoryFormDialog
          mode={dialog.mode}
          category={dialog.category}
          submitting={isMutating}
          onSubmit={(payload) => {
            const target = dialog.category

            return dialog.mode === 'edit' && target
              ? updateCategory(target.code, payload)
              : createCategory(payload)
          }}
          onClose={closeDialog}
        />
      )}

      {dialog.kind === 'delete' && (
        <CategoryDeleteDialog
          category={dialog.category}
          submitting={isMutating}
          onConfirm={deleteCategory}
          onClose={closeDialog}
        />
      )}

      {dialog.kind === 'details' && (
        <CategoryDetailsDialog
          category={dialog.category}
          onEdit={openEdit}
          onDuplicate={openDuplicate}
          onDelete={openDelete}
          onClose={closeDialog}
        />
      )}
    </div>
  )
}

export { CategoryListing }
