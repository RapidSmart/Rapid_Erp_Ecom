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
import type { DeleteConfirmDialogProps } from '../../types/common-data.types'

export function DeleteConfirmDialog({
  open,
  title,
  description,
  confirmText,
  cancelText,
  deletingText,
  submitting = false,
  error,
  onConfirm,
  onClose,
}: DeleteConfirmDialogProps) {
  const { t } = useTranslation()

  const errorMessage =
    typeof error === 'string'
      ? error
      : error && typeof error === 'object' && 'message' in error
        ? error.message
        : null

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent
        className="max-w-sm"
        closeLabel={cancelText ?? t('common.delete.cancel')}
      >
        <DialogHeader>
          <DialogTitle>{title ?? t('common.delete.title')}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {errorMessage && (
          <p
            role="alert"
            className="rounded-lg bg-status-delete-surface px-3 py-2 text-[11px] text-status-delete-ink"
          >
            {errorMessage}
          </p>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={submitting}
            className="cursor-pointer"
          >
            {cancelText ?? t('common.delete.cancel')}
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={submitting}
            className="cursor-pointer"
          >
            {submitting
              ? (deletingText ?? t('common.delete.deleting'))
              : (confirmText ?? t('common.delete.confirm'))}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
