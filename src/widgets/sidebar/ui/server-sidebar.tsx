import { ChanelType, MemberRole } from '@prisma/client'
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from 'lucide-react'
import { redirect } from 'next/navigation'

import {
  CreateChannelButton,
  CreateChannelMenuItem,
} from '@/features/channel/create-channel'
import { DeleteChannelButton } from '@/features/channel/delete-channel'
import { EditChannelButton } from '@/features/channel/edit-channel'
import { ConfigureServerMenuItem } from '@/features/server/configure-server'
import { DeleteServerMenuItem } from '@/features/server/delete-server'
import { InvitePeopleMenuItem } from '@/features/server/invite-people'
import { LeaveServerMenuItem } from '@/features/server/leave-server'
import { ManageMembersMenuItem } from '@/features/server/manage-members'
import { ManageMembersButton } from '@/features/server/manage-members/ui/manage-members-button'
import { ServerSearch } from '@/features/server/server-search'

import { ChannelRow } from '@/entities/channel'
import { ServerHeader, ServerSection } from '@/entities/server'
import { UserMember, currentProfile } from '@/entities/user'

import { db } from '@/shared/lib/database'
import { DropdownMenuSeparator } from '@/shared/ui/dropdown-menu'
import { ScrollArea } from '@/shared/ui/scroll-area'
import { Separator } from '@/shared/ui/separator'

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
          isModerator && (
            <InvitePeopleMenuItem server={server} key={'invite-people'} />
          ),
          isAdmin && (
            <ConfigureServerMenuItem server={server} key={'configure-server'} />
          ),
          isAdmin && (
            <ManageMembersMenuItem server={server} key={'manage-members'} />
          ),
          isModerator && (
            <CreateChannelMenuItem server={server} key={'create-channel'} />
          ),
          isModerator && <DropdownMenuSeparator key={'separator'} />,
          isAdmin && (
            <DeleteServerMenuItem server={server} key={'delete-server'} />
          ),
          !isAdmin && (
            <LeaveServerMenuItem server={server} key={'leave-server'} />
          ),
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

        <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />

        {!!textChannels?.length && (
          <div className="mb-2">
            <ServerSection
              label="Text Channels"
              actions={
                isModerator && (
                  <CreateChannelButton
                    server={server}
                    channelType={ChanelType.TEXT}
                  />
                )
              }
            />

            <div className="space-y-0.5">
              {textChannels.map((channel) => (
                <ChannelRow
                  key={channel.id}
                  channel={channel}
                  server={server}
                  actions={[
                    isModerator && (
                      <EditChannelButton server={server} channel={channel} />
                    ),
                    isModerator && (
                      <DeleteChannelButton server={server} channel={channel} />
                    ),
                  ]}
                />
              ))}
            </div>
          </div>
        )}

        {!!audioChannels?.length && (
          <div className="mb-2">
            <ServerSection
              label="Audio Channels"
              actions={
                isModerator && (
                  <CreateChannelButton
                    server={server}
                    channelType={ChanelType.AUDIO}
                  />
                )
              }
            />

            <div className="space-y-0.5">
              {audioChannels.map((channel) => (
                <ChannelRow
                  key={channel.id}
                  channel={channel}
                  server={server}
                  actions={[
                    isModerator && (
                      <EditChannelButton server={server} channel={channel} />
                    ),
                    isModerator && (
                      <DeleteChannelButton server={server} channel={channel} />
                    ),
                  ]}
                />
              ))}
            </div>
          </div>
        )}

        {!!videoChannels?.length && (
          <div className="mb-2">
            <ServerSection
              label="Video Channels"
              actions={
                isModerator && (
                  <CreateChannelButton
                    server={server}
                    channelType={ChanelType.VIDEO}
                  />
                )
              }
            />

            <div className="space-y-0.5">
              {videoChannels.map((channel) => (
                <ChannelRow
                  key={channel.id}
                  channel={channel}
                  server={server}
                  actions={[
                    isModerator && (
                      <EditChannelButton server={server} channel={channel} />
                    ),
                    isModerator && (
                      <DeleteChannelButton server={server} channel={channel} />
                    ),
                  ]}
                />
              ))}
            </div>
          </div>
        )}

        {!!members?.length && (
          <div className="mb-2">
            <ServerSection
              label="Members"
              actions={isModerator && <ManageMembersButton server={server} />}
            />

            <div className="space-y-0.5">
              {members.map((member) => (
                <UserMember key={member.id} member={member} server={server} />
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
