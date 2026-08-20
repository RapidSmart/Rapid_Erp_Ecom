import { useNavigate } from 'react-router-dom'
import { useTranslation } from '@/i18n'
import { PageHeader } from '@/shared/components/layout/PageHeader'
import { RakForm } from '../components/RakForm'
import { useRakListing } from '../hooks/useRakListing'

export default function RakAdd() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { createRak, isMutating } = useRakListing()

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1560px]">
        <PageHeader
          backText={t("rak.form.backToList") || "Back to list"}
          backHref="/rak"
          breadcrumbItems={[
            { label: "Master data" },
            { label: "Rak" },
            { label: t("rak.form.createTitle") || "New rak", current: true },
          ]}
          title={t("rak.form.createTitle") || "Add a Rak"}
          description="Two required fields, the rest optional. Nothing is saved until you press Save rak."
        />
        <RakForm 
          onSubmit={async (payload) => {
            await createRak(payload);
            navigate('/rak');
          }}
          submitting={isMutating}
        />
      </div>
    </div>
  )
}
