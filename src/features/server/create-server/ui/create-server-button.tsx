import { Plus } from 'lucide-react'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/ui/tooltip'

interface CreateServerButtonProps {
  onClick: () => void
}

export const CreateServerButton = ({ onClick }: CreateServerButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>
          <button className="group flex items-center" onClick={onClick}>
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
