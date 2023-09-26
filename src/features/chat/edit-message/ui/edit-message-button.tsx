'use client'

import { Edit } from 'lucide-react'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/ui/tooltip'

import { useEditMessage } from '../model/use-edit-message'

interface EditMessageButtonProps {
  messageId: string
}

export const EditMessageButton = ({ messageId }: EditMessageButtonProps) => {
  const { setIsEditing } = useEditMessage()

  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>
          <Edit
            onClick={() => setIsEditing(messageId)}
            className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
          />
        </TooltipTrigger>

        <TooltipContent side="top" align="center">
          <p className="font-semibold text-sm capitalize">Edit</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
