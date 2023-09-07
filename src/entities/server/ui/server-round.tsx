import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { cn } from '@/shared/lib/cn'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/ui/tooltip'

interface ServerRoundProps {
  id: string
  imageUrl: string
  name: string
}

export const ServerRound = ({ id, imageUrl, name }: ServerRoundProps) => {
  const params = useParams()

  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>
          <Link href={`/servers/${id}`}>
            <button className="group relative flex items-center">
              <div
                className={cn(
                  'absolute left-0 bg-primary rounded-r-full transition-all w-1',
                  params?.serverId !== id && 'group-hover:h-5',
                  params?.serverId === id ? 'h-9' : 'h-2'
                )}
              />

              <div
                className={cn(
                  'relative group flex mx-3 h-12 w-12 rounded-3xl group-hover:rounded-2xl transition-all overflow-hidden',
                  params?.serverId === id &&
                    'bg-primary/10 text-primary rounded-2xl'
                )}
              >
                <Image fill src={imageUrl} alt="Chanel" />
              </div>
            </button>
          </Link>
        </TooltipTrigger>

        <TooltipContent side={'right'} align={'center'}>
          <p className="font-semibold text-sm capitalize">{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
