import { Copy, Pencil, Trash2 } from 'lucide-react'
import { useTranslation } from '@/i18n'
import { cn } from '@/shared/utils/utils'
import { ProductImage } from './ProductImage'
import { ProductStatusBadge } from './ProductStatusBadge'
import { formatUpdatedAt } from '../utils/format-updated-at'
import type { ProductCardProps } from '../types/product.types'

const actionButtonClasses =
  'flex size-6 cursor-pointer items-center justify-center rounded-md border border-surface-border text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none'

function ProductCard({
  product,
  onOpenDetails,
  onEdit,
  onDuplicate,
  onDelete,
}: ProductCardProps) {
  const { t } = useTranslation()

  return (
    <article className="relative flex w-full flex-col rounded-xl border border-surface-border bg-surface transition-shadow hover:shadow-md">
      <div className="flex flex-1 flex-col px-4 pt-4 pb-3">
        <div className="flex items-center gap-2.5">
          <ProductImage imageUrl={product.imageUrl} name={product.name} />
          {/* Stretched target: the pseudo-element covers the whole card. */}
          <button
            type="button"
            onClick={() => onOpenDetails(product)}
            aria-label={t('product.card.details', { name: product.name })}
            className="min-w-0 cursor-pointer truncate text-left text-sm font-semibold text-ink after:absolute after:inset-0 after:rounded-xl focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            {product.name}
          </button>
          <ProductStatusBadge status={product.status} className="ml-auto" />
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-y-3 gap-x-3">
          <div>
            <dt className="text-[10px] tracking-[0.08em] text-ink-subtle uppercase">
              {t('product.card.sku')}
            </dt>
            <dd className="mt-1 truncate text-[13px] font-medium text-ink">
              {product.sku}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] tracking-[0.08em] text-ink-subtle uppercase">
              {t('product.card.category')}
            </dt>
            <dd className="mt-1 truncate text-[13px] font-medium text-ink capitalize">
              {product.category}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] tracking-[0.08em] text-ink-subtle uppercase">
              {t('product.card.price')}
            </dt>
            <dd className="mt-1 truncate text-[13px] font-semibold text-ink">
              ${product.price.toFixed(2)}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] tracking-[0.08em] text-ink-subtle uppercase">
              {t('product.card.stock')}
            </dt>
            <dd className="mt-1 truncate text-[13px] font-medium text-ink">
              {product.stock}
            </dd>
          </div>
        </dl>
      </div>

      <div className="relative flex items-center justify-between gap-2 border-t border-surface-border px-4 py-1.5">
        <time
          dateTime={product.updatedAt}
          className="truncate text-[11px] text-ink-subtle"
        >
          {t('product.card.updated', {
            value: formatUpdatedAt(product.updatedAt),
          })}
        </time>

        <div className="flex shrink-0 items-center gap-1.5 font-medium z-10">
          <button
            type="button"
            onClick={() => onEdit(product)}
            aria-label={`${t('product.card.edit')} ${product.name}`}
            className={actionButtonClasses}
          >
            <Pencil className="size-3" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onDuplicate(product)}
            aria-label={`${t('product.card.duplicate')} ${product.name}`}
            className={actionButtonClasses}
          >
            <Copy className="size-3" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(product)}
            aria-label={`${t('product.card.delete')} ${product.name}`}
            className={cn(
              actionButtonClasses,
              'text-status-delete-ink hover:bg-status-delete-surface hover:text-status-delete-ink'
            )}
          >
            <Trash2 className="size-3" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  )
}

export { ProductCard }
