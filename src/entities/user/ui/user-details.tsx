import { MemberRole } from '@prisma/client'
import { ShieldAlert, ShieldCheck } from 'lucide-react'

interface UserDetailsProps {
  name: string
  role: MemberRole
  email: string
}

const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
  ADMIN: <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />,
}

export const UserDetails = ({ name, role, email }: UserDetailsProps) => {
  return (
    <div className="flex flex-col gap-y-1">
      <div className="text-xs font-semibold flex items-center gap-x-1">
        {name}

        {roleIconMap[role]}
      </div>

      <p className="text-xs text-zinc-500">{email}</p>
    </div>
  )
}
