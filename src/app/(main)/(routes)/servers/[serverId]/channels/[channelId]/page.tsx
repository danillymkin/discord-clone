import { redirectToSignIn } from '@clerk/nextjs'
import { ChanelType } from '@prisma/client'
import { redirect } from 'next/navigation'

import { ChatMasseges } from '@/widgets/chat-messages'
import { MobileMenu } from '@/widgets/sidebar'

import { AttachFileButton } from '@/features/chat/attach-file'
import { ChatInput } from '@/features/chat/send-message'

import { MediaRoom } from '@/entities/channel/ui/media-room'
import { ChatHeader } from '@/entities/chat'
import { currentProfile } from '@/entities/user'

import { db } from '@/shared/lib/database'

interface ChannelPageProps {
  params: {
    serverId: string
    channelId: string
  }
}

const ChannelPage = async ({ params }: ChannelPageProps) => {
  const profile = await currentProfile()

  if (!profile) {
    return redirectToSignIn()
  }

  const channel = await db.chanel.findUnique({
    where: {
      id: params.channelId,
    },
  })

  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
  })

  if (!channel || !member) {
    return redirect('/')
  }

  const socketUrl = '/api/socket/messages'
  const query = {
    channelId: channel.id,
    serverId: channel.serverId,
  }

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        mobileMenu={<MobileMenu serverId={params.serverId} />}
        type="channel"
        name={channel.name}
      />

      {channel.type === ChanelType.TEXT && (
        <>
          <ChatMasseges
            name={channel.name}
            chatId={channel.id}
            member={member}
            type="channel"
            apiUrl="/api/messages"
            socketUrl={socketUrl}
            socketQuery={query}
            paramKey="channelId"
            paramValue={channel.id}
          />

          <ChatInput
            name={channel.name}
            type="channel"
            apiUrl={socketUrl}
            query={query}
            leftSlot={<AttachFileButton apiUrl={socketUrl} query={query} />}
          />
        </>
      )}

      {channel.type === ChanelType.AUDIO && (
        <MediaRoom chatId={channel.id} video={false} audio={true} />
      )}

      {channel.type === ChanelType.VIDEO && (
        <MediaRoom chatId={channel.id} video={true} audio={true} />
      )}
    </div>
  )
}

export default ChannelPage
