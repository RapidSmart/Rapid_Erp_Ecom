import type { ProductFormMode } from '../types/product.types'

export const MODE_COPY: Record<
  ProductFormMode,
  { title: string; description: string; submit: string }
> = {
  create: {
    title: 'product.form.createTitle',
    description: 'product.form.createDescription',
    submit: 'product.form.submitCreate',
  },
  edit: {
    title: 'product.form.editTitle',
    description: 'product.form.editDescription',
    submit: 'product.form.submitEdit',
  },
  duplicate: {
    title: 'product.form.duplicateTitle',
    description: 'product.form.duplicateDescription',
    submit: 'product.form.submitDuplicate',
  },
}
