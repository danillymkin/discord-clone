import { ChanelType, MemberRole } from '@prisma/client'
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from 'lucide-react'
import { redirect } from 'next/navigation'

import { CreateChannelMenuItem } from '@/features/channel/create-channel'
import { ConfigureServerButton } from '@/features/server/configure-server'
import { DeleteServerButton } from '@/features/server/delete-server'
import { InvitePeopleButton } from '@/features/server/invite-people'
import { LeaveServerButton } from '@/features/server/leave-server'
import { ManageMembersMenuItem } from '@/features/server/manage-members'
import { ServerSearch } from '@/features/server/server-search'

import { ServerHeader } from '@/entities/server'
import { currentProfile } from '@/entities/user'

import { db } from '@/shared/lib/database'
import { DropdownMenuSeparator } from '@/shared/ui/dropdown-menu'
import { ScrollArea } from '@/shared/ui/scroll-area'

interface ServerSidebarProps {
  serverId: string
}

const channelIconMap = {
  [ChanelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
  [ChanelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
  [ChanelType.VIDEO]: <Video className="mr-2 h-4 w-4" />,
}

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="h-4 w-4 mr-2 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 mr-2 text-rose-500" />,
}

export const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
  const profile = await currentProfile()

  if (!profile) {
    return redirect('/')
  }

  const server = await db.server.findUnique({
    where: { id: serverId },
    include: {
      chanels: {
        orderBy: {
          createdAt: 'asc',
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: 'asc',
        },
      },
    },
  })

  if (!server) {
    return redirect('/')
  }

  const textChannels = server.chanels.filter(
    (channel) => channel.type === ChanelType.TEXT
  )
  const audioChannels = server.chanels.filter(
    (channel) => channel.type === ChanelType.AUDIO
  )
  const videoChannels = server.chanels.filter(
    (channel) => channel.type === ChanelType.VIDEO
  )

  const members = server.members.filter(
    (member) => member.profileId !== profile.id
  )

  const role = server.members.find((member) => member.profileId === profile.id)
    ?.role

  const isAdmin = role === MemberRole.ADMIN
  const isModerator = isAdmin || role === MemberRole.MODERATOR

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader
        serverName={server.name}
        actions={[
          isModerator && <InvitePeopleButton server={server} />,
          isAdmin && <ConfigureServerButton server={server} />,
          isAdmin && <ManageMembersMenuItem server={server} />,
          isModerator && <CreateChannelMenuItem server={server} />,
          isModerator && <DropdownMenuSeparator />,
          isAdmin && <DeleteServerButton server={server} />,
          !isAdmin && <LeaveServerButton server={server} />,
        ]}
      />

      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <ServerSearch
            data={[
              {
                label: 'Text Channels',
                type: 'channel',
                data: textChannels.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: channelIconMap[channel.type],
                })),
              },
              {
                label: 'Voice Channels',
                type: 'channel',
                data: audioChannels.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: channelIconMap[channel.type],
                })),
              },
              {
                label: 'Video Channels',
                type: 'channel',
                data: videoChannels.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: channelIconMap[channel.type],
                })),
              },
              {
                label: 'Members',
                type: 'member',
                data: members.map((member) => ({
                  id: member.id,
                  name: member.profile.name,
                  icon: roleIconMap[member.role],
                })),
              },
            ]}
          />
        </div>
      </ScrollArea>
    </div>
  )
}
