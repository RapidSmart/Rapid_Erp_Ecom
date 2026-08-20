import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSidebar } from '@/shared/components/layout'
import { BrandsListingHeader } from '../components/BrandsListingHeader'
import { BrandsGrid } from '../components/BrandsGrid'
import { BrandsTable } from '../components/BrandsTable'
import { BrandsOverviewPanel } from '../components/BrandsOverviewPanel'
import { BrandsStatusOverview } from '../components/BrandsStatusOverview'
import { BrandsDetailsDialog } from '../components/BrandsDetailsDialog'
import { BrandsDeleteDialog } from '../components/BrandsDeleteDialog'
import { useBrandsListing } from '../hooks/useBrandsListing'
import type { Brand, BrandView } from '../types/brands.types'

export default function BrandsListing() {
  const { toggleCollapsed } = useSidebar()
  const navigate = useNavigate()
  const [view, setView] = useState<BrandView>('list')
  const [detailsBrand, setDetailsBrand] = useState<Brand | null>(null)
  const [deleteBrandTarget, setDeleteBrandTarget] = useState<Brand | null>(null)
  
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
    deleteBrand,
    page,
    setPage,
    pageSize,
    setPageSize,
    pageCount,
    totalCount,
    masterCount,
    paginatedList,
  } = useBrandsListing()

  const openCreate = () => navigate('/brands/new')
  const openEdit = (brand: Brand) => navigate(`/brands/${brand.id}/edit`)
  const handleDelete = (brand: Brand) => setDeleteBrandTarget(brand)

  return (
    <div className="flex min-h-full flex-col gap-5 bg-canvas p-5">
      <div className="flex flex-col gap-4 rounded-xl bg-surface p-4">
        <BrandsListingHeader
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
          <BrandsOverviewPanel
            state={overview}
            range={range}
            onRangeChange={setRange}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            onRetry={refresh}
          />
        ) : (
          <BrandsStatusOverview
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
        <BrandsGrid
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
        <BrandsTable
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
          onOpenDetails={setDetailsBrand}
        />
      )}

      {detailsBrand && (
        <BrandsDetailsDialog
          brand={detailsBrand}
          onEdit={(ind) => {
            setDetailsBrand(null)
            openEdit(ind)
          }}
          onDelete={(ind) => {
            setDetailsBrand(null)
            handleDelete(ind)
          }}
          onClose={() => setDetailsBrand(null)}
        />
      )}

      {deleteBrandTarget && (
        <BrandsDeleteDialog
          brand={deleteBrandTarget}
          submitting={isMutating}
          onConfirm={deleteBrand}
          onClose={() => setDeleteBrandTarget(null)}
        />
      )}
    </div>
  )
}
