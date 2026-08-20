import { TriangleAlert } from 'lucide-react'
import { useRouteError } from 'react-router-dom'
import { useTranslation } from '@/i18n'
import { Feedback } from '@/modules/common-data'

export function DepartmentRouteError() {
  const { t } = useTranslation()
  const error = useRouteError()
  const message = error instanceof Error ? error.message : String(error)

  return (
    <div className="flex min-h-full flex-col bg-canvas p-5">
      <Feedback
        icon={TriangleAlert}
        tone="danger"
        title={t('department.states.errorTitle')}
        body={message}
        actionLabel={t('department.states.errorAction')}
        onAction={() => window.location.reload()}
      />
    </div>
  )
}
