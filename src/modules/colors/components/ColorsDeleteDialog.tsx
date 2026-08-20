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
import type { Color, ColorError, ColorId } from '../types/colors.types'

export interface ColorsDeleteDialogProps {
  color: Color
  submitting: boolean
  onConfirm: (id: ColorId) => Promise<ColorError | null>
  onClose: () => void
}

function ColorsDeleteDialog({
  color,
  submitting,
  onConfirm,
  onClose,
}: ColorsDeleteDialogProps) {
  const { t } = useTranslation()
  const [error, setError] = useState<ColorError | null>(null)

  function handleConfirm() {
    setError(null)

    void onConfirm(color.id).then((failure) => {
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
        closeLabel={t('colors.delete.cancel')}
      >
        <DialogHeader>
          <DialogTitle>{t('colors.delete.title')}</DialogTitle>
          <DialogDescription>
            {t('colors.delete.description', { name: color.name })}
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
            {t('colors.delete.cancel')}
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={submitting}
          >
            {submitting ? t('colors.delete.deleting') : t('colors.delete.confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { ColorsDeleteDialog }
