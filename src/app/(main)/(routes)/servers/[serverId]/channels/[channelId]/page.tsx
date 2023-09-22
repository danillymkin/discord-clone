import { redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import { MobileMenu } from '@/widgets/sidebar'

import { AttachFileButton } from '@/features/chat/attach-file'
import { ChatInput } from '@/features/chat/send-message'

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

  const apiUrl = '/api/socket/messages'
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

      <div className="flex-1">Future Messages</div>

      <ChatInput
        name={channel.name}
        type="channel"
        apiUrl={apiUrl}
        query={query}
        leftSlot={<AttachFileButton apiUrl={apiUrl} query={query} />}
      />
    </div>
  )
}

export default ChannelPage
