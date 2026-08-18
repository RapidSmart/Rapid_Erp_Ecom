import { useRef } from 'react'
import type { ChangeEvent, DragEvent } from 'react'
import { cn } from '@/shared/utils'
import { IconUpload } from './Icons'

interface FlagUploadAreaProps {
  flagFile: File | null
  uploadText: string
  onUpload: (file: File) => void
  onDragOver: (e: DragEvent<HTMLButtonElement>) => void
  onDrop: (e: DragEvent<HTMLButtonElement>) => void
}

export function FlagUploadArea({
  flagFile,
  uploadText,
  onUpload,
  onDragOver,
  onDrop,
}: FlagUploadAreaProps) {
  const fileRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        onDragOver={onDragOver}
        onDrop={onDrop}
        aria-label="Upload flag — drag and drop or click to browse"
        className={cn(
          'flex h-[108px] w-full flex-col items-center justify-center gap-2 rounded-3xl border border-dashed border-slate-300 bg-gray-100',
          'transition-colors hover:bg-slate-50',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400',
        )}
      >
        {flagFile ? (
          <span className="text-sm font-medium text-slate-600">{flagFile.name}</span>
        ) : (
          <>
            <IconUpload />
            <span className="text-[14.5px] font-medium text-slate-600">
              {uploadText}
            </span>
          </>
        )}
      </button>
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
