import { Chanel, ChanelType, Server } from '@prisma/client'
import { Hash, Lock, Mic, Video } from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/shared/lib/cn'

interface ChannelRowProps {
  channel: Chanel
  server: Server
  activeChannelId?: string
  actions?: React.ReactNode | React.ReactNode[]
}

const iconMap = {
  [ChanelType.TEXT]: Hash,
  [ChanelType.AUDIO]: Mic,
  [ChanelType.VIDEO]: Video,
}

export const ChannelRow = ({
  channel,
  server,
  activeChannelId,
  actions,
}: ChannelRowProps) => {
  const Icon = iconMap[channel.type]

  return (
    <Link
      href={`/servers/${server.id}/channels/${channel.id}`}
      className={cn(
        'group p-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1',
        activeChannelId === channel.id && 'bg-zinc-700/20 dark:bg-zinc-700'
      )}
    >
      <Icon className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />

      <p
        className={cn(
          'line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition',
          activeChannelId === channel.id &&
            'text-primary dark:text-zinc-200 dark:group-hover:text-white'
        )}
      >
        {channel.name}
      </p>

      {channel.name !== 'general' && (
        <div className="ml-auto flex items-center gap-x-2">{actions}</div>
      )}

      {channel.name === 'general' && (
        <Lock className="ml-auto w-4 h-4 text-zinc-500 dark:text-zinc-400" />
      )}
    </Link>
  )
}
