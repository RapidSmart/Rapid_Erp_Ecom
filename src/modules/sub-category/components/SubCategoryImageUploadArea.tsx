import { cn } from '@/shared/utils/utils'
import type { SubCategoryImageUploadAreaProps } from '../types/sub-category.types'
import { useSubCategoryImageUpload } from '../hooks/useSubCategoryImageUpload'
import { Upload, X } from 'lucide-react'

export function SubCategoryImageUploadArea({
  imageFile,
  selectedImage,
  imageGallery,
  uploadText,
  onUpload,
  onClearImage,
  onDragOver,
  onDrop,
}: SubCategoryImageUploadAreaProps) {
  const {
    fileRef,
    objectUrl,
    selectedGalleryItem,
    hasUploadedFile,
    hasSelectedGalleryImage,
  } = useSubCategoryImageUpload({
    imageFile,
    selectedImage,
    imageGallery,
  })

  return (
    <>
      <div
        role="region"
        aria-label="Sub category image upload area"
        onDragOver={onDragOver}
        onDrop={onDrop}
        className={cn(
          'relative flex h-[108px] w-full items-center justify-center rounded-[26px] border border-dashed border-surface-border bg-surface-muted',
          'transition-colors',
          !hasUploadedFile && !hasSelectedGalleryImage && 'cursor-pointer hover:bg-slate-100/80',
        )}
        onClick={() => {
          if (!hasUploadedFile && !hasSelectedGalleryImage) {
            fileRef.current?.click()
          }
        }}
      >
        {hasUploadedFile ? (
          <div className="relative flex items-center justify-center">
            <div className="h-[66px] w-[96.46px] overflow-hidden rounded-[12.7px] border-[2.54px] border-solid border-surface-border bg-white shadow-xs">
              <img
                src={objectUrl!}
                alt={imageFile?.name || 'Uploaded preview'}
                className="h-full w-full object-cover"
              />
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onClearImage()
              }}
              aria-label="Remove uploaded image"
              className="absolute -right-3.5 -top-3.5 flex size-[34px] items-center justify-center rounded-full bg-white text-slate-500 shadow-md transition-transform hover:bg-slate-50 hover:text-slate-700 active:scale-95"
            >
              <X className="size-4" />
            </button>
          </div>
        ) : hasSelectedGalleryImage ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3.5">
              <img
                src={selectedGalleryItem?.url}
                alt={selectedGalleryItem?.label}
                className="h-[26px] w-[38px] shrink-0 rounded-[5px] border border-solid border-surface-border object-cover"
              />
              <span className="text-[14px] font-medium leading-none text-ink truncate max-w-[200px]">
                {selectedGalleryItem?.label}
              </span>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onClearImage()
              }}
              aria-label="Remove selected image"
              className="flex size-[34px] shrink-0 items-center justify-center rounded-full bg-white text-slate-500 shadow-xs transition-transform hover:bg-slate-50 hover:text-slate-700 active:scale-95"
            >
              <X className="size-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            aria-label="Upload sub category image — drag and drop or click to browse"
            className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-[26px] outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            <Upload className="size-5 text-slate-500" />
            <span className="text-[14.5px] font-medium text-slate-600">
              {uploadText}
            </span>
          </button>
        )}
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        aria-label="Choose sub category image file to upload"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) {
            onUpload(file)
          }
        }}
      />
    </>
  )
}
