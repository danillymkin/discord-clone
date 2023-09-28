import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'

import { GlobalModalsProvider } from '@/app-layer/global-modals-provider'
import { QueryProvider } from '@/app-layer/query-provider'
import { SocketProvider } from '@/app-layer/socket-provider'
import { ThemeProvider } from '@/app-layer/theme-provider'

import { cn } from '@/shared/lib/cn'

import './globals.css'

const font = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(font.className, 'bg-white dark:bg-[#313338]')}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            storageKey="discord-theme"
            enableSystem={false}
          >
            <SocketProvider>
              <GlobalModalsProvider>
                <QueryProvider>{children}</QueryProvider>
              </GlobalModalsProvider>
            </SocketProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
