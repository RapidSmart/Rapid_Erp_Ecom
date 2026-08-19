import { useTranslation } from '@/i18n'
import { Button } from '@/shared/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog'
import { Factory } from 'lucide-react'
import type { Industry } from '../types/industries.types'

export interface IndustriesDetailsDialogProps {
  industry: Industry
  onEdit: (industry: Industry) => void
  onDuplicate?: (industry: Industry) => void
  onDelete: (industry: Industry) => void
  onClose: () => void
}

function IndustriesDetailsDialog({
  industry,
  onEdit,
  onDelete,
  onClose,
}: IndustriesDetailsDialogProps) {
  const { t } = useTranslation()

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-sm" closeLabel={t('industries.details.close')}>
        <DialogHeader>
          <DialogTitle className="sr-only">
            {t('industries.details.title')}
          </DialogTitle>
          <div className="flex items-center gap-2.5">
            {industry.image ? (
              <img src={industry.image} alt={industry.name} className="h-6 w-8 rounded object-cover" />
            ) : (
              <div className="flex h-6 w-8 items-center justify-center rounded bg-surface-border"><Factory className="size-4 text-ink-muted" /></div>
            )}
            <span className="truncate text-base font-semibold text-ink">
              {industry.name}
            </span>
            <span className={`ml-auto inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium ${industry.status === 'active' ? 'bg-status-active-canvas text-status-active-ink' : industry.status === 'inactive' ? 'bg-status-inactive-canvas text-status-inactive-ink' : 'bg-status-draft-canvas text-status-draft-ink'}`}>
               <span className={`size-1.5 rounded-full ${industry.status === 'active' ? 'bg-status-active-solid' : industry.status === 'inactive' ? 'bg-status-inactive-solid' : 'bg-status-draft-solid'}`} />
               <span className="capitalize">{industry.status}</span>
            </span>
          </div>
        </DialogHeader>

        <dl className="grid grid-cols-2 gap-4 rounded-xl border border-surface-border bg-surface-muted/60 px-4 py-3">
          <div className="col-span-2">
            <dt className="text-[10px] tracking-[0.08em] text-ink-subtle uppercase">
              {t('industries.details.code')}
            </dt>
            <dd className="mt-1.5 text-[13px] font-medium text-ink">
              {industry.code}
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="text-[10px] tracking-[0.08em] text-ink-subtle uppercase">
              {t('industries.details.description')}
            </dt>
            <dd className="mt-1.5 text-[13px] font-medium text-ink max-h-32 overflow-y-auto">
              {industry.description || '-'}
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="text-[10px] tracking-[0.08em] text-ink-subtle uppercase">
              {t('industries.details.updated')}
            </dt>
            <dd className="mt-1.5 text-[13px] font-medium text-ink">
              {industry.updatedAt ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(industry.updatedAt)) : '-'}
            </dd>
          </div>
        </dl>

        <DialogFooter className="flex-wrap justify-between sm:justify-between mt-6">
          <div className="flex gap-2">
            <Button variant="destructive" onClick={() => onDelete(industry)}>
              {t('industries.card.delete') || 'Delete'}
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              {t('industries.details.close')}
            </Button>
            <Button
              onClick={() => onEdit(industry)}
              className="bg-brand-accent text-brand-accent-foreground hover:bg-brand-accent/90"
            >
              {t('industries.details.edit')}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { IndustriesDetailsDialog }
