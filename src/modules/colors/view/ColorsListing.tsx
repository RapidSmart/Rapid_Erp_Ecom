import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSidebar } from '@/shared/components/layout'
import { ColorsListingHeader } from '../components/ColorsListingHeader'
import { ColorsGrid } from '../components/ColorsGrid'
import { ColorsTable } from '../components/ColorsTable'
import { ColorsOverviewPanel } from '../components/ColorsOverviewPanel'
import { ColorsStatusOverview } from '../components/ColorsStatusOverview'
import { ColorsDetailsDialog } from '../components/ColorsDetailsDialog'
import { ColorsDeleteDialog } from '../components/ColorsDeleteDialog'
import { useColorsListing } from '../hooks/useColorsListing'
import type { Color, ColorView } from '../types/colors.types'

export default function ColorsListing() {
  const { toggleCollapsed } = useSidebar()
  const navigate = useNavigate()
  const [view, setView] = useState<ColorView>('list')
  const [detailsColor, setDetailsColor] = useState<Color | null>(null)
  const [deleteColorTarget, setDeleteColorTarget] = useState<Color | null>(null)
  
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
    deleteColor,
    page,
    setPage,
    pageSize,
    setPageSize,
    pageCount,
    totalCount,
    masterCount,
    paginatedList,
  } = useColorsListing()

  const openCreate = () => navigate('/colors/new')
  const openEdit = (color: Color) => navigate(`/colors/${color.id}/edit`)
  const handleDelete = (color: Color) => setDeleteColorTarget(color)

  return (
    <div className="flex min-h-full flex-col gap-5 bg-canvas p-5">
      <div className="flex flex-col gap-4 rounded-xl bg-surface p-4">
        <ColorsListingHeader
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
          <ColorsOverviewPanel
            state={overview}
            range={range}
            onRangeChange={setRange}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            onRetry={refresh}
          />
        ) : (
          <ColorsStatusOverview
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
        <ColorsGrid
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
        <ColorsTable
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
          onOpenDetails={setDetailsColor}
        />
      )}

      {detailsColor && (
        <ColorsDetailsDialog
          color={detailsColor}
          onEdit={(ind) => {
            setDetailsColor(null)
            openEdit(ind)
          }}
          onDelete={(ind) => {
            setDetailsColor(null)
            handleDelete(ind)
          }}
          onClose={() => setDetailsColor(null)}
        />
      )}

      {deleteColorTarget && (
        <ColorsDeleteDialog
          color={deleteColorTarget}
          submitting={isMutating}
          onConfirm={deleteColor}
          onClose={() => setDeleteColorTarget(null)}
        />
      )}
    </div>
  )
}
