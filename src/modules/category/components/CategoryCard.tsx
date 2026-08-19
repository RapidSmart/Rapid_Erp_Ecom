import { Copy, Pencil, Trash2 } from 'lucide-react'
import { useTranslation } from '@/i18n'
import { cn } from '@/shared/utils/utils'
import { CategoryImage } from './CategoryImage'
import { CategoryStatusBadge } from './CategoryStatusBadge'
import { formatUpdatedAt } from '../utils/format-updated-at'
import type { CategoryCardProps } from '../types/category.types'

const actionButtonClasses =
  'flex size-6 cursor-pointer items-center justify-center rounded-md border border-surface-border text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none'

function CategoryCard({
  category,
  onOpenDetails,
  onEdit,
  onDuplicate,
  onDelete,
}: CategoryCardProps) {
  const { t } = useTranslation()

  return (
    <article className="relative flex w-full flex-col rounded-xl border border-surface-border bg-surface transition-shadow hover:shadow-md">
      <div className="flex flex-1 flex-col px-4 pt-4 pb-3">
        <div className="flex items-center gap-2.5">
          <CategoryImage imageUrl={category.imageUrl} name={category.name} />
          <button
            type="button"
            onClick={() => onOpenDetails(category)}
            aria-label={t('category.card.details', { name: category.name })}
            className="min-w-0 cursor-pointer truncate text-left text-sm font-semibold text-ink after:absolute after:inset-0 after:rounded-xl focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            {category.name}
          </button>
          <CategoryStatusBadge status={category.status} className="ml-auto" />
        </div>

        <div className="mt-4 flex flex-col gap-1">
          <span className="text-[10px] tracking-[0.08em] text-ink-subtle uppercase">
            {t('category.card.code')} {category.code}
          </span>
          <p className="line-clamp-2 text-[13px] text-ink-muted leading-relaxed">
            {category.description}
          </p>
        </div>
      </div>

      <div className="relative flex items-center justify-between gap-2 border-t border-surface-border px-4 py-1.5">
        <time
          dateTime={category.updatedAt}
          className="truncate text-[11px] text-ink-subtle"
        >
          {t('category.card.updated', {
            value: formatUpdatedAt(category.updatedAt),
          })}
        </time>

        <div className="flex shrink-0 items-center gap-1.5 font-medium z-10">
          <button
            type="button"
            onClick={() => onEdit(category)}
            aria-label={`${t('category.card.edit')} ${category.name}`}
            className={actionButtonClasses}
          >
            <Pencil className="size-3" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onDuplicate(category)}
            aria-label={`${t('category.card.duplicate')} ${category.name}`}
            className={actionButtonClasses}
          >
            <Copy className="size-3" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(category)}
            aria-label={`${t('category.card.delete')} ${category.name}`}
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

export { CategoryCard }
