import { Menu, Mic, Search } from 'lucide-react'
import { useTranslation } from '@/i18n'
import { Button } from '@/shared/components/ui/button'
import { ColorsViewToggle } from './ColorsViewToggle'
import type { ColorView } from '../types/colors.types'

export interface ColorsListingHeaderProps {
  search: string
  onSearchChange: (value: string) => void
  onToggleMenu: () => void
  onAdd: () => void
  totalCount: number
  view: ColorView
  onToggleView: () => void
}

function ColorsListingHeader({
  search,
  onSearchChange,
  onToggleMenu,
  onAdd,
  totalCount,
  view,
  onToggleView,
}: ColorsListingHeaderProps) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap sm:gap-4">
      <button
        type="button"
        onClick={onToggleMenu}
        aria-label={t('colors.listing.menu')}
        className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-ink transition-colors hover:bg-surface-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
      >
        <Menu className="size-5" aria-hidden="true" />
      </button>

      <div className="flex flex-col gap-0.5">
        <p
          role="heading"
          aria-level={1}
          className="m-0 truncate text-base leading-none font-semibold text-ink"
        >
          {t('colors.listing.title')}
        </p>
        <span className="truncate text-[11px] leading-none text-ink-subtle">
          {t('colors.listing.subtitle', { count: totalCount })}
        </span>
      </div>

      <ColorsViewToggle view={view} onToggle={onToggleView} />

      <div className="order-last flex w-full justify-center sm:order-none sm:w-auto sm:flex-1">
        <label className="flex h-7 w-full max-w-60 items-center gap-2 rounded-full bg-surface-muted px-3">
          <Search className="size-3.5 shrink-0 text-ink-subtle" aria-hidden="true" />
          <span className="sr-only">{t('colors.listing.searchLabel')}</span>
          <input
            type="search"
            value={search}
            placeholder={t('colors.listing.searchPlaceholder')}
            onChange={(event) => onSearchChange(event.target.value)}
            className="h-full min-w-0 flex-1 bg-transparent text-xs text-ink outline-none placeholder:text-ink-subtle [&::-webkit-search-cancel-button]:hidden"
          />
          <Mic className="size-3.5 shrink-0 text-ink-subtle" aria-hidden="true" />
        </label>
      </div>

      <Button
        onClick={onAdd}
        className="ml-auto h-7 min-w-20 rounded-full bg-primary px-5 text-xs font-medium text-primary-foreground hover:bg-primary/90 sm:ml-0 cursor-pointer"
      >
        {t('colors.listing.add')}
      </Button>
    </div>
  )
}

export { ColorsListingHeader }
