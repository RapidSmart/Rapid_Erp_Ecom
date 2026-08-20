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
import type { DepartmentError, DepartmentDeleteDialogProps } from '../../types/department.types'

export function DepartmentDeleteDialog({
  department,
  open,
  onOpenChange,
  onConfirm,
}: DepartmentDeleteDialogProps) {
  const { t } = useTranslation()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<DepartmentError | null>(null)

  async function handleConfirm() {
    setError(null)
    setSubmitting(true)
    try {
      await onConfirm()
      onOpenChange(false)
    } catch (err: unknown) {
      setError({
        code: 'department/delete-error',
        message: err instanceof Error ? err.message : 'Failed to delete department',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-sm"
        closeLabel={t('department.delete.cancel')}
      >
        <DialogHeader>
          <DialogTitle>{t('department.delete.title')}</DialogTitle>
          <DialogDescription>
            {t('department.delete.description', { name: department.name })}
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
            {t('department.delete.cancel')}
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={submitting}
          >
            {submitting ? t('department.delete.deleting') : t('department.delete.confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
