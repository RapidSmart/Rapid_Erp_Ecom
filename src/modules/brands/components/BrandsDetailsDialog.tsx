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
import type { Brand } from '../types/brands.types'

export interface BrandsDetailsDialogProps {
  brand: Brand
  onEdit: (brand: Brand) => void
  onDuplicate?: (brand: Brand) => void
  onDelete: (brand: Brand) => void
  onClose: () => void
}

function BrandsDetailsDialog({
  brand,
  onEdit,
  onDuplicate,
  onDelete,
  onClose,
}: BrandsDetailsDialogProps) {
  const { t } = useTranslation()

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-sm" closeLabel={t('brands.details.close')}>
        <DialogHeader>
          <DialogTitle className="sr-only">
            {t('brands.details.title')}
          </DialogTitle>
          <div className="flex items-center gap-2.5">
            {brand.image ? (
              <img src={brand.image} alt={brand.name} className="h-6 w-8 rounded object-cover" />
            ) : (
              <div className="flex h-6 w-8 items-center justify-center rounded bg-surface-border"><Factory className="size-4 text-ink-muted" /></div>
            )}
            <span className="truncate text-base font-semibold text-ink">
              {brand.name}
            </span>
            <span className={`ml-auto inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium ${brand.status === 'active' ? 'bg-status-active-canvas text-status-active-ink' : brand.status === 'inactive' ? 'bg-status-inactive-canvas text-status-inactive-ink' : 'bg-status-draft-canvas text-status-draft-ink'}`}>
               <span className={`size-1.5 rounded-full ${brand.status === 'active' ? 'bg-status-active-solid' : brand.status === 'inactive' ? 'bg-status-inactive-solid' : 'bg-status-draft-solid'}`} />
               <span className="capitalize">{brand.status}</span>
            </span>
          </div>
        </DialogHeader>

        <dl className="grid grid-cols-2 gap-4 rounded-xl border border-surface-border bg-surface-muted/60 px-4 py-3">
          <div className="col-span-2">
            <dt className="text-[10px] tracking-[0.08em] text-ink-subtle uppercase">
              {t('brands.details.code')}
            </dt>
            <dd className="mt-1.5 text-[13px] font-medium text-ink">
              {brand.code}
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="text-[10px] tracking-[0.08em] text-ink-subtle uppercase">
              {t('brands.details.description')}
            </dt>
            <dd className="mt-1.5 text-[13px] font-medium text-ink max-h-32 overflow-y-auto">
              {brand.description || '-'}
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="text-[10px] tracking-[0.08em] text-ink-subtle uppercase">
              {t('brands.details.updated')}
            </dt>
            <dd className="mt-1.5 text-[13px] font-medium text-ink">
              {brand.updatedAt ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(brand.updatedAt)) : '-'}
            </dd>
          </div>
        </dl>

        <DialogFooter className="flex-wrap justify-between sm:justify-between mt-6">
          <div className="flex gap-2">
            <Button variant="destructive" onClick={() => onDelete(brand)}>
              {t('brands.card.delete') || 'Delete'}
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              {t('brands.details.close')}
            </Button>
            <Button
              onClick={() => onEdit(brand)}
              className="bg-brand-accent text-brand-accent-foreground hover:bg-brand-accent/90"
            >
              {t('brands.details.edit')}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { BrandsDetailsDialog }
