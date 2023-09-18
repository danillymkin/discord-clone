import { Menu } from 'lucide-react'

import { Button } from '@/shared/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/shared/ui/sheet'

import { NavigationSidebar } from './navigation-sidebar'
import { ServerSidebar } from './server-sidebar'

interface MobileMenuProps {
  serverId: string
}

export const MobileMenu = ({ serverId }: MobileMenuProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="p-0 flex gap-0">
        <div className="w-[72px]">
          <NavigationSidebar />
        </div>

        <ServerSidebar serverId={serverId} />
      </SheetContent>
    </Sheet>
  )
}
