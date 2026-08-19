import type { DragEvent, ChangeEvent } from 'react'
import { useTranslation } from '@/shared/hooks'
import type { CategoryPageFormProps } from '../types/category.types'
import { Calendar } from 'lucide-react'
import { SectionHeader } from './SectionHeader'
import { PillInput } from './PillInput'
import { CategoryImageUploadArea } from './CategoryImageUploadArea'
import { CategoryImageChip } from './CategoryImageChip'
import { FormFooter } from './FormFooter'
import { LanguageDropdown } from './LanguageDropdown'

export function CategoryForm({ mode, form }: CategoryPageFormProps) {
  const { t } = useTranslation()
  const prefix = mode === 'add' ? 'category.add' : 'category.edit'

  const {
    values,
    isLoading,
    filledRequiredCount,
    totalRequiredCount,
    imageGallery,
    handleFieldChange,
    handleImageUpload,
    handleImageSelect,
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
          Loading category details...
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
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
            <PillInput
              id="category-code"
              placeholder={t(`${prefix}.fields.code`)}
              value={values.code}
              disabled={mode === 'edit'}
              maxLength={10}
              onChange={(v) => handleFieldChange('code', v.toUpperCase())}
              rightIcon={<Calendar className="size-4 text-slate-400" />}
              required
            />
            <PillInput
              id="category-name"
              placeholder={t(`${prefix}.fields.categoryName`)}
              value={values.name}
              maxLength={40}
              onChange={(v) => handleFieldChange('name', v)}
              rightIcon={
                <LanguageDropdown
                  currentLanguage="en"
                  onSelectLanguage={(lang) => {
                    console.log('Selected translation language:', lang)
                  }}
                />
              }
              required
            />
          </div>
        </section>

        {/* IMAGE AND DESCRIPTION */}
        <section
          aria-label={t(`${prefix}.sections.imageAndDesc`)}
          className="mb-5 sm:mb-6"
        >
          <SectionHeader label={t(`${prefix}.sections.imageAndDesc`)} />

          <CategoryImageUploadArea
            imageFile={values.imageFile}
            selectedImage={values.selectedImage}
            imageGallery={imageGallery}
            uploadText={t(`${prefix}.fields.uploadImage`)}
            onUpload={handleImageUpload}
            onClearImage={() => {
              handleFieldChange('imageFile', null)
              handleFieldChange('selectedImage', null)
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
              aria-label="Category image gallery"
              className="flex flex-wrap gap-1.5 sm:gap-[7px]"
            >
              {imageGallery.map((item) => (
                <CategoryImageChip
                  key={item.url}
                  item={item}
                  selected={values.selectedImage === item.url}
                  onClick={() => handleImageSelect(item.url)}
                />
              ))}
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="description" className="sr-only">
              {t(`${prefix}.fields.description`)}
            </label>
            <textarea
              id="description"
              rows={4}
              maxLength={200}
              value={values.description}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                handleFieldChange('description', e.target.value)
              }
              placeholder={t(`${prefix}.fields.description`)}
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
