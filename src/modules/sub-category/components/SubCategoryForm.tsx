import type { DragEvent, ChangeEvent } from 'react'
import { useTranslation } from '@/shared/hooks'
import type { SubCategoryPageFormProps } from '../types/sub-category.types'
import { FolderTree } from 'lucide-react'
import { SectionHeader } from './SectionHeader'
import { PillInput } from './PillInput'
import { SubCategoryImageUploadArea } from './SubCategoryImageUploadArea'
import { SubCategoryImageChip } from './SubCategoryImageChip'
import { FormFooter } from './FormFooter'

export function SubCategoryForm({ mode, form }: SubCategoryPageFormProps) {
  const { t } = useTranslation()
  const prefix = mode === 'add' ? 'subCategory.add' : 'subCategory.edit'

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
          {t('subCategory.form.loading')}
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
              id="subcategory-code"
              placeholder={t(`${prefix}.fields.code`)}
              value={values.code}
              disabled={mode === 'edit'}
              maxLength={10}
              onChange={(v) => handleFieldChange('code', v.toUpperCase())}
              rightIcon={<FolderTree className="size-4 text-slate-400" />}
              required
            />
            <PillInput
              id="subcategory-name"
              placeholder={t(`${prefix}.fields.subCategoryName`)}
              value={values.name}
              maxLength={40}
              onChange={(v) => handleFieldChange('name', v)}
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

          <SubCategoryImageUploadArea
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
              aria-label={t(`${prefix}.fields.pickFromGallery`)}
              className="flex flex-wrap gap-1.5 sm:gap-[7px]"
            >
              {imageGallery.map((item) => (
                <SubCategoryImageChip
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
