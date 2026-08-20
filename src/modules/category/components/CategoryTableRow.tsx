import { useTranslation } from '@/i18n'
import { Checkbox } from '@/shared/components/ui/checkbox'
import { cn } from '@/shared/utils/utils'
import { StatusBadge, formatUpdatedAtCompact } from '@/modules/common-data'
import { CategoryImage } from './CategoryImage'
import type { CategoryTableRowProps } from '../types/category.types'

const cellClasses = 'px-4 py-3.5 text-[13px] text-ink-muted'

function CategoryTableRow({
  category,
  selected,
  onToggleSelected,
  onOpenDetails,
}: CategoryTableRowProps) {
  const { t } = useTranslation()

  return (
    <tr className="border-b border-surface-border last:border-b-0 hover:bg-surface-muted/60">
      <td className="w-10 px-4 py-3.5">
        <Checkbox
          checked={selected}
          onCheckedChange={(checked) => onToggleSelected(category, checked)}
          aria-label={t('category.table.selectRow', { name: category.name })}
        />
      </td>
      <td className="px-4 py-3.5">
        <button
          type="button"
          onClick={() => onOpenDetails(category)}
          aria-label={t('category.card.details', { name: category.name })}
          className="flex cursor-pointer items-center gap-2.5 text-left focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <CategoryImage imageUrl={category.imageUrl} name={category.name} />
          <span className="truncate text-[13px] font-semibold text-ink">
            {category.name}
          </span>
        </button>
      </td>
      <td className={cn(cellClasses, 'font-semibold')}>{category.code}</td>
      <td className={cn(cellClasses, 'line-clamp-1 truncate max-w-sm')}>{category.description}</td>
      <td className="px-4 py-3.5">
        <StatusBadge status={category.status} />
      </td>
      <td className={cellClasses}>
        <time dateTime={category.updatedAt}>
          {formatUpdatedAtCompact(category.updatedAt)}
        </time>
      </td>
    </tr>
  )
}

export { CategoryTableRow }
