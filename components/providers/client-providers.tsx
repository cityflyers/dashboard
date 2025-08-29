'use client'

import { GeistProvider, CssBaseline } from '@geist-ui/core'
import { AuthProvider } from '@/lib/auth/auth-context'

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <GeistProvider>
      <CssBaseline />
      <AuthProvider>
        {children}
      </AuthProvider>
    </GeistProvider>
  )
}