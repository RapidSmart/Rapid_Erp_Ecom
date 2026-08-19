import { useState } from 'react'
import { useSidebar } from '@/shared/components/layout'
import { CountryDeleteDialog } from '../components/CountryDeleteDialog'
import { CountryDetailsDialog } from '../components/CountryDetailsDialog'
import { CountryFormDialog } from '../components/CountryFormDialog'
import { CountryGrid } from '../components/CountryGrid'
import { CountryListingFooter } from '../components/CountryListingFooter'
import { CountryListingHeader } from '../components/CountryListingHeader'
import { CountryOverviewPanel } from '../components/CountryOverviewPanel'
import { CountryStatusOverview } from '../components/CountryStatusOverview'
import { CountryTable } from '../components/CountryTable'
import { useCountryListing } from '../hooks/useCountryListing'
import type { Country, CountryDialog, CountryView } from '../types/country.types'

function CountryListing() {
  const { toggleCollapsed } = useSidebar()
  const [dialog, setDialog] = useState<CountryDialog>({ kind: 'none' })
  const [view, setView] = useState<CountryView>('list')
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
    createCountry,
    updateCountry,
    deleteCountry,
    page,
    setPage,
    pageSize,
    setPageSize,
    pageCount,
    totalCount,
    masterCount,
    paginatedList,
  } = useCountryListing()

  const closeDialog = () => setDialog({ kind: 'none' })
  const openCreate = () => setDialog({ kind: 'form', mode: 'create' })
  const openEdit = (country: Country) =>
    setDialog({ kind: 'form', mode: 'edit', country })
  const openDuplicate = (country: Country) =>
    setDialog({ kind: 'form', mode: 'duplicate', country })
  const openDelete = (country: Country) => setDialog({ kind: 'delete', country })
  const openDetails = (country: Country) =>
    setDialog({ kind: 'details', country })

  return (
    <div className="flex min-h-full flex-col gap-5 bg-canvas p-5">
      <div className="flex flex-col gap-4 rounded-xl bg-surface p-4">
        <CountryListingHeader
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
          <CountryOverviewPanel
            state={overview}
            range={range}
            onRangeChange={setRange}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            onRetry={refresh}
          />
        ) : (
          <CountryStatusOverview
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
        <CountryGrid
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
        <CountryTable
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

      <CountryListingFooter />

      {dialog.kind === 'form' && (
        <CountryFormDialog
          mode={dialog.mode}
          country={dialog.country}
          submitting={isMutating}
          onSubmit={(payload) => {
            const target = dialog.country

            return dialog.mode === 'edit' && target
              ? updateCountry(target.id, payload)
              : createCountry(payload)
          }}
          onClose={closeDialog}
        />
      )}

      {dialog.kind === 'delete' && (
        <CountryDeleteDialog
          country={dialog.country}
          submitting={isMutating}
          onConfirm={deleteCountry}
          onClose={closeDialog}
        />
      )}

      {dialog.kind === 'details' && (
        <CountryDetailsDialog
          country={dialog.country}
          onEdit={openEdit}
          onDuplicate={openDuplicate}
          onDelete={openDelete}
          onClose={closeDialog}
        />
      )}
    </div>
  )
}

export { CountryListing }
