import { redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import { ChatMasseges } from '@/widgets/chat-messages'
import { MobileMenu } from '@/widgets/sidebar'

import { AttachFileButton } from '@/features/chat/attach-file'
import { ChatInput } from '@/features/chat/send-message'

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

  const socketUrl = '/api/socket/direct-messages'
  const query = {
    conversationId: conversation.id,
  }

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

      <ChatMasseges
        name={otherMember.profile.name}
        chatId={conversation.id}
        member={currentMember}
        type="conversation"
        apiUrl="/api/direct-messages"
        socketUrl={socketUrl}
        socketQuery={query}
        paramKey="conversationId"
        paramValue={conversation.id}
      />

      <ChatInput
        name={otherMember.profile.name}
        type="conversation"
        apiUrl={socketUrl}
        query={query}
        leftSlot={<AttachFileButton apiUrl={socketUrl} query={query} />}
      />
    </div>
  )
}

export default ConversationPage
