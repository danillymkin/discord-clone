'use client'

import { Server } from '@prisma/client'
import { Trash } from 'lucide-react'
import { useContext } from 'react'

import { GlobalModalsContext } from '@/shared/lib/context/global-modals-context'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

interface DeleteServerButtonProps {
  server: Server
}

export const DeleteServerButton = ({ server }: DeleteServerButtonProps) => {
  const { onOpen } = useContext(GlobalModalsContext)

  return (
    <DropdownMenuItem
      onClick={() => onOpen('deleteServer', { server })}
      className="text-rose-500 flex items-center px-3 py-2 text-sm cursor-pointer"
    >
      Delete Server
      <Trash className="h-4 w-4 ml-auto" />
    </DropdownMenuItem>
  )
}
