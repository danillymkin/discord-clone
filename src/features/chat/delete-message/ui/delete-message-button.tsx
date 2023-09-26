'use client'

import { Trash } from 'lucide-react'
import { useContext } from 'react'

import { GlobalModalsContext } from '@/shared/lib/context/global-modals-context'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/ui/tooltip'

interface DeleteMessageButtonProps {
  apiUrl: string
  query: Record<string, string>
}

export const DeleteMessageButton = ({
  apiUrl,
  query,
}: DeleteMessageButtonProps) => {
  const { onOpen } = useContext(GlobalModalsContext)

  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>
          <Trash
            onClick={() =>
              onOpen('deleteMessage', {
                apiUrl,
                query,
              })
            }
            className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
          />
        </TooltipTrigger>

        <TooltipContent side="top" align="center">
          <p className="font-semibold text-sm capitalize">Delete</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
