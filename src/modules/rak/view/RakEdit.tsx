import { useTranslation } from '@/i18n'
import { PageHeader } from '@/shared/components/layout/PageHeader'
import { RakForm } from '../components/RakForm'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { rakService } from '../services/rak.service'
import { useRakListing } from '../hooks/useRakListing'
import type { Rak, RakId } from '../types/rak.types'

export default function RakEdit() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { updateRak, isMutating } = useRakListing()
  
  const [loading, setLoading] = useState(true)
  const [rak, setRak] = useState<Rak | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRak = async () => {
      try {
        const data = await rakService.get(id as RakId)
        setRak(data)
      } catch (err: any) {
        setError(err.message || 'Failed to load rak')
      } finally {
        setLoading(false)
      }
    }
    
    if (id) {
      fetchRak()
    }
  }, [id])

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1560px]">
        <PageHeader
          backText={t("rak.form.backToList") || "Back to list"}
          backHref="/rak"
          breadcrumbItems={[
            { label: "Master data" },
            { label: "Rak" },
            { label: t("rak.form.editTitle") || "Edit rak", current: true },
          ]}
          title={t("rak.form.editTitle") || "Edit rak"}
          description="Update rak identity, description, and image configuration."
        />
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">{error}</div>
        ) : rak ? (
          <RakForm 
            rak={rak} 
            onSubmit={async (payload) => {
              await updateRak(rak.id, payload);
              navigate('/rak');
            }}
            submitting={isMutating}
          />
        ) : null}
      </div>
    </div>
  )
}
