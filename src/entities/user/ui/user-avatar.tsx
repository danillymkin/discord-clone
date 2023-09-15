import { cn } from '@/shared/lib/cn'
import { Avatar, AvatarImage } from '@/shared/ui/avatar'

interface UserAvatarProps {
  src?: string
  className?: string
}

export const UserAvatar = ({ src, className }: UserAvatarProps) => {
  return (
    <Avatar className={cn('h-7 w-7 md:h-10 md:w-10', className)}>
      <AvatarImage src={src} />
    </Avatar>
  )
}
