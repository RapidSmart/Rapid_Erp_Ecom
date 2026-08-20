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
import type { Industry, IndustryError, IndustryId } from '../types/industries.types'

export interface IndustriesDeleteDialogProps {
  industry: Industry
  submitting: boolean
  onConfirm: (id: IndustryId) => Promise<IndustryError | null>
  onClose: () => void
}

function IndustriesDeleteDialog({
  industry,
  submitting,
  onConfirm,
  onClose,
}: IndustriesDeleteDialogProps) {
  const { t } = useTranslation()
  const [error, setError] = useState<IndustryError | null>(null)

  function handleConfirm() {
    setError(null)

    void onConfirm(industry.id).then((failure) => {
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
        closeLabel={t('industries.delete.cancel')}
      >
        <DialogHeader>
          <DialogTitle>{t('industries.delete.title')}</DialogTitle>
          <DialogDescription>
            {t('industries.delete.description', { name: industry.name })}
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
            {t('industries.delete.cancel')}
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={submitting}
          >
            {submitting ? t('industries.delete.deleting') : t('industries.delete.confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { IndustriesDeleteDialog }
