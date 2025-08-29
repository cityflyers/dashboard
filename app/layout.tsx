import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { ClientProviders } from '@/components/providers/client-providers'
import '@/lib/utils/suppress-warnings'
import './globals.css'

export const metadata: Metadata = {
  title: 'AuthApp - Secure Authentication',
  description: 'A secure authentication app with role-based permissions',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        <ClientProviders>
          <main>{children}</main>
        </ClientProviders>
      </body>
    </html>
  )
}