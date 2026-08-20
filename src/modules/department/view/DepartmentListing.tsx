import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSidebar } from '@/shared/components/layout'
import { DepartmentDeleteDialog } from '../components/dialog/DepartmentDeleteDialog'
import { DepartmentDetailsDialog } from '../components/dialog/DepartmentDetailsDialog'
import { DepartmentGrid } from '../components/DepartmentGrid'
import { DepartmentListingFooter } from '../components/DepartmentListingFooter'
import { DepartmentListingHeader } from '../components/DepartmentListingHeader'
import { DepartmentOverviewPanel } from '../components/DepartmentOverviewPanel'
import { DepartmentStatusOverview } from '../components/DepartmentStatusOverview'
import { DepartmentTable } from '../components/DepartmentTable'
import { useDepartmentListing } from '../hooks/useDepartmentListing'
import type { Department, DepartmentDialog, DepartmentView } from '../types/department.types'

export function DepartmentListing() {
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
    isMutating: _isMutating,
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
        <DepartmentListingHeader
          search={search}
          onSearchChange={setSearch}
          onToggleMenu={toggleCollapsed}
          totalCount={masterCount}
          view={view}
          onToggleView={() =>
            setView((current) => (current === 'grid' ? 'list' : 'grid'))
          }
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

      <DepartmentListingFooter />

      {dialog.kind === 'delete' && (
        <DepartmentDeleteDialog
          department={dialog.department}
          open={true}
          onOpenChange={(open) => {
            if (!open) closeDialog()
          }}
          onConfirm={async () => {
            await deleteDepartment(dialog.department.code)
            closeDialog()
          }}
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
