'use client'

import { useState } from 'react'

import { CreateServerButton } from './create-server-button'
import { CreateServerModal } from './create-server-modal'

export const CreateServer = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const onOpen = () => setIsOpen(true)

  const onClose = () => setIsOpen(false)

  return (
    <>
      <CreateServerButton onClick={onOpen} />

      <CreateServerModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  )
}
