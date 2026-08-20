import { useNavigate } from 'react-router-dom'
import { useTranslation } from '@/i18n'
import { PageHeader } from '@/shared/components/layout/PageHeader'
import { BrandsForm } from '../components/BrandsForm'
import { useBrandsListing } from '../hooks/useBrandsListing'

export default function BrandsAdd() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { createBrand, isMutating } = useBrandsListing()

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1560px]">
        <PageHeader
          backText={t("brands.form.backToList") || "Back to list"}
          backHref="/brands"
          breadcrumbItems={[
            { label: "Master data" },
            { label: "Brands" },
            { label: t("brands.form.createTitle") || "New brand", current: true },
          ]}
          title={t("brands.form.createTitle") || "Add an brand"}
          description="Two required fields, the rest optional. Nothing is saved until you press Save brand."
        />
        <BrandsForm 
          onSubmit={async (payload) => {
            await createBrand(payload);
            navigate('/brands');
          }}
          submitting={isMutating}
        />
      </div>
    </div>
  )
}
