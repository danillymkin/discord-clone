import { ChanelType, MemberRole } from '@prisma/client'
import { redirect } from 'next/navigation'

import { CreateChannelButton } from '@/features/channel/create-channel'
import { ConfigureServerButton } from '@/features/server/configure-server'
import { DeleteServerButton } from '@/features/server/delete-server'
import { InvitePeopleButton } from '@/features/server/invite-people'
import { LeaveServerButton } from '@/features/server/leave-server'
import { ManageMembersButton } from '@/features/server/manage-members'

import { ServerHeader } from '@/entities/server'
import { currentProfile } from '@/entities/user'

import { db } from '@/shared/lib/database'
import { DropdownMenuSeparator } from '@/shared/ui/dropdown-menu'

interface ServerSidebarProps {
  serverId: string
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

  const textChanels = server.chanels.filter(
    (channel) => channel.type === ChanelType.TEXT
  )
  const audioChanels = server.chanels.filter(
    (channel) => channel.type === ChanelType.AUDIO
  )
  const videoChanels = server.chanels.filter(
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
          isAdmin && <ManageMembersButton server={server} />,
          isModerator && <CreateChannelButton server={server} />,
          isModerator && <DropdownMenuSeparator />,
          isAdmin && <DeleteServerButton server={server} />,
          !isAdmin && <LeaveServerButton server={server} />,
        ]}
      />
    </div>
  )
}
