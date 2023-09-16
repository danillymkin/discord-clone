'use client'

import { Server } from '@prisma/client'
import { Users } from 'lucide-react'
import { useContext } from 'react'

import { GlobalModalsContext } from '@/shared/lib/context/global-modals-context'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

interface ManageMembersMenuItemProps {
  server: Server
}

export const ManageMembersMenuItem = ({
  server,
}: ManageMembersMenuItemProps) => {
  const { onOpen } = useContext(GlobalModalsContext)

  return (
    <DropdownMenuItem
      onClick={() => onOpen('manageMembers', { server })}
      className="flex items-center px-3 py-2 text-sm cursor-pointer"
    >
      Manage Members
      <Users className="h-4 w-4 ml-auto" />
    </DropdownMenuItem>
  )
}
