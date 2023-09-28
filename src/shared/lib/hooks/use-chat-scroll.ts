import { useEffect, useState } from 'react'

type ChatScrollProps = {
  chatRef: React.RefObject<HTMLDivElement> | null
  bottomRef: React.RefObject<HTMLDivElement> | null
  shouldLoadMore: boolean
  loadMore: () => void
  count: number
}

export const useChatScroll = ({
  chatRef,
  bottomRef,
  shouldLoadMore,
  loadMore,
  count,
}: ChatScrollProps) => {
  const [hasInitialized, setHasInitialized] = useState(false)

  useEffect(() => {
    const topDiv = chatRef?.current

    const handleScroll = () => {
      const scrollTop = topDiv?.scrollTop

      if (scrollTop === 0 && shouldLoadMore) {
        loadMore()
      }
    }

    topDiv?.addEventListener('scroll', handleScroll)

    return () => {
      topDiv?.removeEventListener('scroll', handleScroll)
    }
  }, [shouldLoadMore, loadMore, chatRef])

  useEffect(() => {
    const bottomDiv = bottomRef?.current
    const topDiv = chatRef?.current

    const shouldAutoScroll = () => {
      if (!hasInitialized && bottomDiv) {
        setHasInitialized(true)
        return true
      }

      if (!topDiv) {
        return false
      }

      const distanceFormBottom =
        topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight

      return distanceFormBottom <= 100
    }

    if (shouldAutoScroll()) {
      const timer = setTimeout(() => {
        bottomRef?.current?.scrollIntoView({
          behavior: 'smooth',
        })
      }, 100)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [bottomRef, chatRef, count, hasInitialized])
}
