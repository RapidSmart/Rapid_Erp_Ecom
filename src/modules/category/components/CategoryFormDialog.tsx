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
import { useCategoryForm } from '../hooks/useCategoryForm'
import type {
  Category,
  CategoryError,
  CategoryFormMode,
  CategoryPayload,
} from '../types/category.types'

const MODE_COPY: Record<
  CategoryFormMode,
  { title: string; description: string; submit: string }
> = {
  create: {
    title: 'category.form.createTitle',
    description: 'category.form.createDescription',
    submit: 'category.form.submitCreate',
  },
  edit: {
    title: 'category.form.editTitle',
    description: 'category.form.editDescription',
    submit: 'category.form.submitEdit',
  },
  duplicate: {
    title: 'category.form.duplicateTitle',
    description: 'category.form.duplicateDescription',
    submit: 'category.form.submitDuplicate',
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

export interface CategoryFormDialogProps {
  mode: CategoryFormMode
  category?: Category
  submitting: boolean
  onSubmit: (payload: CategoryPayload) => Promise<CategoryError | null>
  onClose: () => void
}

function CategoryFormDialog({
  mode,
  category,
  submitting,
  onSubmit,
  onClose,
}: CategoryFormDialogProps) {
  const { t } = useTranslation()
  const fieldId = useId()
  const { values, errors, formError, setText, handleSubmit } =
    useCategoryForm({ mode, category, onSubmit, onSuccess: onClose })

  const copy = MODE_COPY[mode]
  const codeId = `${fieldId}-code`
  const nameId = `${fieldId}-name`
  const descId = `${fieldId}-description`

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent closeLabel={t('category.form.cancel')}>
        <DialogHeader>
          <DialogTitle>{t(copy.title)}</DialogTitle>
          <DialogDescription>{t(copy.description)}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <Field
            id={codeId}
            label={t('category.form.code')}
            error={errors.code && t(errors.code)}
          >
            <Input
              id={codeId}
              value={values.code}
              onChange={(event) => setText('code', event.target.value.toUpperCase())}
              placeholder={t('category.form.codePlaceholder')}
              maxLength={10}
              disabled={mode === 'edit'}
              aria-invalid={Boolean(errors.code)}
              aria-describedby={errors.code ? `${codeId}-error` : undefined}
              autoComplete="off"
              className="text-sm uppercase"
            />
          </Field>

          <Field
            id={nameId}
            label={t('category.form.name')}
            error={errors.name && t(errors.name)}
          >
            <Input
              id={nameId}
              value={values.name}
              onChange={(event) => setText('name', event.target.value)}
              placeholder={t('category.form.namePlaceholder')}
              maxLength={40}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? `${nameId}-error` : undefined}
              autoComplete="off"
              className="text-sm"
            />
          </Field>

          <Field
            id={descId}
            label={t('category.form.description')}
            error={errors.description && t(errors.description)}
          >
            <textarea
              id={descId}
              rows={3}
              value={values.description}
              onChange={(event) => setText('description', event.target.value)}
              placeholder={t('category.form.descriptionPlaceholder')}
              maxLength={200}
              aria-invalid={Boolean(errors.description)}
              aria-describedby={errors.description ? `${descId}-error` : undefined}
              className="w-full resize-none rounded-lg border border-input bg-transparent px-3 py-2 text-sm text-ink outline-none placeholder:text-ink-subtle focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
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
              {t('category.form.cancel')}
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="bg-brand-accent text-brand-accent-foreground hover:bg-brand-accent/90"
            >
              {submitting ? t('category.form.submitting') : t(copy.submit)}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { CategoryFormDialog }
