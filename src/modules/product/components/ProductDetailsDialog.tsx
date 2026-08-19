import { useTranslation } from '@/i18n'
import { Button } from '@/shared/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog'
import { ProductImage } from './ProductImage'
import { ProductStatusBadge } from './ProductStatusBadge'
import { formatUpdatedAtFull } from '../utils/format-updated-at'
import type { Product } from '../types/product.types'

export interface ProductDetailsDialogProps {
  product: Product
  onEdit: (product: Product) => void
  onDuplicate: (product: Product) => void
  onDelete: (product: Product) => void
  onClose: () => void
}

function ProductDetailsDialog({
  product,
  onEdit,
  onDuplicate,
  onDelete,
  onClose,
}: ProductDetailsDialogProps) {
  const { t } = useTranslation()

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-sm" closeLabel={t('product.details.close')}>
        <DialogHeader>
          <DialogTitle className="sr-only">
            {t('product.details.title')}
          </DialogTitle>
          <div className="flex items-center gap-2.5">
            <ProductImage imageUrl={product.imageUrl} name={product.name} />
            <span className="truncate text-base font-semibold text-ink">
              {product.name}
            </span>
            <ProductStatusBadge status={product.status} className="ml-auto" />
          </div>
        </DialogHeader>

        <dl className="grid grid-cols-2 gap-4 rounded-xl border border-surface-border bg-surface-muted/60 px-4 py-3">
          <div>
            <dt className="text-[10px] tracking-[0.08em] text-ink-subtle uppercase">
              {t('product.details.sku')}
            </dt>
            <dd className="mt-1.5 text-[13px] font-medium text-ink">
              {product.sku}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] tracking-[0.08em] text-ink-subtle uppercase">
              {t('product.details.category')}
            </dt>
            <dd className="mt-1.5 text-[13px] font-medium text-ink capitalize">
              {product.category}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] tracking-[0.08em] text-ink-subtle uppercase">
              {t('product.details.price')}
            </dt>
            <dd className="mt-1.5 text-[13px] font-semibold text-ink">
              ${product.price.toFixed(2)}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] tracking-[0.08em] text-ink-subtle uppercase">
              {t('product.details.stock')}
            </dt>
            <dd className="mt-1.5 text-[13px] font-medium text-ink">
              {product.stock}
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="text-[10px] tracking-[0.08em] text-ink-subtle uppercase">
              {t('product.details.updated')}
            </dt>
            <dd className="mt-1.5 text-[13px] font-medium text-ink">
              {formatUpdatedAtFull(product.updatedAt)}
            </dd>
          </div>
        </dl>

        <DialogFooter className="flex-wrap justify-between sm:justify-between">
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onDuplicate(product)}>
              {t('product.card.duplicate')}
            </Button>
            <Button variant="destructive" onClick={() => onDelete(product)}>
              {t('product.card.delete')}
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              {t('product.details.close')}
            </Button>
            <Button
              onClick={() => onEdit(product)}
              className="bg-brand-accent text-brand-accent-foreground hover:bg-brand-accent/90"
            >
              {t('product.details.edit')}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { ProductDetailsDialog }
