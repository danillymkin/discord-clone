'use client'

import { Server } from '@prisma/client'
import { UserPlus } from 'lucide-react'
import { useContext } from 'react'

import { GlobalModalsContext } from '@/shared/lib/context/global-modals-context'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

interface InvitePeopleMenuItemProps {
  server: Server
}

export const InvitePeopleMenuItem = ({ server }: InvitePeopleMenuItemProps) => {
  const { onOpen } = useContext(GlobalModalsContext)

  return (
    <DropdownMenuItem
      onClick={() => onOpen('invite', { server })}
      className="flex items-center text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer"
    >
      Invite People
      <UserPlus className="h-4 w-4 ml-auto" />
    </DropdownMenuItem>
  )
}
