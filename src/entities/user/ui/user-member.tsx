import { Member, MemberRole, Profile } from '@prisma/client'
import { ShieldAlert, ShieldCheck } from 'lucide-react'

import { cn } from '@/shared/lib/cn'

import { UserAvatar } from './user-avatar'

interface UserMemberProps {
  member: Member & {
    profile: Profile
  }
  activeMemberId?: string
}

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />,
}

export const UserMember = ({ member, activeMemberId }: UserMemberProps) => {
  const icon = roleIconMap[member.role]

  return (
    <button
      className={cn(
        'group p-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1',
        activeMemberId === member.id && 'bg-zinc-700/20 dark:bg-zinc-700'
      )}
    >
      <UserAvatar
        src={member.profile.imageUrl}
        className="h-8 w-8 md:h-8 md:w-8"
      />

      <p
        className={cn(
          'font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition',
          activeMemberId === member.id &&
            'text-primary dark:text-zinc-200 dark:group-hover:text-white'
        )}
      >
        {member.profile.name}
      </p>

      {icon}
    </button>
  )
}
