import { Plus } from 'lucide-react'
import { useTranslation } from '@/i18n'
import { Button } from '@/shared/components/ui/button'
import { RakSwatch } from './RakSwatch'
import type { Rak } from '../types/rak.types'

export interface RakGridProps {
  state: { status: 'loading' | 'error' | 'ready'; data?: Rak[]; error?: any }
  isRefreshing: boolean
  isFiltered: boolean
  onRetry: () => void
  onClearFilters: () => void
  onAdd: () => void
  onEdit: (rak: Rak) => void
  onDelete: (rak: Rak) => void
}

function RakGrid({
  state,
  onAdd,
  onEdit,
  onDelete,
}: RakGridProps) {
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
        <h3 className="mt-4 text-lg font-semibold text-gray-900">{t('rak.empty.title')}</h3>
        <p className="mt-2 text-sm text-gray-500">{t('rak.empty.description')}</p>
        <Button onClick={onAdd} className="mt-6 bg-primary text-white hover:bg-primary/90 cursor-pointer">
          <Plus className="mr-2 h-4 w-4" />
          {t('rak.empty.action')}
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((rak) => (
        <div key={rak.id} className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <RakSwatch rak={rak} size="md" />
                <h4 className="font-semibold text-gray-900">{rak.name}</h4>
              </div>
              <p className="text-sm text-gray-500">{rak.code}</p>
            </div>
            <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              {rak.status}
            </span>
          </div>
          <p className="mt-4 text-sm text-gray-600 line-clamp-2">{rak.description}</p>
          <div className="mt-6 flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(rak)} className="flex-1 cursor-pointer">
              Edit
            </Button>
            <Button variant="destructive" size="sm" onClick={() => onDelete(rak)} className="flex-1 cursor-pointer">
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

export { RakGrid }
