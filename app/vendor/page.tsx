'use client'

import { useAuth } from '@/lib/auth/auth-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Shield, Package, Truck, Briefcase } from 'lucide-react'

export default function VendorPage() {
  const { profile } = useAuth()

  if (!profile || (profile.category !== 'Vendor' && profile.role !== 'SuperAdmin')) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            Access denied. Vendor privileges required.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Vendor Portal</h1>
        <p className="text-muted-foreground">
          Vendor management tools and partnership resources
        </p>
        <Badge variant="outline" className="mt-2">
          {profile.role}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Briefcase className="mr-2 h-5 w-5" />
              Partnership Management
            </CardTitle>
            <CardDescription>
              Manage partnership agreements and collaborations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Oversee partnership contracts, collaboration agreements, and joint ventures.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="mr-2 h-5 w-5" />
              Supply Management
            </CardTitle>
            <CardDescription>
              Inventory and supply chain operations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Manage inventory levels, supply chain logistics, and procurement processes.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Truck className="mr-2 h-5 w-5" />
              Agent Operations
            </CardTitle>
            <CardDescription>
              Field agent management and coordination
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Coordinate field operations, manage agent assignments, and track performance.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Vendor Resources</CardTitle>
          <CardDescription>
            Essential tools and resources for vendor operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Operations</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Order management</li>
                <li>• Inventory tracking</li>
                <li>• Quality control</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Analytics</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Performance metrics</li>
                <li>• Sales reporting</li>
                <li>• Market analysis</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}