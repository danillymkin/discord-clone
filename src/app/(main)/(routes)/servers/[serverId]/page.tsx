import { redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import { currentProfile } from '@/entities/user'

import { db } from '@/shared/lib/database'

interface ServerPageProps {
  params: {
    serverId: string
  }
}

const ServerPage = async ({ params }: ServerPageProps) => {
  const profile = await currentProfile()

  if (!profile) {
    return redirectToSignIn()
  }

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      chanels: {
        where: {
          name: 'general',
        },
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  })

  const initialChannel = server?.chanels[0]

  if (initialChannel?.name !== 'general') {
    return null
  }

  return redirect(`/servers/${params.serverId}/channels/${initialChannel.id}`)
}

export default ServerPage
