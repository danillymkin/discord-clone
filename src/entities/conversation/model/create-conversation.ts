import { db } from '@/shared/lib/database'

export const createConversation = async (
  firstMemberId: string,
  secondMemberId: string
) => {
  try {
    return await db.conversation.create({
      data: {
        firstMemberId,
        secondMemberId,
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
  } catch {
    return null
  }
}
