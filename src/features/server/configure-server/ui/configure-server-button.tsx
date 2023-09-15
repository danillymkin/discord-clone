'use client'

import { Server } from '@prisma/client'
import { Settings } from 'lucide-react'
import { useContext } from 'react'

import { GlobalModalsContext } from '@/shared/lib/context/global-modals-context'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

interface ConfigureServerButtonProps {
  server: Server
}

export const ConfigureServerButton = ({
  server,
}: ConfigureServerButtonProps) => {
  const { onOpen } = useContext(GlobalModalsContext)

  return (
    <DropdownMenuItem
      onClick={() => onOpen('editServer', { server })}
      className="flex items-center px-3 py-2 text-sm cursor-pointer"
    >
      Server Settings
      <Settings className="h-4 w-4 ml-auto" />
    </DropdownMenuItem>
  )
}
