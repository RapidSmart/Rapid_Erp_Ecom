import { useTranslation } from '@/i18n'
import { PageHeader } from '@/shared/components/layout/PageHeader'
import { IndustriesForm } from '../components/IndustriesForm'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { industriesService } from '../services/industries.service'
import { useIndustriesListing } from '../hooks/useIndustriesListing'
import type { Industry, IndustryId } from '../types/industries.types'

export default function IndustriesEdit() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { updateIndustry, isMutating } = useIndustriesListing()
  
  const [loading, setLoading] = useState(true)
  const [industry, setIndustry] = useState<Industry | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchIndustry = async () => {
      try {
        const data = await industriesService.get(id as IndustryId)
        setIndustry(data)
      } catch (err: any) {
        setError(err.message || 'Failed to load industry')
      } finally {
        setLoading(false)
      }
    }
    
    if (id) {
      fetchIndustry()
    }
  }, [id])

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1560px]">
        <PageHeader
          backText={t("industries.form.backToList") || "Back to list"}
          backHref="/industries"
          breadcrumbItems={[
            { label: "Master data" },
            { label: "Industries" },
            { label: t("industries.form.editTitle") || "Edit industry", current: true },
          ]}
          title={t("industries.form.editTitle") || "Edit industry"}
          description="Update industry identity, description, and image configuration."
        />
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">{error}</div>
        ) : industry ? (
          <IndustriesForm 
            industry={industry} 
            onSubmit={async (payload) => {
              await updateIndustry(industry.id, payload);
              navigate('/industries');
            }}
            submitting={isMutating}
          />
        ) : null}
      </div>
    </div>
  )
}
