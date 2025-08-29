'use client'

import { useAuth } from '@/lib/auth/auth-context'
import { Navigation } from '@/components/layout/navigation'
import { Card, Text, Grid, Spacer, Badge, Button } from '@geist-ui/core'
import { Users, BarChart, Package, Settings, FileText, CreditCard, Truck, User, Briefcase } from '@geist-ui/icons'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const { profile, loading } = useAuth()
  const router = useRouter()

  if (loading) {
    return (
      <div>
        <Navigation />
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <Text>Loading...</Text>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div>
        <Navigation />
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <Text>No profile found</Text>
        </div>
      </div>
    )
  }

  const renderDashboardContent = () => {
    switch (profile.role) {
      case 'SuperAdmin':
        return (
          <div>
            <Grid.Container gap={2}>
              <Grid xs={24} sm={8}>
                <Card style={{ height: '120px', padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <Text h4 style={{ margin: 0 }}>Total Users</Text>
                      <Text h2 style={{ margin: '0.5rem 0', color: '#0070f3' }}>1,234</Text>
                      <Text small style={{ color: '#666' }}>+12% from last month</Text>
                    </div>
                    <Users size={32} style={{ color: '#0070f3' }} />
                  </div>
                </Card>
              </Grid>
              
              <Grid xs={24} sm={8}>
                <Card style={{ height: '120px', padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <Text h4 style={{ margin: 0 }}>Active Sessions</Text>
                      <Text h2 style={{ margin: '0.5rem 0', color: '#0070f3' }}>892</Text>
                      <Text small style={{ color: '#666' }}>+8% from last hour</Text>
                    </div>
                    <BarChart size={32} style={{ color: '#0070f3' }} />
                  </div>
                </Card>
              </Grid>
              
              <Grid xs={24} sm={8}>
                <Card style={{ height: '120px', padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <Text h4 style={{ margin: 0 }}>System Health</Text>
                      <Text h2 style={{ margin: '0.5rem 0', color: '#10b981' }}>98.5%</Text>
                      <Text small style={{ color: '#666' }}>All systems operational</Text>
                    </div>
                    <Settings size={32} style={{ color: '#10b981' }} />
                  </div>
                </Card>
              </Grid>
            </Grid.Container>
            
            <Spacer h={2} />
            
            <Grid.Container gap={2}>
              <Grid xs={24} sm={12}>
                <Card style={{ padding: '1.5rem', height: '200px' }}>
                  <Text h4 style={{ marginBottom: '1rem' }}>User Management</Text>
                  <Text p style={{ color: '#666', marginBottom: '1.5rem' }}>
                    Manage all users, roles, and permissions across the platform
                  </Text>
                  <Button 
                    type="success" 
                    icon={<Users />} 
                    onClick={() => router.push('/admin/users')}
                  >
                    Manage Users
                  </Button>
                </Card>
              </Grid>
              
              <Grid xs={24} sm={12}>
                <Card style={{ padding: '1.5rem', height: '200px' }}>
                  <Text h4 style={{ marginBottom: '1rem' }}>System Analytics</Text>
                  <Text p style={{ color: '#666', marginBottom: '1.5rem' }}>
                    View detailed analytics and system performance metrics
                  </Text>
                  <Button 
                    icon={<BarChart />}
                  >
                    View Analytics
                  </Button>
                </Card>
              </Grid>
            </Grid.Container>
          </div>
        )

      case 'SupportAdmin':
      case 'AccountsAdmin':
      case 'MarketingAdmin':
        return (
          <div>
            <Grid.Container gap={2}>
              <Grid xs={24} sm={8}>
                <Card style={{ height: '120px', padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <Text h4 style={{ margin: 0 }}>Active Tickets</Text>
                      <Text h2 style={{ margin: '0.5rem 0', color: '#0070f3' }}>42</Text>
                      <Text small style={{ color: '#666' }}>+3 from yesterday</Text>
                    </div>
                    <FileText size={32} style={{ color: '#0070f3' }} />
                  </div>
                </Card>
              </Grid>
              
              <Grid xs={24} sm={8}>
                <Card style={{ height: '120px', padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <Text h4 style={{ margin: 0 }}>
                        {profile.role === 'AccountsAdmin' ? 'Revenue' : profile.role === 'MarketingAdmin' ? 'Campaigns' : 'Resolved'}
                      </Text>
                      <Text h2 style={{ margin: '0.5rem 0', color: '#0070f3' }}>
                        {profile.role === 'AccountsAdmin' ? '$12,350' : profile.role === 'MarketingAdmin' ? '8' : '156'}
                      </Text>
                      <Text small style={{ color: '#666' }}>
                        {profile.role === 'AccountsAdmin' ? '+15% this month' : profile.role === 'MarketingAdmin' ? '3 active' : 'This week'}
                      </Text>
                    </div>
                    {profile.role === 'AccountsAdmin' ? (
                      <CreditCard size={32} style={{ color: '#0070f3' }} />
                    ) : profile.role === 'MarketingAdmin' ? (
                      <BarChart size={32} style={{ color: '#0070f3' }} />
                    ) : (
                      <User size={32} style={{ color: '#0070f3' }} />
                    )}
                  </div>
                </Card>
              </Grid>
              
              <Grid xs={24} sm={8}>
                <Card style={{ height: '120px', padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <Text h4 style={{ margin: 0 }}>Performance</Text>
                      <Text h2 style={{ margin: '0.5rem 0', color: '#10b981' }}>94%</Text>
                      <Text small style={{ color: '#666' }}>Department efficiency</Text>
                    </div>
                    <Settings size={32} style={{ color: '#10b981' }} />
                  </div>
                </Card>
              </Grid>
            </Grid.Container>
            
            <Spacer h={2} />
            
            <Card style={{ padding: '1.5rem' }}>
              <Text h4 style={{ marginBottom: '1rem' }}>{profile.role.replace('Admin', '')} Dashboard</Text>
              <Text p style={{ color: '#666', marginBottom: '1.5rem' }}>
                Welcome to your {profile.role.replace('Admin', '').toLowerCase()} management dashboard
              </Text>
              <Button 
                type="success" 
                icon={<Briefcase />} 
                onClick={() => router.push('/staff')}
              >
                Go to Staff Portal
              </Button>
            </Card>
          </div>
        )

      case 'PartnerAdmin':
      case 'SupplierAdmin':
      case 'AgentAdmin':
        return (
          <div>
            <Grid.Container gap={2}>
              <Grid xs={24} sm={8}>
                <Card style={{ height: '120px', padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <Text h4 style={{ margin: 0 }}>Active Orders</Text>
                      <Text h2 style={{ margin: '0.5rem 0', color: '#0070f3' }}>28</Text>
                      <Text small style={{ color: '#666' }}>+5 this week</Text>
                    </div>
                    <Package size={32} style={{ color: '#0070f3' }} />
                  </div>
                </Card>
              </Grid>
              
              <Grid xs={24} sm={8}>
                <Card style={{ height: '120px', padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <Text h4 style={{ margin: 0 }}>Revenue</Text>
                      <Text h2 style={{ margin: '0.5rem 0', color: '#0070f3' }}>$8,420</Text>
                      <Text small style={{ color: '#666' }}>+22% from last month</Text>
                    </div>
                    <CreditCard size={32} style={{ color: '#0070f3' }} />
                  </div>
                </Card>
              </Grid>
              
              <Grid xs={24} sm={8}>
                <Card style={{ height: '120px', padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <Text h4 style={{ margin: 0 }}>Shipments</Text>
                      <Text h2 style={{ margin: '0.5rem 0', color: '#0070f3' }}>15</Text>
                      <Text small style={{ color: '#666' }}>3 in transit</Text>
                    </div>
                    <Truck size={32} style={{ color: '#0070f3' }} />
                  </div>
                </Card>
              </Grid>
            </Grid.Container>
            
            <Spacer h={2} />
            
            <Card style={{ padding: '1.5rem' }}>
              <Text h4 style={{ marginBottom: '1rem' }}>{profile.role.replace('Admin', '')} Portal</Text>
              <Text p style={{ color: '#666', marginBottom: '1.5rem' }}>
                Manage your {profile.role.replace('Admin', '').toLowerCase()} operations and partnerships
              </Text>
              <Button 
                type="success" 
                icon={<Package />} 
                onClick={() => router.push('/vendor')}
              >
                Go to Vendor Portal
              </Button>
            </Card>
          </div>
        )

      case 'UserAdmin':
        return (
          <div>
            <Card style={{ padding: '1.5rem', marginBottom: '2rem' }}>
              <Text h4 style={{ marginBottom: '1rem' }}>Welcome, {profile.first_name}!</Text>
              <Text p style={{ color: '#666', marginBottom: '1.5rem' }}>
                Your personal dashboard and profile management
              </Text>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Button 
                  icon={<Settings />} 
                  onClick={() => router.push('/profile')}
                >
                  Edit Profile
                </Button>
                <Button 
                  type="success" 
                  icon={<User />} 
                  onClick={() => router.push('/user')}
                >
                  User Portal
                </Button>
              </div>
            </Card>

            <Grid.Container gap={2}>
              <Grid xs={24} sm={12}>
                <Card style={{ padding: '1.5rem', height: '200px' }}>
                  <Text h4 style={{ marginBottom: '1rem' }}>Account Information</Text>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <Text><strong>Name:</strong> {profile.first_name} {profile.last_name}</Text>
                    <Text><strong>Email:</strong> {profile.email}</Text>
                    <Text><strong>Category:</strong> <Badge type="success">{profile.category}</Badge></Text>
                    <Text><strong>Role:</strong> <Badge>{profile.role}</Badge></Text>
                  </div>
                </Card>
              </Grid>

              <Grid xs={24} sm={12}>
                <Card style={{ padding: '1.5rem', height: '200px' }}>
                  <Text h4 style={{ marginBottom: '1rem' }}>Quick Actions</Text>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <Button 
                      auto 
                      scale={0.8} 
                      icon={<Settings />} 
                      style={{ justifyContent: 'flex-start' }}
                      onClick={() => router.push('/profile')}
                    >
                      Account Settings
                    </Button>
                    <Button 
                      auto 
                      scale={0.8} 
                      icon={<FileText />} 
                      style={{ justifyContent: 'flex-start' }}
                    >
                      View Activity
                    </Button>
                  </div>
                </Card>
              </Grid>
            </Grid.Container>
          </div>
        )

      default:
        return (
          <Card style={{ padding: '2rem', textAlign: 'center' }}>
            <Text h4 style={{ marginBottom: '1rem' }}>Access Denied</Text>
            <Text p style={{ color: '#666' }}>You don't have permission to view this dashboard</Text>
          </Card>
        )
    }
  }

  return (
    <div>
      <Navigation />
      
      <div style={{ padding: '2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <Text h2 style={{ marginBottom: '0.5rem' }}>Dashboard</Text>
          <Text p style={{ color: '#666' }}>
            Welcome back, {profile.first_name}! You're logged in as <Badge type="secondary">{profile.role}</Badge>.
          </Text>
        </div>

        {renderDashboardContent()}
      </div>
    </div>
  )
}