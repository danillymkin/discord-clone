import { redirect } from 'next/navigation'

import { InitialModal } from '@/widgets/initial-modal'

import { initialProfile } from '@/entities/user'

import { db } from '@/shared/lib/database'

const SetupPage = async () => {
  const profile = await initialProfile()

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  })

  if (server) {
    return redirect(`/servers/${server.id}`)
  }

  return <InitialModal />
}

export default SetupPage
