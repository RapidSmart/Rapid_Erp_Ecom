import { cva } from 'class-variance-authority'
import { useTranslation } from '@/i18n'
import { cn } from '@/shared/utils/utils'
import type { SubCategoryStatusBadgeProps } from '../types/sub-category.types'

const statusBadgeVariants = cva(
  'inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-1 text-[11px] leading-none font-medium',
  {
    variants: {
      status: {
        active: 'bg-status-active-surface text-status-active-ink',
        inactive: 'bg-status-inactive-surface text-status-inactive-ink',
        draft: 'bg-status-draft-surface text-status-draft-ink',
        delete: 'bg-status-delete-surface text-status-delete-ink',
      },
    },
    defaultVariants: {
      status: 'active',
    },
  }
)

export function SubCategoryStatusBadge({ status, className }: SubCategoryStatusBadgeProps) {
  const { t } = useTranslation()

  return (
    <span className={cn(statusBadgeVariants({ status }), className)}>
      <span
        className="size-1.5 rounded-full bg-current"
        aria-hidden="true"
      />
      {t(`subCategory.status.${status}`)}
    </span>
  )
}
