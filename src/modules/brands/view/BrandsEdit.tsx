import { useTranslation } from '@/i18n'
import { PageHeader } from '@/shared/components/layout/PageHeader'
import { BrandsForm } from '../components/BrandsForm'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { brandsService } from '../services/brands.service'
import { useBrandsListing } from '../hooks/useBrandsListing'
import type { Brand, BrandId } from '../types/brands.types'

export default function BrandsEdit() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { updateBrand, isMutating } = useBrandsListing()
  
  const [loading, setLoading] = useState(true)
  const [brand, setBrand] = useState<Brand | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const data = await brandsService.get(id as BrandId)
        setBrand(data)
      } catch (err: any) {
        setError(err.message || 'Failed to load brand')
      } finally {
        setLoading(false)
      }
    }
    
    if (id) {
      fetchBrand()
    }
  }, [id])

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1560px]">
        <PageHeader
          backText={t("brands.form.backToList") || "Back to list"}
          backHref="/brands"
          breadcrumbItems={[
            { label: "Master data" },
            { label: "Brands" },
            { label: t("brands.form.editTitle") || "Edit brand", current: true },
          ]}
          title={t("brands.form.editTitle") || "Edit brand"}
          description="Update brand identity, description, and image configuration."
        />
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">{error}</div>
        ) : brand ? (
          <BrandsForm 
            brand={brand} 
            onSubmit={async (payload) => {
              await updateBrand(brand.id, payload);
              navigate('/brands');
            }}
            submitting={isMutating}
          />
        ) : null}
      </div>
    </div>
  )
}
