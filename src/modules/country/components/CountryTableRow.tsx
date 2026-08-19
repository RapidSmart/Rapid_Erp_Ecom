import { useTranslation } from '@/i18n'
import { Checkbox } from '@/shared/components/ui/checkbox'
import { CountryFlag } from './CountryFlag'
import { CountryStatusBadge } from './CountryStatusBadge'
import { formatUpdatedAtCompact } from '../utils/format-updated-at'
import type { CountryTableRowProps } from '../types/country.types'

const cellClasses = 'px-4 py-3.5 text-[13px] text-ink-muted'

function CountryTableRow({
  country,
  selected,
  onToggleSelected,
  onOpenDetails,
}: CountryTableRowProps) {
  const { t } = useTranslation()

  return (
    <tr className="border-b border-surface-border last:border-b-0 hover:bg-surface-muted/60">
      <td className="w-10 px-4 py-3.5">
        <Checkbox
          checked={selected}
          onCheckedChange={(checked) => onToggleSelected(country, checked)}
          aria-label={t('country.table.selectRow', { name: country.name })}
        />
      </td>
      <td className="px-4 py-3.5">
        <button
          type="button"
          onClick={() => onOpenDetails(country)}
          aria-label={t('country.card.details', { name: country.name })}
          className="flex cursor-pointer items-center gap-2.5 text-left focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <CountryFlag iso2={country.iso2} />
          <span className="truncate text-[13px] font-semibold text-ink">
            {country.name}
          </span>
        </button>
      </td>
      <td className={cellClasses}>{country.currency}</td>
      <td className={cellClasses}>{country.callingCode}</td>
      <td className={cellClasses}>{country.iso2}</td>
      <td className={cellClasses}>{country.iso3}</td>
      <td className="px-4 py-3.5">
        <CountryStatusBadge status={country.status} />
      </td>
      <td className={cellClasses}>
        <time dateTime={country.updatedAt}>
          {formatUpdatedAtCompact(country.updatedAt)}
        </time>
      </td>
    </tr>
  )
}

export { CountryTableRow }
