import { useTranslation } from '@/i18n'
import { Checkbox } from '@/shared/components/ui/checkbox'
import { cn } from '@/shared/utils/utils'
import { DepartmentImage } from './DepartmentImage'
import { DepartmentStatusBadge } from './DepartmentStatusBadge'
import { formatUpdatedAtCompact } from '../utils/format-updated-at'
import type { DepartmentTableRowProps } from '../types/department.types'

const cellClasses = 'px-4 py-3.5 text-[13px] text-ink-muted'

function DepartmentTableRow({
  department,
  selected,
  onToggleSelected,
  onOpenDetails,
}: DepartmentTableRowProps) {
  const { t } = useTranslation()

  return (
    <tr className="border-b border-surface-border last:border-b-0 hover:bg-surface-muted/60">
      <td className="w-10 px-4 py-3.5">
        <Checkbox
          checked={selected}
          onCheckedChange={(checked) => onToggleSelected(department, !!checked)}
          aria-label={t('department.table.selectRow', { name: department.name })}
        />
      </td>
      <td className="px-4 py-3.5">
        <button
          type="button"
          onClick={() => onOpenDetails(department)}
          aria-label={t('department.card.details', { name: department.name })}
          className="flex cursor-pointer items-center gap-2.5 text-left focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <DepartmentImage imageUrl={department.imageUrl} name={department.name} />
          <span className="truncate text-[13px] font-semibold text-ink">
            {department.name}
          </span>
        </button>
      </td>
      <td className={cn(cellClasses, 'font-semibold')}>{department.code}</td>
      <td className={cn(cellClasses, 'line-clamp-1 truncate max-w-sm')}>{department.description}</td>
      <td className="px-4 py-3.5">
        <DepartmentStatusBadge status={department.status} />
      </td>
      <td className={cellClasses}>
        <time dateTime={department.updatedAt}>
          {formatUpdatedAtCompact(department.updatedAt)}
        </time>
      </td>
    </tr>
  )
}

export { DepartmentTableRow }
