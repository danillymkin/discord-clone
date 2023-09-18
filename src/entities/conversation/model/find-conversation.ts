import { db } from '@/shared/lib/database'

export const findConversation = async (
  firstMemberId: string,
  secondMemberId: string
) => {
  return await db.conversation.findFirst({
    where: {
      AND: [{ firstMemberId }, { secondMemberId }],
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
}
