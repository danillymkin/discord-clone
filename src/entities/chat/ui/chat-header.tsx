import { Hash } from 'lucide-react'
import React from 'react'

import { SocketIndicator } from './socket-indicator'

interface ChatHeaderProps {
  mobileMenu: React.ReactNode
  name: string
  type: 'channel' | 'conversation'
  avatar?: React.ReactNode
  action?: React.ReactNode
}

export const ChatHeader = ({
  name,
  type,
  avatar,
  mobileMenu,
  action,
}: ChatHeaderProps) => {
  return (
    <div className="font-semibold text-md px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
      {mobileMenu}

      {type === 'channel' && (
        <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
      )}

      {type === 'conversation' && avatar}

      <p className="font-semibold text-md text-black dark:text-white">{name}</p>

      <div className="ml-auto flex items-center">
        {action}

        <SocketIndicator />
      </div>
    </div>
  )
}
