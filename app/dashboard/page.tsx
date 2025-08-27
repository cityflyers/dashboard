'use client'

import { useAuth } from '@/lib/auth/auth-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { 
  Users, 
  BarChart, 
  Package, 
  Settings, 
  FileText, 
  CreditCard,
  Truck,
  UserCheck,
  Briefcase
} from 'lucide-react'

export default function DashboardPage() {
  const { profile, loading } = useAuth()

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (!profile) {
    return <div className="container mx-auto px-4 py-8">No profile found</div>
  }

  const renderDashboardContent = () => {
    switch (profile.role) {
      case 'SuperAdmin':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">892</div>
                  <p className="text-xs text-muted-foreground">+8% from last hour</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">System Health</CardTitle>
                  <Settings className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">98.5%</div>
                  <p className="text-xs text-muted-foreground">All systems operational</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>
                    Manage all users, roles, and permissions across the platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild>
                    <Link href="/admin/users">
                      <Users className="mr-2 h-4 w-4" />
                      Manage Users
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Analytics</CardTitle>
                  <CardDescription>
                    View detailed analytics and system performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline">
                    <BarChart className="mr-2 h-4 w-4" />
                    View Analytics
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 'SupportAdmin':
      case 'AccountsAdmin':
      case 'MarketingAdmin':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Tickets</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">42</div>
                  <p className="text-xs text-muted-foreground">+3 from yesterday</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {profile.role === 'AccountsAdmin' ? 'Revenue' : profile.role === 'MarketingAdmin' ? 'Campaigns' : 'Resolved'}
                  </CardTitle>
                  {profile.role === 'AccountsAdmin' ? (
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  ) : profile.role === 'MarketingAdmin' ? (
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <UserCheck className="h-4 w-4 text-muted-foreground" />
                  )}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {profile.role === 'AccountsAdmin' ? '$12,350' : profile.role === 'MarketingAdmin' ? '8' : '156'}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {profile.role === 'AccountsAdmin' ? '+15% this month' : profile.role === 'MarketingAdmin' ? '3 active' : 'This week'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Performance</CardTitle>
                  <Settings className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">94%</div>
                  <p className="text-xs text-muted-foreground">Department efficiency</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{profile.role.replace('Admin', '')} Dashboard</CardTitle>
                <CardDescription>
                  Welcome to your {profile.role.replace('Admin', '').toLowerCase()} management dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Access your department-specific tools and resources from here.
                </p>
                <Button asChild>
                  <Link href="/staff">
                    <Briefcase className="mr-2 h-4 w-4" />
                    Go to Staff Portal
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        )

      case 'PartnerAdmin':
      case 'SupplierAdmin':
      case 'AgentAdmin':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">28</div>
                  <p className="text-xs text-muted-foreground">+5 this week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$8,420</div>
                  <p className="text-xs text-muted-foreground">+22% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Shipments</CardTitle>
                  <Truck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">15</div>
                  <p className="text-xs text-muted-foreground">3 in transit</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{profile.role.replace('Admin', '')} Portal</CardTitle>
                <CardDescription>
                  Manage your {profile.role.replace('Admin', '').toLowerCase()} operations and partnerships
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Access vendor-specific tools, manage orders, and track performance metrics.
                </p>
                <Button asChild>
                  <Link href="/vendor">
                    <Package className="mr-2 h-4 w-4" />
                    Go to Vendor Portal
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        )

      case 'UserAdmin':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Welcome, {profile.first_name}!</CardTitle>
                <CardDescription>
                  Your personal dashboard and profile management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Manage your profile information and account settings from here.
                </p>
                <div className="flex space-x-4">
                  <Button asChild>
                    <Link href="/profile">
                      <Settings className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/user">
                      <UserCheck className="mr-2 h-4 w-4" />
                      User Portal
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p><strong>Name:</strong> {profile.first_name} {profile.last_name}</p>
                  <p><strong>Email:</strong> {profile.email}</p>
                  <p><strong>Category:</strong> {profile.category}</p>
                  <p><strong>Role:</strong> {profile.role}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Account Settings
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    View Activity
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      default:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Access Denied</CardTitle>
              <CardDescription>You don't have permission to view this dashboard</CardDescription>
            </CardHeader>
          </Card>
        )
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {profile.first_name}! You're logged in as {profile.role}.
        </p>
      </div>

      {renderDashboardContent()}
    </div>
  )
}