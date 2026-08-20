import { Plus } from 'lucide-react'
import { useTranslation } from '@/i18n'
import { Button } from '@/shared/components/ui/button'
import type { Industry } from '../types/industries.types'

export interface IndustriesGridProps {
  state: { status: 'loading' | 'error' | 'ready'; data?: Industry[]; error?: any }
  isRefreshing: boolean
  isFiltered: boolean
  onRetry: () => void
  onClearFilters: () => void
  onAdd: () => void
  onEdit: (industry: Industry) => void
  onDelete: (industry: Industry) => void
}

function IndustriesGrid({
  state,
  onAdd,
  onEdit,
  onDelete,
}: IndustriesGridProps) {
  const { t } = useTranslation()

  if (state.status === 'loading') {
    return <div className="p-8 text-center">Loading...</div>
  }

  if (state.status === 'error') {
    return <div className="p-8 text-center text-red-500">Error loading data.</div>
  }

  const items = state.data || []

  if (items.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center">
        <h3 className="mt-4 text-lg font-semibold text-gray-900">{t('industries.empty.title')}</h3>
        <p className="mt-2 text-sm text-gray-500">{t('industries.empty.description')}</p>
        <Button onClick={onAdd} className="mt-6 bg-primary text-white hover:bg-primary/90 cursor-pointer">
          <Plus className="mr-2 h-4 w-4" />
          {t('industries.empty.action')}
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((industry) => (
        <div key={industry.id} className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold text-gray-900">{industry.name}</h4>
              <p className="text-sm text-gray-500">{industry.code}</p>
            </div>
            <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              {industry.status}
            </span>
          </div>
          <p className="mt-4 text-sm text-gray-600 line-clamp-2">{industry.description}</p>
          <div className="mt-6 flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(industry)} className="flex-1 cursor-pointer">
              Edit
            </Button>
            <Button variant="destructive" size="sm" onClick={() => onDelete(industry)} className="flex-1 cursor-pointer">
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

export { IndustriesGrid }
