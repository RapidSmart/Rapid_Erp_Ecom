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
import type { Category, CategoryError, CategoryId } from '../../types/category.types'

export interface CategoryDeleteDialogProps {
  category: Category
  submitting: boolean
  onConfirm: (code: CategoryId) => Promise<CategoryError | null>
  onClose: () => void
}

function CategoryDeleteDialog({
  category,
  submitting,
  onConfirm,
  onClose,
}: CategoryDeleteDialogProps) {
  const { t } = useTranslation()
  const [error, setError] = useState<CategoryError | null>(null)

  function handleConfirm() {
    setError(null)

    void onConfirm(category.code).then((failure) => {
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
        closeLabel={t('category.delete.cancel')}
      >
        <DialogHeader>
          <DialogTitle>{t('category.delete.title')}</DialogTitle>
          <DialogDescription>
            {t('category.delete.description', { name: category.name })}
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
            {t('category.delete.cancel')}
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={submitting}
          >
            {submitting ? t('category.delete.deleting') : t('category.delete.confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { CategoryDeleteDialog }
