'use client'

import { Server } from '@prisma/client'
import { LogOut } from 'lucide-react'
import { useContext } from 'react'

import { GlobalModalsContext } from '@/shared/lib/context/global-modals-context'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

interface LeaveServerButtonProps {
  server: Server
}

export const LeaveServerButton = ({ server }: LeaveServerButtonProps) => {
  const { onOpen } = useContext(GlobalModalsContext)

  return (
    <DropdownMenuItem
      onClick={() => onOpen('leaveServer', { server })}
      className="text-rose-500 flex items-center px-3 py-2 text-sm cursor-pointer"
    >
      Leave Server
      <LogOut className="h-4 w-4 ml-auto" />
    </DropdownMenuItem>
  )
}
