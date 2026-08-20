import { useNavigate } from 'react-router-dom'
import { useTranslation } from '@/i18n'
import { PageHeader } from '@/shared/components/layout/PageHeader'
import { ColorsForm } from '../components/ColorsForm'
import { useColorsListing } from '../hooks/useColorsListing'

export default function ColorsAdd() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { createColor, isMutating } = useColorsListing()

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1560px]">
        <PageHeader
          backText={t("colors.form.backToList") || "Back to list"}
          backHref="/colors"
          breadcrumbItems={[
            { label: "Master data" },
            { label: "Colors" },
            { label: t("colors.form.createTitle") || "New color", current: true },
          ]}
          title={t("colors.form.createTitle") || "Add a color"}
          description="Two required fields, the rest optional. Nothing is saved until you press Save color."
        />
        <ColorsForm 
          onSubmit={async (payload) => {
            await createColor(payload);
            navigate('/colors');
          }}
          submitting={isMutating}
        />
      </div>
    </div>
  )
}
