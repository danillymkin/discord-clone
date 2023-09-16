'use client'

import { Server } from '@prisma/client'
import { Settings } from 'lucide-react'
import { useContext } from 'react'

import { GlobalModalsContext } from '@/shared/lib/context/global-modals-context'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/ui/tooltip'

interface ManageMembersButtonProps {
  server: Server
}

export const ManageMembersButton = ({ server }: ManageMembersButtonProps) => {
  const { onOpen } = useContext(GlobalModalsContext)

  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>
          <button
            onClick={() => onOpen('manageMembers', { server })}
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
          >
            <Settings className="h-4 w-4" />
          </button>
        </TooltipTrigger>

        <TooltipContent side={'top'} align={'center'}>
          <p className="font-semibold text-sm capitalize">Manage Members</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
