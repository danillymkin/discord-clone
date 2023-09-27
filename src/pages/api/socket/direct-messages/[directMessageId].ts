import { getAuth } from '@clerk/nextjs/server'
import { MemberRole } from '@prisma/client'
import { NextApiRequest } from 'next'

import { db } from '@/shared/lib/database'
import { NextApiResponseServerIO } from '@/shared/lib/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  if (req.method !== 'DELETE' && req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { userId } = getAuth(req)
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    const profile = await db.profile.findUnique({
      where: { userId },
    })

    const { content } = req.body
    const { conversationId, directMessageId } = req.query

    if (!profile) {
      return res.status(400).json({ error: 'Unauthorized' })
    }

    if (!conversationId) {
      return res.status(400).json({ error: 'ConversationId ID missing' })
    }

    const conversation = await db.conversation.findFirst({
      where: {
        id: conversationId as string,
        OR: [
          {
            firstMember: {
              profileId: profile.id,
            },
          },
          {
            secondMember: {
              profileId: profile.id,
            },
          },
        ],
      },
      include: {
        firstMember: {
          include: {
            profile: true,
          },
        },
        secondMember: {
          include: {
            profile: true,
          },
        },
      },
    })

    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' })
    }

    const member =
      conversation.firstMember.profileId === profile.id
        ? conversation.firstMember
        : conversation.secondMember

    if (!member) {
      return res.status(404).json({ message: 'Member not found' })
    }

    let message = await db.directMessage.findFirst({
      where: {
        id: directMessageId as string,
        conversationId: conversationId as string,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    })

    if (!message || message.deleted) {
      return res.status(404).json({ message: 'Message not found' })
    }

    const isMessageOwner = message.memberId === member.id
    const isAdmin = member.role === MemberRole.ADMIN
    const isModerator = member.role === MemberRole.MODERATOR
    const canModify = isMessageOwner || isAdmin || isModerator

    if (!canModify) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    if (req.method === 'DELETE') {
      message = await db.directMessage.update({
        where: {
          id: directMessageId as string,
        },
        data: {
          fileUrl: null,
          content: 'This message has been deleted',
          deleted: true,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
      })
    }

    if (req.method === 'PATCH') {
      if (!isMessageOwner) {
        return res.status(401).json({ error: 'Unauthorized' })
      }

      message = await db.directMessage.update({
        where: {
          id: directMessageId as string,
        },
        data: {
          content,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
      })
    }

    const updateKey = `chat:${conversationId}:messages:update`

    res?.socket?.server?.io?.emit(updateKey, message)

    return res.status(200).json(message)
  } catch (error) {
    console.log('[MESSAGE_ID]', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
