'use client'

import { useAuth } from '@/lib/auth/auth-context'
import { Button, Link, Spacer, Text, Grid, Avatar, Popover, Divider } from '@geist-ui/core'
import { LogOut, User, Settings } from '@geist-ui/icons'
import { useRouter } from 'next/navigation'

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

  const popoverContent = (
    <div style={{ padding: '0.5rem' }}>
      <Text p style={{ margin: '0.5rem 0' }}>
        {profile?.first_name} {profile?.last_name}
      </Text>
      <Text small type="secondary" style={{ margin: '0.5rem 0' }}>
        {user?.email}
      </Text>
      <Divider />
      <Button 
        auto 
        scale={0.8} 
        icon={<User />} 
        style={{ width: '100%', justifyContent: 'flex-start', marginBottom: '0.5rem' }}
        onClick={() => handleNavigation('/dashboard')}
      >
        Dashboard
      </Button>
      <Button 
        auto 
        scale={0.8} 
        icon={<Settings />} 
        style={{ width: '100%', justifyContent: 'flex-start', marginBottom: '0.5rem' }}
        onClick={() => handleNavigation('/profile')}
      >
        Profile
      </Button>
      <Button 
        auto 
        scale={0.8} 
        type="error" 
        icon={<LogOut />} 
        style={{ width: '100%', justifyContent: 'flex-start' }}
        onClick={handleSignOut}
      >
        Sign Out
      </Button>
    </div>
  )

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
          <Popover
            content={popoverContent as any}
            placement="bottomEnd"
          >
            <Avatar 
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${profile?.first_name}`}
              text={profile?.first_name?.[0] || user.email?.[0]}
              style={{ cursor: 'pointer' }}
            />
          </Popover>
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