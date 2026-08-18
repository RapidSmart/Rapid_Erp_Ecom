import { useEffect, useState, useRef } from 'react'
import type { ChangeEvent, DragEvent } from 'react'
import { cn } from '@/shared/utils'
import type { FlagGalleryItem } from '../types/country.types'
import { IconUpload } from './Icons'

interface FlagUploadAreaProps {
  flagFile: File | null
  selectedFlag: string | null
  flagGallery: readonly FlagGalleryItem[]
  uploadText: string
  onUpload: (file: File) => void
  onClearFlag: () => void
  onDragOver: (e: DragEvent<HTMLDivElement | HTMLButtonElement>) => void
  onDrop: (e: DragEvent<HTMLDivElement | HTMLButtonElement>) => void
}

export function FlagUploadArea({
  flagFile,
  selectedFlag,
  flagGallery,
  uploadText,
  onUpload,
  onClearFlag,
  onDragOver,
  onDrop,
}: FlagUploadAreaProps) {
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
    ? flagGallery.find((item) => item.code === selectedFlag)
    : null

  const hasUploadedFile = Boolean(flagFile && objectUrl)
  const hasSelectedGalleryFlag = Boolean(selectedFlag && selectedGalleryItem)

  return (
    <>
      <div
        role="region"
        aria-label="Flag upload area"
        onDragOver={onDragOver}
        onDrop={onDrop}
        className={cn(
          'relative flex h-[108px] w-full items-center justify-center rounded-[26px] border border-dashed border-[#cdd6e3] bg-[#f4f6f9]',
          'transition-colors',
          !hasUploadedFile && !hasSelectedGalleryFlag && 'cursor-pointer hover:bg-slate-100/80',
        )}
        onClick={() => {
          if (!hasUploadedFile && !hasSelectedGalleryFlag) {
            fileRef.current?.click()
          }
        }}
      >
        {hasUploadedFile ? (
          /* Figma 67:1907 — Uploaded flag image centered preview */
          <div className="relative flex items-center justify-center" data-node-id="67:1907">
            <div
              data-node-id="67:1910"
              className="h-[66px] w-[96.46px] overflow-hidden rounded-[12.7px] border-[2.54px] border-solid border-[#dde4ef] bg-white shadow-xs"
            >
              <img
                src={objectUrl!}
                alt={flagFile?.name || 'Uploaded flag preview'}
                className="h-full w-full object-cover"
              />
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onClearFlag()
              }}
              aria-label="Remove uploaded flag"
              className="absolute -right-3.5 -top-3.5 flex size-[34px] items-center justify-center rounded-full bg-white text-slate-500 shadow-md transition-transform hover:bg-slate-50 hover:text-slate-700 active:scale-95"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="size-[15px]"
              >
                <path
                  d="M11.25 3.75L3.75 11.25M3.75 3.75L11.25 11.25"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        ) : hasSelectedGalleryFlag ? (
          /* Figma 64:2952 — Selected flag thumbnail + filename + remove button */
          <div className="flex items-center gap-4" data-node-id="64:2952">
            <div className="flex items-center gap-3.5" data-node-id="64:3635">
              <div
                data-node-id="64:3628"
                className="h-[26px] w-[38px] shrink-0 rounded-[5px] border border-solid border-[#dde4ef]"
                style={{
                  backgroundImage: selectedGalleryItem?.flagGradient,
                  backgroundSize: 'cover',
                }}
              />
              <span
                data-node-id="64:3630"
                className="text-[14px] font-medium leading-none text-[#1e2c41]"
              >
                {`flag-${selectedFlag?.toLowerCase()}.svg`}
              </span>
            </div>
            <button
              type="button"
              data-node-id="64:3631"
              onClick={(e) => {
                e.stopPropagation()
                onClearFlag()
              }}
              aria-label="Remove selected flag"
              className="flex size-[34px] shrink-0 items-center justify-center rounded-full bg-white text-slate-500 shadow-xs transition-transform hover:bg-slate-50 hover:text-slate-700 active:scale-95"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="size-[15px]"
              >
                <path
                  d="M11.25 3.75L3.75 11.25M3.75 3.75L11.25 11.25"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        ) : (
          /* Default state — Upload Icon + Text */
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            aria-label="Upload flag — drag and drop or click to browse"
            className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-[26px] outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            <IconUpload />
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
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0]
          if (file) onUpload(file)
        }}
      />
    </>
  )
}
