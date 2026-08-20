import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '@/i18n'
import { useSidebar } from '@/shared/components/layout'
import { DeleteConfirmDialog, ListingFooter } from '@/modules/common-data'
import { CountryDetailsDialog } from '../components/dialog/CountryDetailsDialog'
import { CountryGrid } from '../components/CountryGrid'
import { CountryListingHeader } from '../components/CountryListingHeader'
import { CountryOverviewPanel } from '../components/CountryOverviewPanel'
import { CountryStatusOverview } from '../components/CountryStatusOverview'
import { CountryTable } from '../components/CountryTable'
import { useCountryListing } from '../hooks/useCountryListing'
import type { Country, CountryDialog, CountryView } from '../types/country.types'

function CountryListing() {
  const { t } = useTranslation()
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

  const navigate = useNavigate()
  const closeDialog = () => setDialog({ kind: 'none' })
  const openCreate = () => navigate('/country/new')
  const openEdit = (country: Country) => navigate(`/country/${country.id}/edit`)
  const openDuplicate = (country: Country) =>
    navigate('/country/new', { state: { initialValues: { ...country, id: '' } } })
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

      <ListingFooter />

      {dialog.kind === 'delete' && (
        <DeleteConfirmDialog
          open
          title={t('country.delete.title')}
          description={t('country.delete.description', { name: dialog.country.name })}
          confirmText={t('country.delete.confirm')}
          cancelText={t('country.delete.cancel')}
          deletingText={t('country.delete.deleting')}
          submitting={isMutating}
          onConfirm={async () => {
            const failure = await deleteCountry(dialog.country.id)
            if (!failure) closeDialog()
          }}
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
