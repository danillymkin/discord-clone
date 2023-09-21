import { getAuth } from '@clerk/nextjs/server'
import { NextApiRequest } from 'next'

import { db } from '@/shared/lib/database'
import { NextApiResponseServerIO } from '@/shared/lib/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { userId } = getAuth(req)
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    const profile = await db.profile.findUnique({
      where: { userId },
    })

    const { content, fileUrl } = req.body
    const { serverId, channelId } = req.query

    if (!profile) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    if (!serverId) {
      return res.status(401).json({ error: 'Server ID missing' })
    }

    if (!channelId) {
      return res.status(401).json({ error: 'Channel ID missing' })
    }

    if (!content) {
      return res.status(401).json({ error: 'Content missing' })
    }

    const server = await db.server.findFirst({
      where: {
        id: serverId as string,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      include: {
        members: true,
      },
    })

    if (!server) {
      return res.status(404).json({ message: 'Server not found' })
    }

    const channel = await db.chanel.findFirst({
      where: {
        id: channelId as string,
        serverId: serverId as string,
      },
    })

    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' })
    }

    const member = server.members.find(
      (member) => member.profileId === profile.id
    )

    if (!member) {
      return res.status(404).json({ message: 'Member not found' })
    }

    const message = await db.message.create({
      data: {
        content,
        fileUrl,
        channelId: channelId as string,
        memberId: member.id,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    })

    const channelKey = `chat:${channelId}:messages`

    res?.socket?.server?.io?.emit(channelKey, message)

    return res.status(200).json(message)
  } catch (e) {
    console.log('[MESSAGES_POST]', e)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
