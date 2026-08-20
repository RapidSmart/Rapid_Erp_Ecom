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
import type { Brand, BrandError, BrandId } from '../types/brands.types'

export interface BrandsDeleteDialogProps {
  brand: Brand
  submitting: boolean
  onConfirm: (id: BrandId) => Promise<BrandError | null>
  onClose: () => void
}

function BrandsDeleteDialog({
  brand,
  submitting,
  onConfirm,
  onClose,
}: BrandsDeleteDialogProps) {
  const { t } = useTranslation()
  const [error, setError] = useState<BrandError | null>(null)

  function handleConfirm() {
    setError(null)

    void onConfirm(brand.id).then((failure) => {
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
        closeLabel={t('brands.delete.cancel')}
      >
        <DialogHeader>
          <DialogTitle>{t('brands.delete.title')}</DialogTitle>
          <DialogDescription>
            {t('brands.delete.description', { name: brand.name })}
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
            {t('brands.delete.cancel')}
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={submitting}
          >
            {submitting ? t('brands.delete.deleting') : t('brands.delete.confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { BrandsDeleteDialog }
