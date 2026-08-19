import { useEffect, useState, useRef } from 'react'
import type {
  UseFlagUploadAreaOptions,
  UseFlagUploadAreaReturn,
} from '../types/country.types'

export function useFlagUploadArea({
  flagFile,
  selectedFlag,
  flagGallery,
}: UseFlagUploadAreaOptions): UseFlagUploadAreaReturn {
  const fileRef = useRef<HTMLInputElement>(null)
  const [objectUrl, setObjectUrl] = useState<string | null>(null)

  useEffect(() => {
    if (flagFile) {
      const url = URL.createObjectURL(flagFile)
      setObjectUrl(url)
      return () => {
        URL.revokeObjectURL(url)
      }
    }
    setObjectUrl(null)
  }, [flagFile])

  const selectedGalleryItem = selectedFlag
    ? flagGallery.find((item) => item.code === selectedFlag) ?? null
    : null

  const hasUploadedFile = Boolean(flagFile && objectUrl)
  const hasSelectedGalleryFlag = Boolean(selectedFlag && selectedGalleryItem)

  return {
    fileRef,
    objectUrl,
    selectedGalleryItem,
    hasUploadedFile,
    hasSelectedGalleryFlag,
  }
}
