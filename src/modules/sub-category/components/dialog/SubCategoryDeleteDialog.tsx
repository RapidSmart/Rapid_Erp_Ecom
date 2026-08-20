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
import type { SubCategoryError, SubCategoryDeleteDialogProps } from '../../types/sub-category.types'

export function SubCategoryDeleteDialog({
  subCategory,
  open,
  onOpenChange,
  onConfirm,
}: SubCategoryDeleteDialogProps) {
  const { t } = useTranslation()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<SubCategoryError | null>(null)

  async function handleConfirm() {
    setError(null)
    setSubmitting(true)
    try {
      await onConfirm()
      onOpenChange(false)
    } catch (err: unknown) {
      setError({
        code: 'subCategory/delete-error',
        message: err instanceof Error ? err.message : 'Failed to delete sub category',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-sm"
        closeLabel={t('subCategory.delete.cancel')}
      >
        <DialogHeader>
          <DialogTitle>{t('subCategory.delete.title')}</DialogTitle>
          <DialogDescription>
            {t('subCategory.delete.description', { name: subCategory.name })}
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
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={submitting}>
            {t('subCategory.delete.cancel')}
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={submitting}
          >
            {submitting ? t('subCategory.delete.deleting') : t('subCategory.delete.confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
