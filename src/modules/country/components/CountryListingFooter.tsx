import { useTranslation } from '@/i18n'

function CountryListingFooter() {
  const { t } = useTranslation()

  return (
    <footer className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-xl border border-surface-border bg-surface px-4 py-3 text-[11px] text-ink-muted sm:grid sm:grid-cols-3">
      <span className="sm:justify-self-start">
        {t('country.footer.poweredBy')}{' '}
        <span className="font-semibold text-brand-accent">
          {t('country.footer.brand')}
        </span>
      </span>

      <span className="sm:justify-self-center">{t('country.footer.help')}</span>

      <span className="flex items-center gap-1.5 sm:justify-self-end">
        <span
          className="size-1.5 rounded-full bg-status-online"
          aria-hidden="true"
        />
        {t('country.footer.chat')}
      </span>
    </footer>
  )
}

export { CountryListingFooter }
