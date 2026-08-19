import { useId, type ReactNode } from 'react'
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
import { Input } from '@/shared/components/ui/input'
import { COUNTRY_STATUS_OPTIONS } from '../constants/country-status.data'
import { useCountryForm } from '../hooks/useCountryForm'
import type {
  Country,
  CountryError,
  CountryFormMode,
  CountryPayload,
  CountryStatus,
} from '../types/country.types'

const MODE_COPY: Record<
  CountryFormMode,
  { title: string; description: string; submit: string }
> = {
  create: {
    title: 'country.form.createTitle',
    description: 'country.form.createDescription',
    submit: 'country.form.submitCreate',
  },
  edit: {
    title: 'country.form.editTitle',
    description: 'country.form.editDescription',
    submit: 'country.form.submitEdit',
  },
  duplicate: {
    title: 'country.form.duplicateTitle',
    description: 'country.form.duplicateDescription',
    submit: 'country.form.submitDuplicate',
  },
}

interface FieldProps {
  id: string
  label: string
  error?: string
  children: ReactNode
}

function Field({ id, label, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-medium text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          aria-live="polite"
          className="text-[11px] text-status-delete-ink"
        >
          {error}
        </p>
      )}
    </div>
  )
}

export interface CountryFormDialogProps {
  mode: CountryFormMode
  country?: Country
  submitting: boolean
  onSubmit: (payload: CountryPayload) => Promise<CountryError | null>
  onClose: () => void
}

function CountryFormDialog({
  mode,
  country,
  submitting,
  onSubmit,
  onClose,
}: CountryFormDialogProps) {
  const { t } = useTranslation()
  const fieldId = useId()
  const { values, errors, formError, setText, setStatus, handleSubmit } =
    useCountryForm({ mode, country, onSubmit, onSuccess: onClose })

  const copy = MODE_COPY[mode]
  const nameId = `${fieldId}-name`
  const iso2Id = `${fieldId}-iso2`
  const iso3Id = `${fieldId}-iso3`
  const currencyId = `${fieldId}-currency`
  const callingCodeId = `${fieldId}-calling-code`
  const statusId = `${fieldId}-status`

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent closeLabel={t('country.form.cancel')}>
        <DialogHeader>
          <DialogTitle>{t(copy.title)}</DialogTitle>
          <DialogDescription>{t(copy.description)}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <Field
            id={nameId}
            label={t('country.form.name')}
            error={errors.name && t(errors.name)}
          >
            <Input
              id={nameId}
              value={values.name}
              onChange={(event) => setText('name', event.target.value)}
              placeholder={t('country.form.namePlaceholder')}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? `${nameId}-error` : undefined}
              autoComplete="off"
              className="text-sm"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field
              id={iso2Id}
              label={t('country.form.iso2')}
              error={errors.iso2 && t(errors.iso2)}
            >
              <Input
                id={iso2Id}
                value={values.iso2}
                onChange={(event) =>
                  setText('iso2', event.target.value.toUpperCase())
                }
                placeholder={t('country.form.iso2Placeholder')}
                maxLength={2}
                aria-invalid={Boolean(errors.iso2)}
                aria-describedby={errors.iso2 ? `${iso2Id}-error` : undefined}
                autoComplete="off"
                className="text-sm uppercase"
              />
            </Field>

            <Field
              id={iso3Id}
              label={t('country.form.iso3')}
              error={errors.iso3 && t(errors.iso3)}
            >
              <Input
                id={iso3Id}
                value={values.iso3}
                onChange={(event) =>
                  setText('iso3', event.target.value.toUpperCase())
                }
                placeholder={t('country.form.iso3Placeholder')}
                maxLength={3}
                aria-invalid={Boolean(errors.iso3)}
                aria-describedby={errors.iso3 ? `${iso3Id}-error` : undefined}
                autoComplete="off"
                className="text-sm uppercase"
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field
              id={currencyId}
              label={t('country.form.currency')}
              error={errors.currency && t(errors.currency)}
            >
              <Input
                id={currencyId}
                value={values.currency}
                onChange={(event) =>
                  setText('currency', event.target.value.toUpperCase())
                }
                placeholder={t('country.form.currencyPlaceholder')}
                maxLength={3}
                aria-invalid={Boolean(errors.currency)}
                aria-describedby={
                  errors.currency ? `${currencyId}-error` : undefined
                }
                autoComplete="off"
                className="text-sm uppercase"
              />
            </Field>

            <Field
              id={callingCodeId}
              label={t('country.form.callingCode')}
              error={errors.callingCode && t(errors.callingCode)}
            >
              <Input
                id={callingCodeId}
                value={values.callingCode}
                onChange={(event) => setText('callingCode', event.target.value)}
                placeholder={t('country.form.callingCodePlaceholder')}
                maxLength={5}
                aria-invalid={Boolean(errors.callingCode)}
                aria-describedby={
                  errors.callingCode ? `${callingCodeId}-error` : undefined
                }
                autoComplete="off"
                className="text-sm"
              />
            </Field>
          </div>

          <Field id={statusId} label={t('country.form.status')}>
            <select
              id={statusId}
              value={values.status}
              onChange={(event) =>
                setStatus(event.target.value as CountryStatus)
              }
              className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm text-ink outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {COUNTRY_STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {t(option.labelKey)}
                </option>
              ))}
            </select>
          </Field>

          {formError && (
            <p
              role="alert"
              className="rounded-lg bg-status-delete-surface px-3 py-2 text-[11px] text-status-delete-ink"
            >
              {formError}
            </p>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={submitting}
            >
              {t('country.form.cancel')}
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="bg-brand-accent text-brand-accent-foreground hover:bg-brand-accent/90"
            >
              {submitting ? t('country.form.submitting') : t(copy.submit)}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { CountryFormDialog }
