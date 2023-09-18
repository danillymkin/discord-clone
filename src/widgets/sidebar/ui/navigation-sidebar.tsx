import { UserButton } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import { CreateServerButton } from '@/features/server/create-server'
import { ToggleTheme } from '@/features/toggle-theme'

import { ServerRound } from '@/entities/server'
import { currentProfile } from '@/entities/user'

import { db } from '@/shared/lib/database'
import { ScrollArea } from '@/shared/ui/scroll-area'
import { Separator } from '@/shared/ui/separator'

export const NavigationSidebar = async () => {
  const profile = await currentProfile()

  if (!profile) {
    redirect('/')
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  })

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full bg-[#E3E5E8] dark:bg-[#1E1F22] py-3">
      <CreateServerButton />

      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />

      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <ServerRound
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>

      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ToggleTheme />

        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: 'h-12 w-12',
            },
          }}
        />
      </div>
    </div>
  )
}
