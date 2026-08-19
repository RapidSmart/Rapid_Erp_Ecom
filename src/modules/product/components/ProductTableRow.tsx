import { useTranslation } from '@/i18n'
import { Checkbox } from '@/shared/components/ui/checkbox'
import { cn } from '@/shared/utils/utils'
import { ProductImage } from './ProductImage'
import { ProductStatusBadge } from './ProductStatusBadge'
import { formatUpdatedAtCompact } from '../utils/format-updated-at'
import type { Product } from '../types/product.types'

const cellClasses = 'px-4 py-3.5 text-[13px] text-ink-muted'

export interface ProductTableRowProps {
  product: Product
  selected: boolean
  onToggleSelected: (product: Product, selected: boolean) => void
  onOpenDetails: (product: Product) => void
}

function ProductTableRow({
  product,
  selected,
  onToggleSelected,
  onOpenDetails,
}: ProductTableRowProps) {
  const { t } = useTranslation()

  return (
    <tr className="border-b border-surface-border last:border-b-0 hover:bg-surface-muted/60">
      <td className="w-10 px-4 py-3.5">
        <Checkbox
          checked={selected}
          onCheckedChange={(checked) => onToggleSelected(product, checked)}
          aria-label={t('product.table.selectRow', { name: product.name })}
        />
      </td>
      <td className="px-4 py-3.5">
        <button
          type="button"
          onClick={() => onOpenDetails(product)}
          aria-label={t('product.card.details', { name: product.name })}
          className="flex cursor-pointer items-center gap-2.5 text-left focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <ProductImage imageUrl={product.imageUrl} name={product.name} />
          <span className="truncate text-[13px] font-semibold text-ink">
            {product.name}
          </span>
        </button>
      </td>
      <td className={cellClasses}>{product.sku}</td>
      <td className={cn(cellClasses, 'capitalize')}>{product.category}</td>
      <td className={cn(cellClasses, 'font-semibold')}>${product.price.toFixed(2)}</td>
      <td className={cellClasses}>{product.stock}</td>
      <td className="px-4 py-3.5">
        <ProductStatusBadge status={product.status} />
      </td>
      <td className={cellClasses}>
        <time dateTime={product.updatedAt}>
          {formatUpdatedAtCompact(product.updatedAt)}
        </time>
      </td>
    </tr>
  )
}

export { ProductTableRow }
