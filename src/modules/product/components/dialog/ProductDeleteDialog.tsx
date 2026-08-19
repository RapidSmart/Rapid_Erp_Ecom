import { useState } from 'react'
import { useTranslation } from '@/i18n'
import { Button } from '@/shared/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog'
import type { Product, ProductError, ProductId } from '../../types/product.types'

export interface ProductDeleteDialogProps {
  product: Product
  submitting: boolean
  onConfirm: (id: ProductId) => Promise<ProductError | null>
  onClose: () => void
}

function ProductDeleteDialog({
  product,
  submitting,
  onConfirm,
  onClose,
}: ProductDeleteDialogProps) {
  const { t } = useTranslation()
  const [error, setError] = useState<ProductError | null>(null)

  function handleConfirm() {
    setError(null)

    void onConfirm(product.id).then((failure) => {
      if (failure) {
        setError(failure)

        return
      }

      onClose()
    })
  }

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-sm"
        closeLabel={t('product.delete.cancel')}
      >
        <DialogHeader>
          <DialogTitle>{t('product.delete.title')}</DialogTitle>
          <DialogDescription>
            {t('product.delete.description', { name: product.name })}
          </DialogDescription>
        </DialogHeader>

        {error && (
          <p
            role="alert"
            className="rounded-lg bg-status-delete-surface px-3 py-2 text-[11px] text-status-delete-ink"
          >
            {error.message}
          </p>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={submitting}>
            {t('product.delete.cancel')}
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={submitting}
          >
            {submitting ? t('product.delete.deleting') : t('product.delete.confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { ProductDeleteDialog }
