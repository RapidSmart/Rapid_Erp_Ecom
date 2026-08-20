import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '@/i18n'
import { useSidebar } from '@/shared/components/layout'
import {
  DeleteConfirmDialog,
  ListingHeader,
  ListingFooter,
} from '@/modules/common-data'
import { SubCategoryDetailsDialog } from '../components/dialog/SubCategoryDetailsDialog'
import { SubCategoryGrid } from '../components/SubCategoryGrid'
import { SubCategoryOverviewPanel } from '../components/SubCategoryOverviewPanel'
import { SubCategoryStatusOverview } from '../components/SubCategoryStatusOverview'
import { SubCategoryTable } from '../components/SubCategoryTable'
import { useSubCategoryListing } from '../hooks/useSubCategoryListing'
import type { SubCategory, SubCategoryDialog, SubCategoryView } from '../types/sub-category.types'

export function SubCategoryListing() {
  const { t } = useTranslation()
  const { toggleCollapsed } = useSidebar()
  const [dialog, setDialog] = useState<SubCategoryDialog>({ kind: 'none' })
  const [view, setView] = useState<SubCategoryView>('list')
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
    deleteSubCategory,
    page,
    setPage,
    pageSize,
    setPageSize,
    pageCount,
    totalCount,
    masterCount,
    paginatedList,
  } = useSubCategoryListing()

  const navigate = useNavigate()
  const closeDialog = () => setDialog({ kind: 'none' })
  const openCreate = () => navigate('/sub-category/new')
  const openEdit = (subCategory: SubCategory) => navigate(`/sub-category/${subCategory.code}/edit`)
  const openDuplicate = (subCategory: SubCategory) =>
    navigate('/sub-category/new', { state: { initialValues: { ...subCategory, code: '' } } })
  const openDelete = (subCategory: SubCategory) => setDialog({ kind: 'delete', subCategory })
  const openDetails = (subCategory: SubCategory) =>
    setDialog({ kind: 'details', subCategory })

  return (
    <div className="flex min-h-full flex-col gap-5 bg-canvas p-5">
      <div className="flex flex-col gap-4 rounded-xl bg-surface p-4">
        <ListingHeader
          title={t('subCategory.listing.title')}
          search={search}
          onSearchChange={setSearch}
          onToggleMenu={toggleCollapsed}
          totalCount={masterCount}
          view={view}
          onToggleView={() =>
            setView((current) => (current === 'grid' ? 'list' : 'grid'))
          }
          searchPlaceholder={t('subCategory.listing.searchPlaceholder')}
          addHref="/sub-category/new"
          addLabel={t('subCategory.listing.add')}
        />

        {view === 'grid' ? (
          <SubCategoryOverviewPanel
            overviewState={overview}
            range={range}
            onRangeChange={setRange}
            activeStatus={statusFilter}
            onStatusChange={setStatusFilter}
            onRetry={refresh}
          />
        ) : (
          <SubCategoryStatusOverview
            overviewState={overview}
            recordCount={totalCount}
            range={range}
            onRangeChange={setRange}
            activeStatus={statusFilter}
            onStatusChange={setStatusFilter}
            onRetry={refresh}
          />
        )}
      </div>

      {view === 'grid' ? (
        <SubCategoryGrid
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
        <SubCategoryTable
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
          open={true}
          title={t('subCategory.delete.title')}
          description={t('subCategory.delete.description', { name: dialog.subCategory.name })}
          confirmText={t('subCategory.delete.confirm')}
          cancelText={t('subCategory.delete.cancel')}
          deletingText={t('subCategory.delete.deleting')}
          submitting={isMutating}
          onConfirm={async () => {
            await deleteSubCategory(dialog.subCategory.code)
            closeDialog()
          }}
          onClose={closeDialog}
        />
      )}

      {dialog.kind === 'details' && (
        <SubCategoryDetailsDialog
          subCategory={dialog.subCategory}
          onEdit={openEdit}
          onDuplicate={openDuplicate}
          onDelete={openDelete}
          onClose={closeDialog}
        />
      )}
    </div>
  )
}
