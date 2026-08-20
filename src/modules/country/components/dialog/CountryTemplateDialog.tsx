import { useState, useMemo } from 'react'
import { useTranslation } from '@/shared/hooks'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog'
import { X } from 'lucide-react'
import { FLAG_GALLERY, COUNTRY_TEMPLATES } from '../../constants/mock.countries'
import type { CountryTemplate } from '../../types/country.types'

interface CountryTemplateDialogProps {
  onClose: () => void
  onSelect: (template: CountryTemplate) => void
}

export function CountryTemplateDialog({
  onClose,
  onSelect,
}: CountryTemplateDialogProps) {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTemplates = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return COUNTRY_TEMPLATES

    return COUNTRY_TEMPLATES.filter(
      (tpl) =>
        tpl.code.toLowerCase().includes(query) ||
        tpl.name.toLowerCase().includes(query) ||
        tpl.continentLabel.toLowerCase().includes(query),
    )
  }, [searchQuery])

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-[720px] w-full p-0 gap-0 overflow-hidden border border-surface-border bg-surface"
        showCloseButton={true}
        closeLabel={t('country.delete.cancel')}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-surface-border px-6 py-[18px]">
          <DialogHeader className="pr-4">
            <DialogTitle className="text-xl font-bold text-ink leading-none">
              {t('country.templates.title')}
            </DialogTitle>
          </DialogHeader>

          {/* SEARCH INPUT */}
          <div className="relative w-[320px] mr-8">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-subtle flex items-center justify-center pointer-events-none">
              <svg className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.604 10.604Z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder={t('country.templates.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-surface-border bg-surface-muted py-2 pl-[38px] pr-8 text-sm text-ink placeholder:text-ink-subtle outline-none transition-colors focus:border-brand-accent focus:bg-surface focus:ring-1 focus:ring-brand-accent/30"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-subtle hover:text-ink transition-colors"
                aria-label="Clear search"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* COLUMN HEADERS */}
        <div className="grid grid-cols-[150px_1fr_180px] items-center gap-4 border-b border-surface-border bg-surface-muted/40 px-6 py-2.5 text-[11px] font-bold uppercase tracking-wider text-ink-muted">
          <div>{t('country.templates.columns.code')}</div>
          <div>{t('country.templates.columns.name')}</div>
          <div>{t('country.templates.columns.continent')}</div>
        </div>

        {/* LIST CONTAINER */}
        <div className="max-h-[320px] overflow-y-auto divide-y divide-surface-border">
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map((template) => {
              const flagItem = FLAG_GALLERY.find((f) => f.code === template.selectedFlag)
              return (
                <button
                  key={template.code}
                  type="button"
                  onClick={() => {
                    onSelect(template)
                    onClose()
                  }}
                  className="w-full grid grid-cols-[150px_1fr_180px] items-center gap-4 px-6 py-[12px] text-left transition-colors hover:bg-surface-muted/65 text-sm text-ink outline-none focus-visible:bg-surface-muted/65 group"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="h-[18px] w-[26px] shrink-0 rounded-[3px] border border-black/10 shadow-sm"
                      style={{
                        backgroundImage: flagItem?.flagGradient,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                      aria-hidden="true"
                    />
                    <span className="font-mono text-xs font-bold text-ink-muted group-hover:text-ink transition-colors">
                      {template.code}
                    </span>
                  </div>
                  <div className="font-semibold text-ink group-hover:text-brand-accent transition-colors">
                    {template.name}
                  </div>
                  <div className="text-xs font-medium text-ink-muted">
                    {template.continentLabel}
                  </div>
                </button>
              )
            })
          ) : (
            <div className="flex h-32 items-center justify-center text-sm font-medium text-ink-muted">
              {t('country.states.noResultsTitle')}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between border-t border-surface-border px-6 py-4.5 bg-surface-muted/20">
          <span className="text-xs font-semibold text-ink-muted">
            {t('country.templates.showing', {
              count: filteredTemplates.length,
              total: COUNTRY_TEMPLATES.length,
            })}
          </span>
          <span className="text-[11.5px] font-medium text-ink-subtle">
            {t('country.templates.hint')}
          </span>
        </div>
      </DialogContent>
    </Dialog>
  )
}
