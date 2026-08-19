import { useTranslation } from '@/i18n'
import { Button } from '@/shared/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog'
import { CategoryImage } from './CategoryImage'
import { CategoryStatusBadge } from './CategoryStatusBadge'
import { formatUpdatedAtFull } from '../utils/format-updated-at'
import type { Category } from '../types/category.types'

export interface CategoryDetailsDialogProps {
  category: Category
  onEdit: (category: Category) => void
  onDuplicate: (category: Category) => void
  onDelete: (category: Category) => void
  onClose: () => void
}

function CategoryDetailsDialog({
  category,
  onEdit,
  onDuplicate,
  onDelete,
  onClose,
}: CategoryDetailsDialogProps) {
  const { t } = useTranslation()

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-sm" closeLabel={t('category.details.close')}>
        <DialogHeader>
          <DialogTitle className="sr-only">
            {t('category.details.title')}
          </DialogTitle>
          <div className="flex items-center gap-2.5">
            <CategoryImage imageUrl={category.imageUrl} name={category.name} />
            <span className="truncate text-base font-semibold text-ink">
              {category.name}
            </span>
            <CategoryStatusBadge status={category.status} className="ml-auto" />
          </div>
        </DialogHeader>

        <dl className="grid grid-cols-2 gap-4 rounded-xl border border-surface-border bg-surface-muted/60 px-4 py-3">
          <div>
            <dt className="text-[10px] tracking-[0.08em] text-ink-subtle uppercase">
              {t('category.details.code')}
            </dt>
            <dd className="mt-1.5 text-[13px] font-semibold text-ink">
              {category.code}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] tracking-[0.08em] text-ink-subtle uppercase">
              {t('category.details.status')}
            </dt>
            <dd className="mt-1.5 text-[13px] font-medium text-ink capitalize">
              {category.status}
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="text-[10px] tracking-[0.08em] text-ink-subtle uppercase">
              {t('category.details.description')}
            </dt>
            <dd className="mt-1.5 text-[13px] text-ink-muted leading-relaxed">
              {category.description}
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="text-[10px] tracking-[0.08em] text-ink-subtle uppercase">
              {t('category.details.updated')}
            </dt>
            <dd className="mt-1.5 text-[13px] font-medium text-ink">
              {formatUpdatedAtFull(category.updatedAt)}
            </dd>
          </div>
        </dl>

        <DialogFooter className="flex-wrap justify-between sm:justify-between">
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onDuplicate(category)}>
              {t('category.card.duplicate')}
            </Button>
            <Button variant="destructive" onClick={() => onDelete(category)}>
              {t('category.card.delete')}
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              {t('category.details.close')}
            </Button>
            <Button
              onClick={() => onEdit(category)}
              className="bg-brand-accent text-brand-accent-foreground hover:bg-brand-accent/90"
            >
              {t('category.details.edit')}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { CategoryDetailsDialog }
