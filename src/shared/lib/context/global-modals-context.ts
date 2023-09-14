import { Server } from '@prisma/client'
import { createContext } from 'react'

export type ModalType =
  | 'createServer'
  | 'invite'
  | 'editServer'
  | 'manageMembers'
  | 'createChannel'
  | 'leaveServer'
  | 'deleteServer'

export type ModalData = {
  server?: Server
}

interface GlobalModalsContextType {
  type: ModalType | null
  data: ModalData
  isOpen: boolean
  onOpen: (type: ModalType, data?: ModalData) => void
  onClose: () => void
}

export const initialGlobalModalsState: GlobalModalsContextType = {
  type: null,
  data: {},
  isOpen: false,
  onOpen: () => {},
  onClose: () => {},
}

export const GlobalModalsContext = createContext<GlobalModalsContextType>(
  initialGlobalModalsState
)
