import type { DragEvent, ChangeEvent } from 'react'
import { useTranslation } from '@/shared/hooks'
import type { ProductPageFormProps } from '../types/product.types'
import { Calendar } from 'lucide-react'
import { SectionHeader } from './SectionHeader'
import { PillInput } from './PillInput'
import { PillSelect } from './PillSelect'
import { ProductImageUploadArea } from './ProductImageUploadArea'
import { ProductImageChip } from './ProductImageChip'
import { FormFooter } from './FormFooter'
import { LanguageDropdown } from './LanguageDropdown'

export function ProductForm({ mode, form }: ProductPageFormProps) {
  const { t } = useTranslation()
  const prefix = mode === 'add' ? 'product.add' : 'product.edit'

  const {
    values,
    isLoading,
    filledRequiredCount,
    totalRequiredCount,
    imageGallery,
    categoryOptions,
    statusOptions,
    featuredOptions,
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
          Loading product details...
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
              id="sku-code"
              placeholder={t(`${prefix}.fields.sku`)}
              value={values.sku}
              onChange={(v) => handleFieldChange('sku', v.toUpperCase())}
              rightIcon={<Calendar className="size-4 text-slate-400" />}
              required
            />
            <PillInput
              id="product-name"
              placeholder={t(`${prefix}.fields.productName`)}
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
              required
            />
            <PillInput
              id="stock-count"
              placeholder={t(`${prefix}.fields.stock`)}
              value={values.stock}
              type="number"
              onChange={(v) => handleFieldChange('stock', v)}
              required
            />
          </div>
        </section>

        {/* PRICING & AVAILABILITY */}
        <section
          aria-label={t(`${prefix}.sections.availability`)}
          className="mb-5 sm:mb-6"
        >
          <SectionHeader label={t(`${prefix}.sections.availability`)} />
          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <PillSelect
              id="category"
              placeholder={t(`${prefix}.fields.category`)}
              value={values.category}
              options={categoryOptions}
              onChange={(v) => handleFieldChange('category', v)}
              required
            />
            <PillInput
              id="price"
              placeholder={t(`${prefix}.fields.price`)}
              value={values.price}
              type="number"
              onChange={(v) => handleFieldChange('price', v)}
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
              id="featured-product"
              placeholder={t(`${prefix}.fields.featured`)}
              value={values.featured}
              options={featuredOptions}
              onChange={(v) => handleFieldChange('featured', v)}
            />
          </div>
        </section>

        {/* IMAGE AND DESCRIPTION */}
        <section
          aria-label={t(`${prefix}.sections.imageAndDesc`)}
          className="mb-5 sm:mb-6"
        >
          <SectionHeader label={t(`${prefix}.sections.imageAndDesc`)} />

          <ProductImageUploadArea
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
              aria-label="Product image gallery"
              className="flex flex-wrap gap-1.5 sm:gap-[7px]"
            >
              {imageGallery.map((item) => (
                <ProductImageChip
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
