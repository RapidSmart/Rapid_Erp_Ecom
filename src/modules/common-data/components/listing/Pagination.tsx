import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { useTranslation } from '@/i18n'
import { cn } from '@/shared/utils/utils'
import { PAGE_SIZES } from '../../constants/pagination.data'
import type { PaginationProps } from '../../types/common-data.types'

const navButtonClasses =
  'flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full border border-surface-border text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink disabled:pointer-events-none disabled:opacity-40 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none'

export function Pagination({
  page,
  pageCount,
  pageSize,
  onPageChange,
  onPageSizeChange,
  totalCount,
}: PaginationProps) {
  const { t } = useTranslation()

  const rangeStart = totalCount === 0 ? 0 : (page - 1) * pageSize + 1
  const rangeEnd = Math.min(page * pageSize, totalCount)
  const isFirstPage = page <= 1
  const isLastPage = page >= pageCount

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
      <div
        role="group"
        aria-label={t('common.pagination.pageSizeLabel')}
        className="flex items-center gap-1"
      >
        {PAGE_SIZES.map((size) => (
          <button
            key={size}
            type="button"
            aria-pressed={size === pageSize}
            onClick={() => onPageSizeChange(size)}
            className={cn(
              'flex h-7 min-w-7 cursor-pointer items-center justify-center rounded-full px-2 text-[11px] font-medium transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
              size === pageSize
                ? 'bg-brand-accent text-brand-accent-foreground'
                : 'text-ink-muted hover:bg-surface-muted hover:text-ink'
            )}
          >
            {size}
          </button>
        ))}
        <span
          aria-hidden="true"
          className="flex h-7 min-w-7 items-center justify-center px-2 text-[11px] font-medium text-ink-subtle"
        >
          …
        </span>
      </div>

      <p className="text-[11px] text-ink-subtle" aria-live="polite">
        {t('common.pagination.showing', {
          from: rangeStart,
          to: rangeEnd,
          total: totalCount,
        })}
      </p>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onPageChange(1)}
          disabled={isFirstPage}
          aria-label={t('common.pagination.first')}
          className={navButtonClasses}
        >
          <ChevronsLeft className="size-3.5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={isFirstPage}
          aria-label={t('common.pagination.previous')}
          className={navButtonClasses}
        >
          <ChevronLeft className="size-3.5" aria-hidden="true" />
        </button>

        <span className="flex h-7 items-center gap-1 px-1 text-[11px] font-medium text-ink">
          <span className="flex size-7 items-center justify-center rounded-full bg-brand-accent-surface text-brand-accent">
            {page}
          </span>
          {t('common.pagination.ofPages', { count: pageCount })}
        </span>

        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={isLastPage}
          aria-label={t('common.pagination.next')}
          className={navButtonClasses}
        >
          <ChevronRight className="size-3.5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => onPageChange(pageCount)}
          disabled={isLastPage}
          aria-label={t('common.pagination.last')}
          className={navButtonClasses}
        >
          <ChevronsRight className="size-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
