import { Copy, Pencil, Trash2 } from 'lucide-react'
import { useTranslation } from '@/i18n'
import { cn } from '@/shared/utils/utils'
import { StatusBadge, formatUpdatedAt } from '@/modules/common-data'
import { DepartmentImage } from './DepartmentImage'
import type { DepartmentCardProps } from '../types/department.types'

const actionButtonClasses =
  'flex size-6 cursor-pointer items-center justify-center rounded-md border border-surface-border text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none'

function DepartmentCard({
  department,
  onOpenDetails,
  onEdit,
  onDuplicate,
  onDelete,
}: DepartmentCardProps) {
  const { t } = useTranslation()

  return (
    <article className="relative flex w-full flex-col rounded-xl border border-surface-border bg-surface transition-shadow hover:shadow-md">
      <div className="flex flex-1 flex-col px-4 pt-4 pb-3">
        <div className="flex items-center gap-2.5">
          <DepartmentImage imageUrl={department.imageUrl} name={department.name} />
          <button
            type="button"
            onClick={() => onOpenDetails(department)}
            aria-label={t('department.card.details', { name: department.name })}
            className="min-w-0 cursor-pointer truncate text-left text-sm font-semibold text-ink after:absolute after:inset-0 after:rounded-xl focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            {department.name}
          </button>
          <StatusBadge status={department.status} className="ml-auto" />
        </div>

        <div className="mt-4 flex flex-col gap-1">
          <span className="text-[10px] tracking-[0.08em] text-ink-subtle uppercase">
            {t('department.card.code')} {department.code}
          </span>
          <p className="line-clamp-2 text-[13px] text-ink-muted leading-relaxed">
            {department.description}
          </p>
        </div>
      </div>

      <div className="relative flex items-center justify-between gap-2 border-t border-surface-border px-4 py-1.5">
        <time
          dateTime={department.updatedAt}
          className="truncate text-[11px] text-ink-subtle"
        >
          {t('department.card.updated', {
            value: formatUpdatedAt(department.updatedAt),
          })}
        </time>

        <div className="flex shrink-0 items-center gap-1.5 font-medium z-10">
          <button
            type="button"
            onClick={() => onEdit(department)}
            aria-label={`${t('department.card.edit')} ${department.name}`}
            className={actionButtonClasses}
          >
            <Pencil className="size-3" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onDuplicate(department)}
            aria-label={`${t('department.card.duplicate')} ${department.name}`}
            className={actionButtonClasses}
          >
            <Copy className="size-3" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(department)}
            aria-label={`${t('department.card.delete')} ${department.name}`}
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

export { DepartmentCard }
