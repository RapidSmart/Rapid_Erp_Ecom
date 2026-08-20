import { useTranslation } from '@/i18n'
import { Button } from '@/shared/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog'
import { ColorSwatch } from './ColorSwatch'
import type { Color } from '../types/colors.types'

export interface ColorsDetailsDialogProps {
  color: Color
  onEdit: (color: Color) => void
  onDuplicate?: (color: Color) => void
  onDelete: (color: Color) => void
  onClose: () => void
}

function ColorsDetailsDialog({
  color,
  onEdit,
  onDuplicate,
  onDelete,
  onClose,
}: ColorsDetailsDialogProps) {
  const { t } = useTranslation()

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-sm" closeLabel={t('colors.details.close')}>
        <DialogHeader>
          <DialogTitle className="sr-only">
            {t('colors.details.title')}
          </DialogTitle>
          <div className="flex items-center gap-2.5">
            {color.image ? (
              <img src={color.image} alt={color.name} className="h-6 w-8 rounded object-cover" />
            ) : (
              <ColorSwatch color={color} size="md" />
            )}
            <span className="truncate text-base font-semibold text-ink">
              {color.name}
            </span>
            <span className={`ml-auto inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium ${color.status === 'active' ? 'bg-status-active-canvas text-status-active-ink' : color.status === 'inactive' ? 'bg-status-inactive-canvas text-status-inactive-ink' : 'bg-status-draft-canvas text-status-draft-ink'}`}>
               <span className={`size-1.5 rounded-full ${color.status === 'active' ? 'bg-status-active-solid' : color.status === 'inactive' ? 'bg-status-inactive-solid' : 'bg-status-draft-solid'}`} />
               <span className="capitalize">{color.status}</span>
            </span>
          </div>
        </DialogHeader>

        <dl className="grid grid-cols-2 gap-4 rounded-xl border border-surface-border bg-surface-muted/60 px-4 py-3">
          <div className="col-span-2">
            <dt className="text-[10px] tracking-[0.08em] text-ink-subtle uppercase">
              {t('colors.details.code')}
            </dt>
            <dd className="mt-1.5 text-[13px] font-medium text-ink">
              {color.code}
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="text-[10px] tracking-[0.08em] text-ink-subtle uppercase">
              {t('colors.details.description')}
            </dt>
            <dd className="mt-1.5 text-[13px] font-medium text-ink max-h-32 overflow-y-auto">
              {color.description || '-'}
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="text-[10px] tracking-[0.08em] text-ink-subtle uppercase">
              {t('colors.details.updated')}
            </dt>
            <dd className="mt-1.5 text-[13px] font-medium text-ink">
              {color.updatedAt ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(color.updatedAt)) : '-'}
            </dd>
          </div>
        </dl>

        <DialogFooter className="flex-wrap justify-between sm:justify-between mt-6">
          <div className="flex gap-2">
            <Button variant="destructive" onClick={() => onDelete(color)}>
              {t('colors.card.delete') || 'Delete'}
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              {t('colors.details.close')}
            </Button>
            <Button
              onClick={() => onEdit(color)}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {t('colors.details.edit')}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { ColorsDetailsDialog }
