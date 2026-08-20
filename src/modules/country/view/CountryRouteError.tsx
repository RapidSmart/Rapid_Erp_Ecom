import { TriangleAlert } from 'lucide-react'
import { useRouteError } from 'react-router-dom'
import { useTranslation } from '@/i18n'
import { Feedback } from '@/modules/common-data'

/** Route-level boundary for the country module — never a blank screen. */
function CountryRouteError() {
  const { t } = useTranslation()
  const error = useRouteError()
  const message = error instanceof Error ? error.message : String(error)

  return (
    <div className="flex min-h-full flex-col bg-canvas p-5">
      <Feedback
        icon={TriangleAlert}
        tone="danger"
        title={t('country.states.errorTitle')}
        body={message}
        actionLabel={t('country.states.errorAction')}
        onAction={() => window.location.reload()}
      />
    </div>
  )
}

export { CountryRouteError }
