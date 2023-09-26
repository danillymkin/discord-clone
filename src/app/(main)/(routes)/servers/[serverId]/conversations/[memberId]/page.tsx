import { redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import { MobileMenu } from '@/widgets/sidebar'

import { ChatHeader } from '@/entities/chat'
import { findOrCreateConversation } from '@/entities/conversation'
import { UserAvatar, currentProfile } from '@/entities/user'

import { db } from '@/shared/lib/database'

interface ConversationPageProps {
  params: {
    serverId: string
    memberId: string
  }
}

const ConversationPage = async ({ params }: ConversationPageProps) => {
  const profile = await currentProfile()

  if (!profile) {
    return redirectToSignIn()
  }

  const currentMember = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
    include: {
      profile: true,
    },
  })

  if (!currentMember) {
    return redirect('/')
  }

  const conversation = await findOrCreateConversation(
    currentMember.id,
    params.memberId
  )

  if (!conversation) {
    return redirect(`/servers/${params.serverId}`)
  }

  const { firstMember, secondMember } = conversation

  const otherMember =
    firstMember.profileId === profile.id ? secondMember : firstMember

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        type="conversation"
        name={otherMember.profile.name}
        mobileMenu={<MobileMenu serverId={params.serverId} />}
        avatar={
          <UserAvatar
            src={otherMember.profile.imageUrl}
            className="h-8 w-8 md:h-8 md:w-8 mr-2"
          />
        }
      />
    </div>
  )
}

export default ConversationPage
