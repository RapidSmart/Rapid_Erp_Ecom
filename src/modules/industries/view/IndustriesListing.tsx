import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSidebar } from '@/shared/components/layout'
import { IndustriesListingHeader } from '../components/IndustriesListingHeader'
import { IndustriesGrid } from '../components/IndustriesGrid'
import { IndustriesTable } from '../components/IndustriesTable'
import { IndustriesOverviewPanel } from '../components/IndustriesOverviewPanel'
import { IndustriesStatusOverview } from '../components/IndustriesStatusOverview'
import { useIndustriesListing } from '../hooks/useIndustriesListing'
import type { Industry, IndustryView } from '../types/industries.types'

export default function IndustriesListing() {
  const { toggleCollapsed } = useSidebar()
  const navigate = useNavigate()
  const [view, setView] = useState<IndustryView>('list')
  
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
    isFiltered,
    clearFilters,
    refresh,
    deleteIndustry,
    page,
    setPage,
    pageSize,
    setPageSize,
    pageCount,
    totalCount,
    masterCount,
    paginatedList,
  } = useIndustriesListing()

  const openCreate = () => navigate('/industries/new')
  const openEdit = (industry: Industry) => navigate(`/industries/${industry.id}/edit`)
  
  const handleDelete = async (industry: Industry) => {
    if (window.confirm(`Are you sure you want to delete ${industry.name}?`)) {
      await deleteIndustry(industry.id)
    }
  }

  return (
    <div className="flex min-h-full flex-col gap-5 bg-canvas p-5">
      <div className="flex flex-col gap-4 rounded-xl bg-surface p-4">
        <IndustriesListingHeader
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
          <IndustriesOverviewPanel
            state={overview}
            range={range}
            onRangeChange={setRange}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            onRetry={refresh}
          />
        ) : (
          <IndustriesStatusOverview
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
        <IndustriesGrid
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
        <IndustriesTable
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
        />
      )}
    </div>
  )
}
