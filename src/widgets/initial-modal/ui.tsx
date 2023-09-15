'use client'

import { useContext, useEffect, useState } from 'react'

import { GlobalModalsContext } from '@/shared/lib/context/global-modals-context'

export const InitialModal = () => {
  const [hasOpened, setHasOpened] = useState(false)
  const { onOpen, isOpen, type } = useContext(GlobalModalsContext)

  const isModalOpen = isOpen && type === 'createServer'

  useEffect(() => {
    onOpen('createServer')
    setHasOpened(true)
  }, [onOpen])

  useEffect(() => {
    if (!isModalOpen && hasOpened) {
      window.location.reload()
    }
  }, [hasOpened, isModalOpen])

  return null
}
