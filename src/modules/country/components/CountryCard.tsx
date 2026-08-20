import { Copy, Pencil, Trash2 } from 'lucide-react'
import { useTranslation } from '@/i18n'
import { cn } from '@/shared/utils/utils'
import { StatusBadge, formatUpdatedAt } from '@/modules/common-data'
import { CountryFlag } from './CountryFlag'
import type { CountryCardProps } from '../types/country.types'

const actionButtonClasses =
  'flex size-6 cursor-pointer items-center justify-center rounded-md border border-surface-border text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none'

function CountryCard({
  country,
  onOpenDetails,
  onEdit,
  onDuplicate,
  onDelete,
}: CountryCardProps) {
  const { t } = useTranslation()

  return (
    <article className="relative flex w-full flex-col rounded-xl border border-surface-border bg-surface transition-shadow hover:shadow-md">
      <div className="flex flex-1 flex-col px-4 pt-4 pb-3">
        <div className="flex items-center gap-2.5">
          <CountryFlag iso2={country.iso2} />
          {/* Stretched target: the pseudo-element covers the whole card. */}
          <button
            type="button"
            onClick={() => onOpenDetails(country)}
            aria-label={t('country.card.details', { name: country.name })}
            className="min-w-0 cursor-pointer truncate text-sm font-semibold text-ink after:absolute after:inset-0 after:rounded-xl focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            {country.name}
          </button>
          <StatusBadge status={country.status} className="ml-auto" />
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-x-3">
          <div>
            <dt className="text-[10px] tracking-[0.08em] text-ink-subtle uppercase">
              {t('country.card.iso2')}
            </dt>
            <dd className="mt-2 truncate text-[13px] font-medium text-ink">
              {country.iso2}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] tracking-[0.08em] text-ink-subtle uppercase">
              {t('country.card.iso3')}
            </dt>
            <dd className="mt-2 truncate text-[13px] font-medium text-ink">
              {country.iso3}
            </dd>
          </div>
        </dl>
      </div>

      <div className="relative flex items-center justify-between gap-2 border-t border-surface-border px-4 py-1.5">
        <time
          dateTime={country.updatedAt}
          className="truncate text-[11px] text-ink-subtle"
        >
          {t('country.card.updated', {
            value: formatUpdatedAt(country.updatedAt),
          })}
        </time>

        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={() => onEdit(country)}
            aria-label={`${t('country.card.edit')} ${country.name}`}
            className={actionButtonClasses}
          >
            <Pencil className="size-3" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onDuplicate(country)}
            aria-label={`${t('country.card.duplicate')} ${country.name}`}
            className={actionButtonClasses}
          >
            <Copy className="size-3" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(country)}
            aria-label={`${t('country.card.delete')} ${country.name}`}
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

export { CountryCard }
