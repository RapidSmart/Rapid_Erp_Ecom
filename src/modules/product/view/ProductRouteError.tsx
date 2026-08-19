import { TriangleAlert } from 'lucide-react'
import { useRouteError } from 'react-router-dom'
import { useTranslation } from '@/i18n'
import { ProductFeedback } from '../components/ProductFeedback'

function ProductRouteError() {
  const { t } = useTranslation()
  const error = useRouteError()
  const message = error instanceof Error ? error.message : String(error)

  return (
    <div className="flex min-h-full flex-col bg-canvas p-5">
      <ProductFeedback
        icon={TriangleAlert}
        tone="danger"
        title={t('product.states.errorTitle')}
        body={message}
        actionLabel={t('product.states.errorAction')}
        onAction={() => window.location.reload()}
      />
    </div>
  )
}

export { ProductRouteError }
