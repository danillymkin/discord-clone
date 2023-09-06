'use client'

import '@uploadthing/react/styles.css'
import { X } from 'lucide-react'
import Image from 'next/image'

import { UploadDropzone } from '@/shared/lib/uploadthing'

interface UploadFileProps {
  endpoint: 'messageFile' | 'serverImage'
  value: string
  onChange: (url?: string) => void
}

export const UploadFile = ({ endpoint, value, onChange }: UploadFileProps) => {
  const fileType = value?.split('.').pop()

  if (value && fileType !== 'pdf') {
    return (
      <div className="relative h-20 w-20 border border-zinc-300 rounded-full">
        <Image fill src={value} alt="Upload" className="rounded-full" />
        <button
          onClick={() => onChange('')}
          type="button"
          className="bg-rose-500 text-white rounded-full p-1 absolute top-0 right-0 shadow-sm"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    )
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url)
      }}
      onUploadError={(error: Error) => {
        console.log(error)
      }}
    />
  )
}
