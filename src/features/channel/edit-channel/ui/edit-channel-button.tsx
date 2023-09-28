'use client'

import { Chanel, Server } from '@prisma/client'
import { Edit } from 'lucide-react'
import { useContext } from 'react'

import {
  GlobalModalsContext,
  ModalType,
} from '@/shared/lib/context/global-modals-context'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/ui/tooltip'

interface EditChannelButtonProps {
  server: Server
  channel: Chanel
}

export const EditChannelButton = ({
  server,
  channel,
}: EditChannelButtonProps) => {
  const { onOpen } = useContext(GlobalModalsContext)

  const onAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation()
    e.preventDefault()
    onOpen(action, { server, channel })
  }

  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>
          <button
            onClick={(event) => onAction(event, 'editChannel')}
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
          >
            <Edit className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition" />
          </button>
        </TooltipTrigger>

        <TooltipContent side={'top'} align={'center'}>
          <p className="font-semibold text-sm capitalize">Edit</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
