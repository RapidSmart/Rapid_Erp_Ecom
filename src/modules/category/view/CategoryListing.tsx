import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '@/i18n'
import { useSidebar } from '@/shared/components/layout'
import {
  DeleteConfirmDialog,
  ListingHeader,
  ListingFooter,
} from '@/modules/common-data'
import { CategoryDetailsDialog } from '../components/dialog/CategoryDetailsDialog'
import { CategoryGrid } from '../components/CategoryGrid'
import { CategoryOverviewPanel } from '../components/CategoryOverviewPanel'
import { CategoryStatusOverview } from '../components/CategoryStatusOverview'
import { CategoryTable } from '../components/CategoryTable'
import { useCategoryListing } from '../hooks/useCategoryListing'
import type { Category, CategoryDialog, CategoryView } from '../types/category.types'

function CategoryListing() {
  const { t } = useTranslation()
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

  const navigate = useNavigate()
  const closeDialog = () => setDialog({ kind: 'none' })
  const openCreate = () => navigate('/category/new')
  const openEdit = (category: Category) => navigate(`/category/${category.code}/edit`)
  const openDuplicate = (category: Category) =>
    navigate('/category/new', { state: { initialValues: { ...category, code: '' } } })
  const openDelete = (category: Category) => setDialog({ kind: 'delete', category })
  const openDetails = (category: Category) =>
    setDialog({ kind: 'details', category })

  return (
    <div className="flex min-h-full flex-col gap-5 bg-canvas p-5">
      <div className="flex flex-col gap-4 rounded-xl bg-surface p-4">
        <ListingHeader
          title={t('category.listing.title')}
          search={search}
          onSearchChange={setSearch}
          onToggleMenu={toggleCollapsed}
          totalCount={masterCount}
          view={view}
          onToggleView={() =>
            setView((current) => (current === 'grid' ? 'list' : 'grid'))
          }
          searchPlaceholder={t('category.listing.searchPlaceholder')}
          addHref="/category/new"
          addLabel={t('category.listing.add')}
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

      <ListingFooter />

      {dialog.kind === 'delete' && (
        <DeleteConfirmDialog
          open
          title={t('category.delete.title')}
          description={t('category.delete.description', { name: dialog.category.name })}
          confirmText={t('category.delete.confirm')}
          cancelText={t('category.delete.cancel')}
          deletingText={t('category.delete.deleting')}
          submitting={isMutating}
          onConfirm={async () => {
            const failure = await deleteCategory(dialog.category.code)
            if (!failure) closeDialog()
          }}
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
