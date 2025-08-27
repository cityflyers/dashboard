import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Users, Lock, Smartphone } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center space-y-6 mb-16">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
          Secure Authentication
          <span className="block text-primary">Made Simple</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          A modern authentication system with role-based permissions, built with Next.js 14 and Supabase.
          Secure, scalable, and user-friendly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/register">Get Started</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <Card>
          <CardHeader>
            <Shield className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="text-lg">Secure Authentication</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              JWT-based authentication with Supabase, ensuring your data is always secure.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Users className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="text-lg">Role-Based Access</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Granular permission system with SuperAdmin, Staff, Vendor, and User roles.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Lock className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="text-lg">Row Level Security</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Database-level security policies ensuring users can only access their own data.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Smartphone className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="text-lg">Responsive Design</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Beautiful, minimalist interface that works perfectly on all devices.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Ready to get started?</CardTitle>
            <CardDescription>
              Create your account now and experience secure, role-based authentication.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg" asChild>
              <Link href="/register">Create Account</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}