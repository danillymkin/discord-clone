import { redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import { currentProfile } from '@/entities/user'

import { db } from '@/shared/lib/database'

interface InvitePageProps {
  params: {
    inviteCode: string
  }
}

const InvitePage = async ({ params }: InvitePageProps) => {
  const { inviteCode } = params

  const profile = await currentProfile()

  if (!profile) {
    return redirectToSignIn()
  }

  if (!params.inviteCode) {
    return redirect('/')
  }

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  })

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`)
  }

  const server = await db.server.update({
    where: { inviteCode },
    data: {
      members: {
        create: [
          {
            profileId: profile.id,
          },
        ],
      },
    },
  })

  if (server) {
    redirect(`/servers/${server.id}`)
  }

  return null
}

export default InvitePage
