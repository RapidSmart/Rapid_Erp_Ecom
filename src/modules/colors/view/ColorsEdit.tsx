import { useTranslation } from '@/i18n'
import { PageHeader } from '@/shared/components/layout/PageHeader'
import { ColorsForm } from '../components/ColorsForm'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { colorsService } from '../services/colors.service'
import { useColorsListing } from '../hooks/useColorsListing'
import type { Color, ColorId } from '../types/colors.types'

export default function ColorsEdit() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { updateColor, isMutating } = useColorsListing()
  
  const [loading, setLoading] = useState(true)
  const [color, setColor] = useState<Color | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchColor = async () => {
      try {
        const data = await colorsService.get(id as ColorId)
        setColor(data)
      } catch (err: any) {
        setError(err.message || 'Failed to load color')
      } finally {
        setLoading(false)
      }
    }
    
    if (id) {
      fetchColor()
    }
  }, [id])

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1560px]">
        <PageHeader
          backText={t("colors.form.backToList") || "Back to list"}
          backHref="/colors"
          breadcrumbItems={[
            { label: "Master data" },
            { label: "Colors" },
            { label: t("colors.form.editTitle") || "Edit color", current: true },
          ]}
          title={t("colors.form.editTitle") || "Edit color"}
          description="Update color identity, description, and image configuration."
        />
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">{error}</div>
        ) : color ? (
          <ColorsForm 
            color={color} 
            onSubmit={async (payload) => {
              await updateColor(color.id, payload);
              navigate('/colors');
            }}
            submitting={isMutating}
          />
        ) : null}
      </div>
    </div>
  )
}
