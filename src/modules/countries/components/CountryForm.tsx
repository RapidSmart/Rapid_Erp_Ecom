import type { DragEvent, ChangeEvent } from 'react'
import { useTranslation } from '@/shared/hooks'
import type { UseCountryFormReturn } from '../types/country.types'
import { IconCalendar, IconTranslate } from './Icons'
import { SectionHeader } from './SectionHeader'
import { PillInput } from './PillInput'
import { PillSelect } from './PillSelect'
import { FlagUploadArea } from './FlagUploadArea'
import { FlagChip } from './FlagChip'
import { FormFooter } from './FormFooter'

interface CountryFormProps {
  mode: 'add' | 'edit'
  form: UseCountryFormReturn
}

export function CountryForm({ mode, form }: CountryFormProps) {
  const { t } = useTranslation()
  const prefix = mode === 'add' ? 'countries.add' : 'countries.edit'

  const {
    values,
    isLoading,
    filledRequiredCount,
    totalRequiredCount,
    flagGallery,
    continentOptions,
    currencyOptions,
    statusOptions,
    defaultCountryOptions,
    handleFieldChange,
    handleFlagUpload,
    handleFlagSelect,
    handleDragOver,
    handleDrop,
    handleClear,
    handleSave,
    handleDuplicate,
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
              id="iso-code"
              placeholder={t(`${prefix}.fields.isoCode`)}
              value={values.isoCode}
              onChange={(v) => handleFieldChange('isoCode', v)}
              rightIcon={<IconCalendar />}
              required
            />
            <PillInput
              id="country-name"
              placeholder={t(`${prefix}.fields.countryName`)}
              value={values.countryName}
              onChange={(v) => handleFieldChange('countryName', v)}
              rightIcon={<IconTranslate />}
              required
            />
            <PillInput
              id="dialling-code"
              placeholder={t(`${prefix}.fields.diallingCode`)}
              value={values.diallingCode}
              onChange={(v) => handleFieldChange('diallingCode', v)}
              type="tel"
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
          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <PillSelect
              id="continent"
              placeholder={t(`${prefix}.fields.continent`)}
              value={values.continent}
              options={continentOptions}
              onChange={(v) => handleFieldChange('continent', v)}
              required
            />
            <PillSelect
              id="currency"
              placeholder={t(`${prefix}.fields.currency`)}
              value={values.currency}
              options={currencyOptions}
              onChange={(v) => handleFieldChange('currency', v)}
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
            <PillSelect
              id="default-country"
              placeholder={t(`${prefix}.fields.defaultCountry`)}
              value={values.defaultCountry}
              options={defaultCountryOptions}
              onChange={(v) => handleFieldChange('defaultCountry', v)}
            />
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
            uploadText={t(`${prefix}.fields.uploadFlag`)}
            onUpload={handleFlagUpload}
            onDragOver={
              handleDragOver as (e: DragEvent<HTMLButtonElement>) => void
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

          <div className="mt-4">
            <label htmlFor="internal-note" className="sr-only">
              {t(`${prefix}.fields.internalNote`)}
            </label>
            <textarea
              id="internal-note"
              rows={4}
              value={values.internalNote}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                handleFieldChange('internalNote', e.target.value)
              }
              placeholder={t(`${prefix}.fields.internalNote`)}
              className="w-full resize-none rounded-2xl border border-transparent bg-gray-100 p-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-blue-400 sm:rounded-3xl sm:p-[22px] sm:text-[14.5px]"
            />
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
          onDuplicate={handleDuplicate}
          onPrint={handlePrint}
          onClear={handleClear}
          onSave={handleSave}
        />
      </form>
    </article>
  )
}
