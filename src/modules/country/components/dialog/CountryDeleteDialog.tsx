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
import type { CountryError, CountryDeleteDialogProps } from '../../types/country.types'

function CountryDeleteDialog({
  country,
  submitting,
  onConfirm,
  onClose,
}: CountryDeleteDialogProps) {
  const { t } = useTranslation()
  const [error, setError] = useState<CountryError | null>(null)

  function handleConfirm() {
    setError(null)

    void onConfirm(country.id).then((failure) => {
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
        closeLabel={t('country.delete.cancel')}
      >
        <DialogHeader>
          <DialogTitle>{t('country.delete.title')}</DialogTitle>
          <DialogDescription>
            {t('country.delete.description', { name: country.name })}
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
            {t('country.delete.cancel')}
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={submitting}
          >
            {submitting ? t('country.delete.deleting') : t('country.delete.confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { CountryDeleteDialog }
