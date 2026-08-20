import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '@/i18n'
import { useSidebar } from '@/shared/components/layout'
import {
  DeleteConfirmDialog,
  ListingHeader,
  ListingFooter,
} from '@/modules/common-data'
import { DepartmentDetailsDialog } from '../components/dialog/DepartmentDetailsDialog'
import { DepartmentGrid } from '../components/DepartmentGrid'
import { DepartmentOverviewPanel } from '../components/DepartmentOverviewPanel'
import { DepartmentStatusOverview } from '../components/DepartmentStatusOverview'
import { DepartmentTable } from '../components/DepartmentTable'
import { useDepartmentListing } from '../hooks/useDepartmentListing'
import type { Department, DepartmentDialog, DepartmentView } from '../types/department.types'

export function DepartmentListing() {
  const { t } = useTranslation()
  const { toggleCollapsed } = useSidebar()
  const [dialog, setDialog] = useState<DepartmentDialog>({ kind: 'none' })
  const [view, setView] = useState<DepartmentView>('list')
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
    deleteDepartment,
    page,
    setPage,
    pageSize,
    setPageSize,
    pageCount,
    totalCount,
    masterCount,
    paginatedList,
  } = useDepartmentListing()

  const navigate = useNavigate()
  const closeDialog = () => setDialog({ kind: 'none' })
  const openCreate = () => navigate('/department/new')
  const openEdit = (department: Department) => navigate(`/department/${department.code}/edit`)
  const openDuplicate = (department: Department) =>
    navigate('/department/new', { state: { initialValues: { ...department, code: '' } } })
  const openDelete = (department: Department) => setDialog({ kind: 'delete', department })
  const openDetails = (department: Department) =>
    setDialog({ kind: 'details', department })

  return (
    <div className="flex min-h-full flex-col gap-5 bg-canvas p-5">
      <div className="flex flex-col gap-4 rounded-xl bg-surface p-4">
        <ListingHeader
          title={t('department.listing.title')}
          search={search}
          onSearchChange={setSearch}
          onToggleMenu={toggleCollapsed}
          totalCount={masterCount}
          view={view}
          onToggleView={() =>
            setView((current) => (current === 'grid' ? 'list' : 'grid'))
          }
          searchPlaceholder={t('department.listing.searchPlaceholder')}
          addHref="/department/new"
          addLabel={t('department.listing.add')}
        />

        {view === 'grid' ? (
          <DepartmentOverviewPanel
            overviewState={overview}
            range={range}
            onRangeChange={setRange}
            activeStatus={statusFilter}
            onStatusChange={setStatusFilter}
            onRetry={refresh}
          />
        ) : (
          <DepartmentStatusOverview
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
        <DepartmentGrid
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
        <DepartmentTable
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
          title={t('department.delete.title')}
          description={t('department.delete.description', { name: dialog.department.name })}
          confirmText={t('department.delete.confirm')}
          cancelText={t('department.delete.cancel')}
          deletingText={t('department.delete.deleting')}
          submitting={isMutating}
          onConfirm={async () => {
            await deleteDepartment(dialog.department.code)
            closeDialog()
          }}
          onClose={closeDialog}
        />
      )}

      {dialog.kind === 'details' && (
        <DepartmentDetailsDialog
          department={dialog.department}
          onEdit={openEdit}
          onDuplicate={openDuplicate}
          onDelete={openDelete}
          onClose={closeDialog}
        />
      )}
    </div>
  )
}
