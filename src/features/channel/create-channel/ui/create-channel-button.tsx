'use client'

import { Server } from '@prisma/client'
import { PlusCircle } from 'lucide-react'
import { useContext } from 'react'

import { GlobalModalsContext } from '@/shared/lib/context/global-modals-context'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

interface CreateChannelButtonProps {
  server: Server
}

export const CreateChannelButton = ({ server }: CreateChannelButtonProps) => {
  const { onOpen } = useContext(GlobalModalsContext)

  return (
    <DropdownMenuItem
      onClick={() => onOpen('createChannel', { server })}
      className="flex items-center px-3 py-2 text-sm cursor-pointer"
    >
      Create Channel
      <PlusCircle className="h-4 w-4 ml-auto" />
    </DropdownMenuItem>
  )
}
