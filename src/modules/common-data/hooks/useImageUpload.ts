import { useEffect, useRef, useState } from 'react'
import type { UseImageUploadOptions, UseImageUploadReturn } from '../types/common-data.types'

export function useImageUpload({
  imageFile,
  selectedImage,
  imageGallery = [],
}: UseImageUploadOptions): UseImageUploadReturn {
  const fileRef = useRef<HTMLInputElement>(null)
  const [objectUrl, setObjectUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!imageFile) {
      setObjectUrl(null)
      return
    }

    const url = URL.createObjectURL(imageFile)
    setObjectUrl(url)

    return () => {
      URL.revokeObjectURL(url)
    }
  }, [imageFile])

  const selectedGalleryItem =
    imageGallery.find((item) => (item.url ?? item.code) === selectedImage) ?? null

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
