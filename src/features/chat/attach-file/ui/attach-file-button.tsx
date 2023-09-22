'use client'

import { Plus } from 'lucide-react'
import { useContext } from 'react'

import { GlobalModalsContext } from '@/shared/lib/context/global-modals-context'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/ui/tooltip'

interface AttachFileButtonProps {
  apiUrl: string
  query: Record<string, any>
}

export const AttachFileButton = ({ apiUrl, query }: AttachFileButtonProps) => {
  const { onOpen } = useContext(GlobalModalsContext)

  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>
          <button
            onClick={() => onOpen('messageFile', { apiUrl, query })}
            type="button"
            className="absolute top-7 left-8 h-6 w-6 bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center"
          >
            <Plus className="text-white dark:text-[#313338]" />
          </button>
        </TooltipTrigger>

        <TooltipContent side={'top'} align={'center'}>
          <p className="font-semibold text-sm capitalize">Attach file</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
