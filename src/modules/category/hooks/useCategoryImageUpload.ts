import { useEffect, useState, useRef } from 'react'
import type {
  UseCategoryImageUploadOptions,
  UseCategoryImageUploadReturn,
} from '../types/category.types'

export function useCategoryImageUpload({
  imageFile,
  selectedImage,
  imageGallery,
}: UseCategoryImageUploadOptions): UseCategoryImageUploadReturn {
  const fileRef = useRef<HTMLInputElement>(null)
  const [objectUrl, setObjectUrl] = useState<string | null>(null)

  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile)
      setObjectUrl(url)
      return () => {
        URL.revokeObjectURL(url)
      }
    }
    setObjectUrl(null)
  }, [imageFile])

  const selectedGalleryItem = selectedImage
    ? imageGallery.find((item) => item.url === selectedImage) ?? null
    : null

  const hasUploadedFile = Boolean(imageFile && objectUrl)
  const hasSelectedGalleryImage = Boolean(selectedImage && selectedGalleryItem)

  return {
    fileRef,
    objectUrl,
    selectedGalleryItem,
    hasUploadedFile,
    hasSelectedGalleryImage,
  }
}
