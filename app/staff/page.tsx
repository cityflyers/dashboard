'use client'

import { useAuth } from '@/lib/auth/auth-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Shield, FileText, CreditCard, BarChart } from 'lucide-react'

export default function StaffPage() {
  const { profile } = useAuth()

  if (!profile || (profile.category !== 'Staff' && profile.role !== 'SuperAdmin')) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            Access denied. Staff privileges required.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Staff Portal</h1>
        <p className="text-muted-foreground">
          Staff management tools and resources
        </p>
        <Badge variant="outline" className="mt-2">
          {profile.role}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Support Center
            </CardTitle>
            <CardDescription>
              Manage support tickets and customer inquiries
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Handle customer support requests, view ticket history, and manage resolution workflows.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="mr-2 h-5 w-5" />
              Accounts Management
            </CardTitle>
            <CardDescription>
              Financial reporting and account management
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Access financial reports, manage billing, and oversee account operations.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart className="mr-2 h-5 w-5" />
              Marketing Tools
            </CardTitle>
            <CardDescription>
              Campaign management and analytics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Create and manage marketing campaigns, analyze performance metrics.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Staff Resources</CardTitle>
          <CardDescription>
            Quick access to commonly used staff tools and documentation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Documentation</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Staff handbook</li>
                <li>• Process guidelines</li>
                <li>• Emergency procedures</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Tools</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Internal communication</li>
                <li>• Task management</li>
                <li>• Reporting dashboard</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}