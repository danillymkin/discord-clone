import { NextResponse } from 'next/server'

import { currentProfile } from '@/entities/user'

import { db } from '@/shared/lib/database'

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile()
    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { name, imageUrl } = await req.json()

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        name,
        imageUrl,
      },
    })

    return NextResponse.json(server)
  } catch (error) {
    console.log('[SERVER_ID_PATCH]', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
}
