'use client'

import { ChanelType, Server } from '@prisma/client'
import { Plus } from 'lucide-react'
import { useContext } from 'react'

import { GlobalModalsContext } from '@/shared/lib/context/global-modals-context'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/ui/tooltip'

interface CreateChannelButtonProps {
  server: Server
  channelType?: ChanelType
}

export const CreateChannelButton = ({
  server,
  channelType,
}: CreateChannelButtonProps) => {
  const { onOpen } = useContext(GlobalModalsContext)

  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>
          <button
            onClick={() => onOpen('createChannel', { server, channelType })}
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
          >
            <Plus className="h-4 w-4" />
          </button>
        </TooltipTrigger>

        <TooltipContent side={'top'} align={'center'}>
          <p className="font-semibold text-sm capitalize">Create Channel</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
