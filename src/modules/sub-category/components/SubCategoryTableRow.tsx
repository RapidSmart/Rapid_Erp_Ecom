import { useTranslation } from '@/i18n'
import { Checkbox } from '@/shared/components/ui/checkbox'
import { cn } from '@/shared/utils/utils'
import { StatusBadge, formatUpdatedAtCompact } from '@/modules/common-data'
import { SubCategoryImage } from './SubCategoryImage'
import type { SubCategoryTableRowProps } from '../types/sub-category.types'

const cellClasses = 'px-4 py-3.5 text-[13px] text-ink-muted'

function SubCategoryTableRow({
  subCategory,
  selected,
  onToggleSelected,
  onOpenDetails,
}: SubCategoryTableRowProps) {
  const { t } = useTranslation()

  return (
    <tr className="border-b border-surface-border last:border-b-0 hover:bg-surface-muted/60">
      <td className="w-10 px-4 py-3.5">
        <Checkbox
          checked={selected}
          onCheckedChange={(checked) => onToggleSelected(subCategory, !!checked)}
          aria-label={t('subCategory.table.selectRow', { name: subCategory.name })}
        />
      </td>
      <td className="px-4 py-3.5">
        <button
          type="button"
          onClick={() => onOpenDetails(subCategory)}
          aria-label={t('subCategory.card.details', { name: subCategory.name })}
          className="flex cursor-pointer items-center gap-2.5 text-left focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <SubCategoryImage imageUrl={subCategory.imageUrl} name={subCategory.name} />
          <span className="truncate text-[13px] font-semibold text-ink">
            {subCategory.name}
          </span>
        </button>
      </td>
      <td className={cn(cellClasses, 'font-semibold')}>{subCategory.code}</td>
      <td className={cn(cellClasses, 'line-clamp-1 truncate max-w-sm')}>{subCategory.description}</td>
      <td className="px-4 py-3.5">
        <StatusBadge status={subCategory.status} />
      </td>
      <td className={cellClasses}>
        <time dateTime={subCategory.updatedAt}>
          {formatUpdatedAtCompact(subCategory.updatedAt)}
        </time>
      </td>
    </tr>
  )
}

export { SubCategoryTableRow }
