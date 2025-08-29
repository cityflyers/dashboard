'use client'

import { useAuth } from '@/lib/auth/auth-context'
import { Button, Link, Spacer, Text, Grid, Avatar, Divider } from '@geist-ui/core'
import { LogOut, User, Settings } from '@geist-ui/icons'
import { useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Navigation() {
  const { user, profile, loading, signOut } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <Grid.Container gap={2} justify="space-between" alignItems="center" style={{ padding: '1rem 2rem', borderBottom: '1px solid #eaeaea' }}>
      <Grid xs={6}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Text h3 style={{ margin: 0, fontWeight: 600 }}>AuthApp</Text>
        </Link>
      </Grid>
      
      <Grid xs={6} justify="flex-end">
        {loading ? (
          <Text>Loading...</Text>
        ) : user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div style={{ cursor: 'pointer' }}>
                <Avatar 
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${profile?.first_name}`}
                  text={profile?.first_name?.[0] || user.email?.[0]}
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex flex-col space-y-1 p-2">
                <p className="text-sm font-medium leading-none">
                  {profile?.first_name} {profile?.last_name}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleNavigation('/dashboard')}>
                <User className="mr-2 h-4 w-4" />
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleNavigation('/profile')}>
                <Settings className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button auto scale={0.8} onClick={() => handleNavigation('/login')}>
              Sign In
            </Button>
            <Button auto scale={0.8} type="success" onClick={() => handleNavigation('/register')}>
              Sign Up
            </Button>
          </div>
        )}
      </Grid>
    </Grid.Container>
  )
}