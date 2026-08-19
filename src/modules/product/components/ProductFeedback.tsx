import type { LucideIcon } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/utils/utils'

export interface ProductFeedbackProps {
  icon: LucideIcon
  tone?: 'muted' | 'danger'
  title: string
  body: string
  actionLabel?: string
  onAction?: () => void
  /** Skip the card border/background when already nested inside one. */
  bare?: boolean
}

/** Shared empty / no-results / error panel for the product grid and table. */
function ProductFeedback({
  icon: Icon,
  tone = 'muted',
  title,
  body,
  actionLabel,
  onAction,
  bare = false,
}: ProductFeedbackProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-2 px-6 py-14 text-center',
        !bare && 'rounded-xl border border-surface-border bg-surface'
      )}
    >
      <span
        className={cn(
          'flex size-10 items-center justify-center rounded-full',
          tone === 'danger'
            ? 'bg-status-delete-surface text-status-delete-ink'
            : 'bg-surface-muted text-ink-subtle'
        )}
      >
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <p className="text-sm font-semibold text-ink">{title}</p>
      <p className="max-w-sm text-xs text-ink-muted">{body}</p>
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction} className="mt-2">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

export { ProductFeedback }
