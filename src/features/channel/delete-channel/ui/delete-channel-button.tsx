'use client'

import { Chanel, Server } from '@prisma/client'
import { Trash } from 'lucide-react'
import { useContext } from 'react'

import { GlobalModalsContext } from '@/shared/lib/context/global-modals-context'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/ui/tooltip'

interface DeleteChannelButtonProps {
  channel: Chanel
  server: Server
}

export const DeleteChannelButton = ({
  channel,
  server,
}: DeleteChannelButtonProps) => {
  const { onOpen } = useContext(GlobalModalsContext)

  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>
          <button
            onClick={(event) => {
              event.preventDefault()
              onOpen('deleteChannel', { channel, server })
            }}
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
          >
            <Trash className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition" />
          </button>
        </TooltipTrigger>

        <TooltipContent side={'top'} align={'center'}>
          <p className="font-semibold text-sm capitalize">Delete</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
