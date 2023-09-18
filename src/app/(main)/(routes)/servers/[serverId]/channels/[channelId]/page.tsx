import { redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import { MobileMenu } from '@/widgets/sidebar'

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

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        mobileMenu={<MobileMenu serverId={params.serverId} />}
        type="channel"
        name={channel.name}
      />
    </div>
  )
}

export default ChannelPage
