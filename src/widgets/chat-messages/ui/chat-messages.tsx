'use client'

import { Member } from '@prisma/client'
import { Loader2, ServerCrash } from 'lucide-react'
import { Fragment } from 'react'

import { DeleteMessageButton } from '@/features/chat/delete-message'
import {
  EditMessageButton,
  EditMessageForm,
} from '@/features/chat/edit-message'
import { useEditMessage } from '@/features/chat/edit-message/model/use-edit-message'

import { ChatMessage } from '@/entities/chat'
import { UserAvatar } from '@/entities/user'

import { MessageWithMemberWithProfile } from '@/shared/lib/types'

import { useChatQuery } from '../model/use-chat-query'
import { useChatSocket } from '../model/use-chat-socket'
import { ChatWelcome } from './chat-welcome'

interface ChatMassegesProps {
  name: string
  member: Member
  chatId: string
  apiUrl: string
  socketUrl: string
  socketQuery: Record<string, string>
  paramKey: 'channelId' | 'conversationId'
  paramValue: string
  type: 'channel' | 'conversation'
}

export const ChatMasseges = ({
  name,
  member,
  chatId,
  apiUrl,
  socketUrl,
  socketQuery,
  paramKey,
  paramValue,
  type,
}: ChatMassegesProps) => {
  const { editingMessageId } = useEditMessage()
  const queryKey = `chat:${chatId}`
  const addKey = `chat:${chatId}:messages`
  const updateKey = `chat:${chatId}:messages:update`

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({
      queryKey,
      apiUrl,
      paramKey,
      paramValue,
    })

  useChatSocket({ queryKey, addKey, updateKey })

  if (status === 'loading') {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />

        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading messages
        </p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />

        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Something went wrong!
        </p>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col py-4 overflow-y-auto">
      <div className="flex-1" />

      <ChatWelcome type={type} name={name} />

      <div className="flex flex-col-reverse mt-auto">
        {data?.pages?.map((group, i) => (
          <Fragment key={i}>
            {group.items.map((message: MessageWithMemberWithProfile) => (
              <ChatMessage
                key={message.id}
                message={message}
                currentMember={member}
                userAvatar={
                  <UserAvatar src={message.member.profile.imageUrl} />
                }
                isEditing={editingMessageId === message.id}
                editForm={
                  <EditMessageForm
                    messageId={message.id}
                    content={message.content}
                    socketUrl={socketUrl}
                    socketQuery={socketQuery}
                  />
                }
                editButton={<EditMessageButton messageId={message.id} />}
                deleteButton={
                  <DeleteMessageButton
                    apiUrl={`${socketUrl}/${message.id}`}
                    query={socketQuery}
                  />
                }
              />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
