import { useTranslation } from '@/i18n'
import { Button } from '@/shared/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog'
import { RakSwatch } from './RakSwatch'
import type { Rak } from '../types/rak.types'

export interface RakDetailsDialogProps {
  rak: Rak
  onEdit: (rak: Rak) => void
  onDuplicate?: (rak: Rak) => void
  onDelete: (rak: Rak) => void
  onClose: () => void
}

function RakDetailsDialog({
  rak,
  onEdit,
  onDuplicate,
  onDelete,
  onClose,
}: RakDetailsDialogProps) {
  const { t } = useTranslation()

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-sm" closeLabel={t('rak.details.close')}>
        <DialogHeader>
          <DialogTitle className="sr-only">
            {t('rak.details.title')}
          </DialogTitle>
          <div className="flex items-center gap-2.5">
            {rak.image ? (
              <img src={rak.image} alt={rak.name} className="h-6 w-8 rounded object-cover" />
            ) : (
              <RakSwatch rak={rak} size="md" />
            )}
            <span className="truncate text-base font-semibold text-ink">
              {rak.name}
            </span>
            <span className={`ml-auto inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium ${rak.status === 'active' ? 'bg-status-active-canvas text-status-active-ink' : rak.status === 'inactive' ? 'bg-status-inactive-canvas text-status-inactive-ink' : 'bg-status-draft-canvas text-status-draft-ink'}`}>
               <span className={`size-1.5 rounded-full ${rak.status === 'active' ? 'bg-status-active-solid' : rak.status === 'inactive' ? 'bg-status-inactive-solid' : 'bg-status-draft-solid'}`} />
               <span className="capitalize">{rak.status}</span>
            </span>
          </div>
        </DialogHeader>

        <dl className="grid grid-cols-2 gap-4 rounded-xl border border-surface-border bg-surface-muted/60 px-4 py-3">
          <div className="col-span-2">
            <dt className="text-[10px] tracking-[0.08em] text-ink-subtle uppercase">
              {t('rak.details.code')}
            </dt>
            <dd className="mt-1.5 text-[13px] font-medium text-ink">
              {rak.code}
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="text-[10px] tracking-[0.08em] text-ink-subtle uppercase">
              {t('rak.details.description')}
            </dt>
            <dd className="mt-1.5 text-[13px] font-medium text-ink max-h-32 overflow-y-auto">
              {rak.description || '-'}
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="text-[10px] tracking-[0.08em] text-ink-subtle uppercase">
              {t('rak.details.updated')}
            </dt>
            <dd className="mt-1.5 text-[13px] font-medium text-ink">
              {rak.updatedAt ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(rak.updatedAt)) : '-'}
            </dd>
          </div>
        </dl>

        <DialogFooter className="flex-wrap justify-between sm:justify-between mt-6">
          <div className="flex gap-2">
            <Button variant="destructive" onClick={() => onDelete(rak)}>
              {t('rak.card.delete') || 'Delete'}
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              {t('rak.details.close')}
            </Button>
            <Button
              onClick={() => onEdit(rak)}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {t('rak.details.edit')}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { RakDetailsDialog }
