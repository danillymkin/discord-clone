import { UserButton } from '@clerk/nextjs'

import { ToggleTheme } from '@/features/toggle-theme'

export default function Home() {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
      <ToggleTheme />
    </div>
  )
}
