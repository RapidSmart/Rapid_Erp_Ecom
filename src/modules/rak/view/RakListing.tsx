import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSidebar } from '@/shared/components/layout'
import { RakListingHeader } from '../components/RakListingHeader'
import { RakGrid } from '../components/RakGrid'
import { RakTable } from '../components/RakTable'
import { RakOverviewPanel } from '../components/RakOverviewPanel'
import { RakStatusOverview } from '../components/RakStatusOverview'
import { RakDetailsDialog } from '../components/RakDetailsDialog'
import { RakDeleteDialog } from '../components/RakDeleteDialog'
import { useRakListing } from '../hooks/useRakListing'
import type { Rak, RakView } from '../types/rak.types'

export default function RakListing() {
  const { toggleCollapsed } = useSidebar()
  const navigate = useNavigate()
  const [view, setView] = useState<RakView>('list')
  const [detailsRak, setDetailsRak] = useState<Rak | null>(null)
  const [deleteRakTarget, setDeleteRakTarget] = useState<Rak | null>(null)
  
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
    deleteRak,
    page,
    setPage,
    pageSize,
    setPageSize,
    pageCount,
    totalCount,
    masterCount,
    paginatedList,
  } = useRakListing()

  const openCreate = () => navigate('/rak/new')
  const openEdit = (rak: Rak) => navigate(`/rak/${rak.id}/edit`)
  const handleDelete = (rak: Rak) => setDeleteRakTarget(rak)

  return (
    <div className="flex min-h-full flex-col gap-5 bg-canvas p-5">
      <div className="flex flex-col gap-4 rounded-xl bg-surface p-4">
        <RakListingHeader
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
          <RakOverviewPanel
            state={overview}
            range={range}
            onRangeChange={setRange}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            onRetry={refresh}
          />
        ) : (
          <RakStatusOverview
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
        <RakGrid
          state={list}
          isRefreshing={isRefreshing}
          isFiltered={isFiltered}
          onRetry={refresh}
          onClearFilters={clearFilters}
          onAdd={openCreate}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      ) : (
        <RakTable
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
          onEdit={openEdit}
          onOpenDetails={setDetailsRak}
        />
      )}

      {detailsRak && (
        <RakDetailsDialog
          rak={detailsRak}
          onEdit={(ind) => {
            setDetailsRak(null)
            openEdit(ind)
          }}
          onDelete={(ind) => {
            setDetailsRak(null)
            handleDelete(ind)
          }}
          onClose={() => setDetailsRak(null)}
        />
      )}

      {deleteRakTarget && (
        <RakDeleteDialog
          rak={deleteRakTarget}
          submitting={isMutating}
          onConfirm={deleteRak}
          onClose={() => setDeleteRakTarget(null)}
        />
      )}
    </div>
  )
}
