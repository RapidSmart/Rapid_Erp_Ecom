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
import type { Rak, RakError, RakId } from '../types/rak.types'

export interface RakDeleteDialogProps {
  rak: Rak
  submitting: boolean
  onConfirm: (id: RakId) => Promise<RakError | null>
  onClose: () => void
}

function RakDeleteDialog({
  rak,
  submitting,
  onConfirm,
  onClose,
}: RakDeleteDialogProps) {
  const { t } = useTranslation()
  const [error, setError] = useState<RakError | null>(null)

  function handleConfirm() {
    setError(null)

    void onConfirm(rak.id).then((failure) => {
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
        closeLabel={t('rak.delete.cancel')}
      >
        <DialogHeader>
          <DialogTitle>{t('rak.delete.title')}</DialogTitle>
          <DialogDescription>
            {t('rak.delete.description', { name: rak.name })}
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
            {t('rak.delete.cancel')}
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={submitting}
          >
            {submitting ? t('rak.delete.deleting') : t('rak.delete.confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { RakDeleteDialog }
