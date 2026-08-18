import type { ChangeEvent, DragEvent } from "react";
import { useTranslation } from "@/shared/hooks";
import { useCountryForm } from "../hooks/useCountryForm";
import {
  IconCalendar,
  IconChevronLeft,
  IconTranslate,
} from "../components/Icons";
import { SectionHeader } from "../components/SectionHeader";
import { PillInput } from "../components/PillInput";
import { PillSelect } from "../components/PillSelect";
import { FlagUploadArea } from "../components/FlagUploadArea";
import { FlagChip } from "../components/FlagChip";
import { FormFooter } from "../components/FormFooter";

export function AddCountryPage() {
  const { t } = useTranslation();
  const {
    values,
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
  } = useCountryForm();

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="mx-auto max-w-[1560px]">
        {/* Back to list */}
        <div className="mb-5">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-flex h-[40px] items-center gap-[10px] rounded-full border border-slate-200 bg-white px-4 text-[13.5px] font-semibold text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            <IconChevronLeft />
            {t("countries.add.backToList")}
          </a>
        </div>

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-3">
          <ol className="flex items-center gap-1.5 text-[12.5px]">
            <li>
              <span className="font-medium text-slate-500">
                {t("countries.add.breadcrumb.masterData")}
              </span>
            </li>
            <li aria-hidden="true" className="text-slate-300">
              /
            </li>
            <li>
              <span className="font-medium text-slate-500">
                {t("countries.add.breadcrumb.countries")}
              </span>
            </li>
            <li aria-hidden="true" className="text-slate-300">
              /
            </li>
            <li aria-current="page">
              <span className="font-semibold text-slate-900">
                {t("countries.add.breadcrumb.newCountry")}
              </span>
            </li>
          </ol>
        </nav>

        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-[23px] font-semibold tracking-tight text-slate-900">
            {t("countries.add.title")}
          </h1>
          <p className="mt-1 text-[13.5px] text-slate-500">
            {t("countries.add.description")}
          </p>
        </div>

        {/* Form card */}
        <article className="rounded-2xl bg-white p-4 shadow-sm sm:rounded-3xl sm:px-6 sm:pb-6 sm:pt-7 lg:px-8">
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            {/* IDENTITY */}
            <section
              aria-label={t("countries.add.sections.identity")}
              className="mb-5 sm:mb-6"
            >
              <SectionHeader label={t("countries.add.sections.identity")} />
              <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-[1fr_2fr_1fr]">
                <PillInput
                  id="iso-code"
                  placeholder={t("countries.add.fields.isoCode")}
                  value={values.isoCode}
                  onChange={(v) => handleFieldChange("isoCode", v)}
                  rightIcon={<IconCalendar />}
                  required
                />
                <PillInput
                  id="country-name"
                  placeholder={t("countries.add.fields.countryName")}
                  value={values.countryName}
                  onChange={(v) => handleFieldChange("countryName", v)}
                  rightIcon={<IconTranslate />}
                  required
                />
                <PillInput
                  id="dialling-code"
                  placeholder={t("countries.add.fields.diallingCode")}
                  value={values.diallingCode}
                  onChange={(v) => handleFieldChange("diallingCode", v)}
                  type="tel"
                  required
                />
              </div>
            </section>

            {/* AVAILABILITY */}
            <section
              aria-label={t("countries.add.sections.availability")}
              className="mb-5 sm:mb-6"
            >
              <SectionHeader label={t("countries.add.sections.availability")} />
              <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <PillSelect
                  id="continent"
                  placeholder={t("countries.add.fields.continent")}
                  value={values.continent}
                  options={continentOptions}
                  onChange={(v) => handleFieldChange("continent", v)}
                  required
                />
                <PillSelect
                  id="currency"
                  placeholder={t("countries.add.fields.currency")}
                  value={values.currency}
                  options={currencyOptions}
                  onChange={(v) => handleFieldChange("currency", v)}
                  required
                />
                <PillSelect
                  id="status"
                  placeholder={t("countries.add.fields.status")}
                  value={values.status}
                  options={statusOptions}
                  onChange={(v) => handleFieldChange("status", v)}
                  prefix={
                    values.status === "active" ? (
                      <span
                        className="inline-block h-2 w-2 shrink-0 rounded-full bg-emerald-500"
                        aria-hidden="true"
                      />
                    ) : undefined
                  }
                />
                <PillSelect
                  id="default-country"
                  placeholder={t("countries.add.fields.defaultCountry")}
                  value={values.defaultCountry}
                  options={defaultCountryOptions}
                  onChange={(v) => handleFieldChange("defaultCountry", v)}
                />
              </div>
            </section>

            {/* FLAG AND NOTE */}
            <section
              aria-label={t("countries.add.sections.flagAndNote")}
              className="mb-5 sm:mb-6"
            >
              <SectionHeader label={t("countries.add.sections.flagAndNote")} />

              <FlagUploadArea
                flagFile={values.flagFile}
                uploadText={t("countries.add.fields.uploadFlag")}
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
                  {t("countries.add.fields.pickFromGallery")}
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
                  {t("countries.add.fields.internalNote")}
                </label>
                <textarea
                  id="internal-note"
                  rows={4}
                  value={values.internalNote}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    handleFieldChange("internalNote", e.target.value)
                  }
                  placeholder={t("countries.add.fields.internalNote")}
                  className="w-full resize-none rounded-2xl border border-transparent bg-gray-100 p-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-blue-400 sm:rounded-3xl sm:p-[22px] sm:text-[14.5px]"
                />
              </div>
            </section>

            {/* FOOTER */}
            <FormFooter
              filledCount={filledRequiredCount}
              totalCount={totalRequiredCount}
              filledText={t("countries.add.footer.fieldsFilled", {
                filled: filledRequiredCount,
                total: totalRequiredCount,
              })}
              duplicateText={t("countries.add.footer.duplicate")}
              printText={t("countries.add.footer.print")}
              clearText={t("countries.add.footer.clear")}
              saveText={t("countries.add.footer.save")}
              onDuplicate={handleDuplicate}
              onPrint={handlePrint}
              onClear={handleClear}
              onSave={handleSave}
            />
          </form>
        </article>
      </div>
    </div>
  );
}
