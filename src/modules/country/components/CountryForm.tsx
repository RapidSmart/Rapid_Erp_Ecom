import type { DragEvent } from 'react'
import { useTranslation } from '@/shared/hooks'
import type { CountryPageFormProps } from '../types/country.types'
import { SectionHeader } from './SectionHeader'
import { PillInput } from './PillInput'
import { PillSelect } from './PillSelect'
import { FlagUploadArea } from './FlagUploadArea'
import { FlagChip } from './FlagChip'
import { FormFooter } from './FormFooter'
import { LanguageDropdown } from './LanguageDropdown'
import { Switch } from '@/shared/components/ui/switch'


export function CountryForm({ mode, form }: CountryPageFormProps) {
  const { t } = useTranslation()
  const prefix = mode === 'add' ? 'country.add' : 'country.edit'

  const {
    values,
    isLoading,
    filledRequiredCount,
    totalRequiredCount,
    flagGallery,
    statusOptions,
    errors,
    touched,
    handleFieldChange,
    handleBlur,
    handleFlagUpload,
    handleFlagSelect,
    handleDragOver,
    handleDrop,
    handleClear,
    handleSave,
    stayOnPage,
    toggleStayOnPage,
    handlePrint,
  } = form

  if (isLoading) {
    return (
      <article className="rounded-2xl bg-white p-4 shadow-sm sm:rounded-3xl sm:px-6 sm:pb-6 sm:pt-7 lg:px-8">
        <div className="flex h-64 items-center justify-center text-sm font-medium text-slate-500">
          Loading country details...
        </div>
      </article>
    )
  }

  return (
    <article className="rounded-2xl bg-white p-4 shadow-sm sm:rounded-3xl sm:px-6 sm:pb-6 sm:pt-7 lg:px-8">
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault()
          handleSave()
        }}
      >
        {/* IDENTITY */}
        <section
          aria-label={t(`${prefix}.sections.identity`)}
          className="mb-5 sm:mb-6"
        >
          <SectionHeader label={t(`${prefix}.sections.identity`)} />
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-[1fr_2fr_1fr]">
            <PillInput
              id="country-code"
              placeholder={t(`${prefix}.fields.countryCode`)}
              value={values.countryCode}
              onChange={(v) => handleFieldChange('countryCode', v)}
              onBlur={() => handleBlur('countryCode')}
              error={touched.countryCode && !!errors.countryCode}
              required
            />
            <PillInput
              id="country-name"
              placeholder={t(`${prefix}.fields.name`)}
              value={values.name}
              onChange={(v) => handleFieldChange('name', v)}
              rightIcon={
                <LanguageDropdown
                  currentLanguage="en"
                  onSelectLanguage={(lang) => {
                    console.log('Selected translation language:', lang)
                  }}
                />
              }
              onBlur={() => handleBlur('name')}
              error={touched.name && !!errors.name}
              required
            />
            <PillInput
              id="native-name"
              placeholder={t(`${prefix}.fields.nativeName`)}
              value={values.nativeName}
              onChange={(v) => handleFieldChange('nativeName', v)}
              onBlur={() => handleBlur('nativeName')}
              error={touched.nativeName && !!errors.nativeName}
              required
            />
          </div>
        </section>

        {/* AVAILABILITY */}
        <section
          aria-label={t(`${prefix}.sections.availability`)}
          className="mb-5 sm:mb-6"
        >
          <SectionHeader label={t(`${prefix}.sections.availability`)} />
          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]">
            <PillInput
              id="iso2"
              placeholder={t(`${prefix}.fields.iso2`)}
              value={values.iso2}
              onChange={(v) => handleFieldChange('iso2', v)}
              onBlur={() => handleBlur('iso2')}
              error={touched.iso2 && !!errors.iso2}
              required
            />
            <PillInput
              id="iso3"
              placeholder={t(`${prefix}.fields.iso3`)}
              value={values.iso3}
              onChange={(v) => handleFieldChange('iso3', v)}
              onBlur={() => handleBlur('iso3')}
              error={touched.iso3 && !!errors.iso3}
              required
            />
            <PillInput
              id="iso-numeric"
              placeholder={t(`${prefix}.fields.isoNumeric`)}
              value={values.isoNumeric}
              onChange={(v) => handleFieldChange('isoNumeric', v)}
              onBlur={() => handleBlur('isoNumeric')}
              error={touched.isoNumeric && !!errors.isoNumeric}
              required
            />
            <PillSelect
              id="status"
              placeholder={t(`${prefix}.fields.status`)}
              value={values.status}
              options={statusOptions}
              onChange={(v) =>
                handleFieldChange('status', v as 'active' | 'inactive')
              }
              prefix={
                values.status === 'active' ? (
                  <span
                    className="inline-block h-2 w-2 shrink-0 rounded-full bg-emerald-500"
                    aria-hidden="true"
                  />
                ) : undefined
              }
            />
            <div className="flex h-14 items-center gap-3 rounded-3xl border border-transparent bg-gray-100 px-[22px] transition-colors focus-within:border-blue-400">
              <label htmlFor="is-default" className="text-sm font-medium text-slate-900 cursor-pointer">
                {t(`${prefix}.fields.isDefault`)}
              </label>
              <Switch
                id="is-default"
                checked={values.isDefault}
                onCheckedChange={(checked) => handleFieldChange('isDefault', checked)}
              />
            </div>
          </div>
        </section>

        {/* FLAG AND NOTE */}
        <section
          aria-label={t(`${prefix}.sections.flagAndNote`)}
          className="mb-5 sm:mb-6"
        >
          <SectionHeader label={t(`${prefix}.sections.flagAndNote`)} />

          <FlagUploadArea
            flagFile={values.flagFile}
            selectedFlag={values.selectedFlag}
            flagGallery={flagGallery}
            uploadText={t(`${prefix}.fields.uploadFlag`)}
            onUpload={handleFlagUpload}
            onClearFlag={() => {
              handleFieldChange('flagFile', null)
              handleFieldChange('selectedFlag', null)
            }}
            onDragOver={
              handleDragOver as (e: DragEvent<HTMLDivElement | HTMLButtonElement>) => void
            }
            onDrop={(e) =>
              handleDrop(e as unknown as DragEvent<HTMLElement>)
            }
          />

          <div className="mt-4">
            <p className="mb-2.5 text-xs text-slate-500">
              {t(`${prefix}.fields.pickFromGallery`)}
            </p>
            <div
              role="group"
              aria-label="Flag gallery"
              className="flex flex-wrap gap-1.5 sm:gap-[7px]"
            >
              {flagGallery.map((item) => (
                <FlagChip
                  key={item.code}
                  item={item}
                  selected={values.selectedFlag === item.code}
                  onClick={() => handleFlagSelect(item.code)}
                />
              ))}
            </div>
          </div>

          </section>

        {/* FOOTER */}
        <FormFooter
          filledCount={filledRequiredCount}
          totalCount={totalRequiredCount}
          filledText={t(`${prefix}.footer.fieldsFilled`, {
            filled: filledRequiredCount,
            total: totalRequiredCount,
          })}
          duplicateText={t(`${prefix}.footer.duplicate`)}
          printText={t(`${prefix}.footer.print`)}
          clearText={t(`${prefix}.footer.clear`)}
          saveText={t(`${prefix}.footer.save`)}
          onToggleStayOnPage={toggleStayOnPage}
          stayOnPage={stayOnPage}
          onPrint={handlePrint}
          onClear={handleClear}
          onSave={handleSave}
        />
      </form>
    </article>
  )
}
