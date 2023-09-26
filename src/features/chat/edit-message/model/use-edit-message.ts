import { create } from 'zustand'

type State = {
  isEditing: boolean
  editingMessageId: string | null
}

type Action = {
  setIsEditing: (messageId: string | null) => void
}

export const useEditMessage = create<State & Action>((set) => ({
  isEditing: false,
  editingMessageId: null,
  setIsEditing: (messageId: string | null) =>
    set({
      isEditing: messageId !== null ? true : false,
      editingMessageId: messageId,
    }),
}))
