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

export const CreateServerButton = () => {
  const { onOpen } = useContext(GlobalModalsContext)

  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>
          <button
            className="group flex items-center"
            onClick={() => onOpen('createServer')}
          >
            <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
              <Plus
                className="group-hover:text-white transition text-emerald-500"
                size={25}
              />
            </div>
          </button>
        </TooltipTrigger>

        <TooltipContent side={'right'} align={'center'}>
          <p className="font-semibold text-sm capitalize">Add a server</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
