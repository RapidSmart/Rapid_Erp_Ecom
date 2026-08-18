import { useParams } from 'react-router-dom'
import { useTranslation } from '@/shared/hooks'
import { useCountryForm } from '../hooks/useCountryForm'
import { MOCK_EDIT_COUNTRY } from '../constants/mock.countries'
import { IconChevronLeft } from '../components/Icons'
import { CountryForm } from '../components/CountryForm'

interface EditCountryPageProps {
  id?: string
}

export function EditCountryPage({ id: propId }: EditCountryPageProps) {
  const params = useParams<{ id: string }>()
  const countryId = propId ?? params.id ?? 'us-1'

  const { t } = useTranslation()
  const form = useCountryForm({
    id: countryId,
    isEditMode: true,
    initialValues: MOCK_EDIT_COUNTRY,
  })

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1560px]">
        {/* Back to list */}
        <div className="mb-5">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-flex h-[40px] items-center gap-[10px] rounded-full border border-slate-200 bg-white px-4 text-[13.5px] font-semibold text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            <IconChevronLeft />
            {t('countries.edit.backToList')}
          </a>
        </div>

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-3">
          <ol className="flex items-center gap-1.5 text-[12.5px]">
            <li>
              <span className="font-medium text-slate-500">
                {t('countries.edit.breadcrumb.masterData')}
              </span>
            </li>
            <li aria-hidden="true" className="text-slate-300">
              /
            </li>
            <li>
              <span className="font-medium text-slate-500">
                {t('countries.edit.breadcrumb.countries')}
              </span>
            </li>
            <li aria-hidden="true" className="text-slate-300">
              /
            </li>
            <li aria-current="page">
              <span className="font-semibold text-slate-900">
                {t('countries.edit.breadcrumb.editCountry')}
              </span>
            </li>
          </ol>
        </nav>

        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-[23px] font-semibold tracking-tight text-slate-900">
            {t('countries.edit.title')}
          </h1>
          <p className="mt-1 text-[13.5px] text-slate-500">
            {t('countries.edit.description')}
          </p>
        </div>

        {/* Form card */}
        <CountryForm mode="edit" form={form} />
      </div>
    </div>
  )
}
