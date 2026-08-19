import { useNavigate } from 'react-router-dom'
import { useTranslation } from '@/i18n'
import { PageHeader } from '@/shared/components/layout/PageHeader'
import { IndustriesForm } from '../components/IndustriesForm'
import { useIndustriesListing } from '../hooks/useIndustriesListing'

export default function IndustriesAdd() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { createIndustry, isMutating } = useIndustriesListing()

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1560px]">
        <PageHeader
          backText={t("industries.form.backToList") || "Back to list"}
          backHref="/industries"
          breadcrumbItems={[
            { label: "Master data" },
            { label: "Industries" },
            { label: t("industries.form.createTitle") || "New industry", current: true },
          ]}
          title={t("industries.form.createTitle") || "Add an industry"}
          description="Two required fields, the rest optional. Nothing is saved until you press Save industry."
        />
        <IndustriesForm 
          onSubmit={async (payload) => {
            await createIndustry(payload);
            navigate('/industries');
          }}
          submitting={isMutating}
        />
      </div>
    </div>
  )
}
