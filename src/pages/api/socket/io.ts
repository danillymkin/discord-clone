import { Server as NetServer } from 'http'
import { NextApiRequest } from 'next'
import { Server as ServerIO } from 'socket.io'

import { NextApiResponseServerIO } from '@/shared/lib/types'

export const config = {
  api: {
    bodyParser: false,
  },
}

const ioHandler = async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    const path = '/api/socket/io'
    const httpServer: NetServer = res.socket.server as any
    const io = new ServerIO(httpServer, {
      path,
    })
    res.socket.server.io = io
  }

  res.end()
}

export default ioHandler
