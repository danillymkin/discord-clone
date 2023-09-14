'use client'

import { useEffect, useState } from 'react'

import { CreateChannelModal } from '@/features/channel/create-channel'
import { ConfigureServerModal } from '@/features/server/configure-server'
import { InvitePeopleModal } from '@/features/server/invite-people'
import { LeaveServerModal } from '@/features/server/leave-server'
import { ManageMembersModal } from '@/features/server/manage-members'

import {
  GlobalModalsContext,
  ModalData,
  ModalType,
} from '@/shared/lib/context/global-modals-context'

interface GlobalModalsProviderProps {
  children: React.ReactNode
}

export const GlobalModalsProvider = ({
  children,
}: GlobalModalsProviderProps) => {
  const [isClient, setIsClient] = useState<boolean>(false)

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [modalType, setModalType] = useState<ModalType | null>(null)
  const [modalData, setModalData] = useState<ModalData>({})

  const onOpen = (type: ModalType, data: ModalData = {}) => {
    setIsOpen(true)
    setModalType(type)
    setModalData(data)
  }

  const onClose = () => {
    setIsOpen(false)
    setModalType(null)
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <GlobalModalsContext.Provider
      value={{ isOpen, onOpen, onClose, type: modalType, data: modalData }}
    >
      {children}

      <InvitePeopleModal />
      <ConfigureServerModal />
      <ManageMembersModal />
      <CreateChannelModal />
      <LeaveServerModal />
    </GlobalModalsContext.Provider>
  )
}
