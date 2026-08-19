import { Menu, Mic, Search } from 'lucide-react'
import { useTranslation } from '@/i18n'
import { Button } from '@/shared/components/ui/button'
import { ProductViewToggle } from './ProductViewToggle'
import type { ProductView } from '../types/product.types'

export interface ProductListingHeaderProps {
  search: string
  onSearchChange: (value: string) => void
  onToggleMenu: () => void
  onAdd: () => void
  totalCount: number
  view: ProductView
  onToggleView: () => void
}

function ProductListingHeader({
  search,
  onSearchChange,
  onToggleMenu,
  onAdd,
  totalCount,
  view,
  onToggleView,
}: ProductListingHeaderProps) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap sm:gap-4">
      <button
        type="button"
        onClick={onToggleMenu}
        aria-label={t('product.listing.menu')}
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
          {t('product.listing.title')}
        </p>
        <span className="truncate text-[11px] leading-none text-ink-subtle">
          {t('product.listing.subtitle', { count: totalCount })}
        </span>
      </div>

      <ProductViewToggle view={view} onToggle={onToggleView} />

      <div className="order-last flex w-full justify-center sm:order-none sm:w-auto sm:flex-1">
        <label className="flex h-7 w-full max-w-60 items-center gap-2 rounded-full bg-surface-muted px-3">
          <Search className="size-3.5 shrink-0 text-ink-subtle" aria-hidden="true" />
          <span className="sr-only">{t('product.listing.searchLabel')}</span>
          <input
            type="search"
            value={search}
            placeholder={t('product.listing.searchPlaceholder')}
            onChange={(event) => onSearchChange(event.target.value)}
            className="h-full min-w-0 flex-1 bg-transparent text-xs text-ink outline-none placeholder:text-ink-subtle [&::-webkit-search-cancel-button]:hidden"
          />
          <Mic className="size-3.5 shrink-0 text-ink-subtle" aria-hidden="true" />
        </label>
      </div>

      <Button
        onClick={onAdd}
        className="ml-auto h-7 min-w-20 rounded-full bg-brand-accent px-5 text-xs font-medium text-brand-accent-foreground hover:bg-brand-accent/90 sm:ml-0"
      >
        {t('product.listing.add')}
      </Button>
    </div>
  )
}

export { ProductListingHeader }
