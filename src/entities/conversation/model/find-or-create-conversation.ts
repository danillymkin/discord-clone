import { createConversation, findConversation } from '..'

export const findOrCreateConversation = async (
  firstMemberId: string,
  secondMemberId: string
) => {
  let conversation =
    (await findConversation(firstMemberId, secondMemberId)) ||
    (await findConversation(secondMemberId, firstMemberId))

  if (!conversation) {
    conversation = await createConversation(firstMemberId, secondMemberId)
  }

  return conversation
}
