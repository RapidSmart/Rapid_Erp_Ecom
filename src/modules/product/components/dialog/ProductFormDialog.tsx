import { useId } from 'react'
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
import { PRODUCT_STATUS_OPTIONS } from '../../constants/product-status.data'
import { CATEGORY_OPTIONS } from '../../constants/mock.products'
import { useProductForm } from '../../hooks/useProductForm'
import { MODE_COPY } from '../../constants/product-form.data'
import type {
  Product,
  ProductError,
  ProductFormMode,
  ProductPayload,
  ProductStatus,
  ProductFormFieldProps,
} from '../../types/product.types'

function Field({ id, label, error, children }: ProductFormFieldProps) {
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

export interface ProductFormDialogProps {
  mode: ProductFormMode
  product?: Product
  submitting: boolean
  onSubmit: (payload: ProductPayload) => Promise<ProductError | null>
  onClose: () => void
}

function ProductFormDialog({
  mode,
  product,
  submitting,
  onSubmit,
  onClose,
}: ProductFormDialogProps) {
  const { t } = useTranslation()
  const fieldId = useId()
  const { values, errors, formError, setText, setStatus, handleSubmit } =
    useProductForm({ mode, product, onSubmit, onSuccess: onClose })

  const copy = MODE_COPY[mode]
  const nameId = `${fieldId}-name`
  const skuId = `${fieldId}-sku`
  const categoryId = `${fieldId}-category`
  const priceId = `${fieldId}-price`
  const stockId = `${fieldId}-stock`
  const statusId = `${fieldId}-status`

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent closeLabel={t('product.form.cancel')}>
        <DialogHeader>
          <DialogTitle>{t(copy.title)}</DialogTitle>
          <DialogDescription>{t(copy.description)}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <Field
            id={nameId}
            label={t('product.form.name')}
            error={errors.name && t(errors.name)}
          >
            <Input
              id={nameId}
              value={values.name}
              onChange={(event) => setText('name', event.target.value)}
              placeholder={t('product.form.namePlaceholder')}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? `${nameId}-error` : undefined}
              autoComplete="off"
              className="text-sm"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field
              id={skuId}
              label={t('product.form.sku')}
              error={errors.sku && t(errors.sku)}
            >
              <Input
                id={skuId}
                value={values.sku}
                onChange={(event) =>
                  setText('sku', event.target.value.toUpperCase())
                }
                placeholder={t('product.form.skuPlaceholder')}
                maxLength={30}
                aria-invalid={Boolean(errors.sku)}
                aria-describedby={errors.sku ? `${skuId}-error` : undefined}
                autoComplete="off"
                className="text-sm uppercase"
              />
            </Field>

            <Field id={categoryId} label={t('product.form.category')}>
              <select
                id={categoryId}
                value={values.category}
                onChange={(event) => setText('category', event.target.value)}
                className="h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm text-ink outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <option value="" disabled>
                  {t('product.form.categoryPlaceholder')}
                </option>
                {CATEGORY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field
              id={priceId}
              label={t('product.form.price')}
              error={errors.price && t(errors.price)}
            >
              <Input
                id={priceId}
                type="number"
                step="0.01"
                min="0"
                value={values.price || ''}
                onChange={(event) => setText('price', event.target.value)}
                placeholder="0.00"
                aria-invalid={Boolean(errors.price)}
                aria-describedby={errors.price ? `${priceId}-error` : undefined}
                autoComplete="off"
                className="text-sm"
              />
            </Field>

            <Field
              id={stockId}
              label={t('product.form.stock')}
              error={errors.stock && t(errors.stock)}
            >
              <Input
                id={stockId}
                type="number"
                min="0"
                value={values.stock || ''}
                onChange={(event) => setText('stock', event.target.value)}
                placeholder="0"
                aria-invalid={Boolean(errors.stock)}
                aria-describedby={errors.stock ? `${stockId}-error` : undefined}
                autoComplete="off"
                className="text-sm"
              />
            </Field>
          </div>

          <Field id={statusId} label={t('product.form.status')}>
            <select
              id={statusId}
              value={values.status}
              onChange={(event) =>
                setStatus(event.target.value as ProductStatus)
              }
              className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm text-ink outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {PRODUCT_STATUS_OPTIONS.map((option) => (
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
              {t('product.form.cancel')}
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="bg-brand-accent text-brand-accent-foreground hover:bg-brand-accent/90"
            >
              {submitting ? t('product.form.submitting') : t(copy.submit)}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { ProductFormDialog }
