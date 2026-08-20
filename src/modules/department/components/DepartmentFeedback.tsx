import type { DepartmentFeedbackProps } from '../types/department.types'
import { Button } from '@/shared/components/ui/button'

function DepartmentFeedback({
  actionIcon: Icon,
  title,
  body,
  actionLabel,
  onAction,
}: DepartmentFeedbackProps) {
  return (
    <div className="flex flex-col items-center gap-2 px-6 py-14 text-center rounded-xl border border-surface-border bg-surface">
      {Icon && (
        <span className="flex size-10 items-center justify-center rounded-full bg-surface-muted text-ink-subtle">
          <Icon className="size-5" aria-hidden="true" />
        </span>
      )}
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

export { DepartmentFeedback }
