'use client'

import { Navigation } from '@/components/layout/navigation'
import { Button, Text, Grid, Card, Spacer } from '@geist-ui/core'
import { Shield, Users, Lock, Smartphone } from '@geist-ui/icons'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  return (
    <div>
      <Navigation />
      
      <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <Text h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 700 }}>
          Secure Authentication
        </Text>
        <Text h2 style={{ fontSize: '1.5rem', color: '#666', fontWeight: 300, marginBottom: '2rem' }}>
          Made Simple
        </Text>
        
        <Text p style={{ fontSize: '1.1rem', color: '#888', maxWidth: '600px', margin: '0 auto 2rem' }}>
          A modern authentication system with role-based permissions, built with Next.js and Supabase.
          Secure, scalable, and user-friendly.
        </Text>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '4rem' }}>
          <Button 
            type="success" 
            scale={1.2}
            onClick={() => router.push('/register')}
          >
            Get Started
          </Button>
          <Button 
            scale={1.2}
            onClick={() => router.push('/login')}
          >
            Sign In
          </Button>
        </div>
        
        <Grid.Container gap={2} justify="center">
          <Grid xs={24} sm={12} md={6}>
            <Card style={{ textAlign: 'center', height: '200px' }}>
              <div style={{ padding: '1.5rem' }}>
                <Shield size={32} style={{ marginBottom: '1rem', color: '#0070f3' }} />
                <Text h4 style={{ marginBottom: '0.5rem' }}>Secure Authentication</Text>
                <Text p style={{ color: '#666', fontSize: '0.9rem' }}>
                  JWT-based authentication with Supabase, ensuring your data is always secure.
                </Text>
              </div>
            </Card>
          </Grid>
          
          <Grid xs={24} sm={12} md={6}>
            <Card style={{ textAlign: 'center', height: '200px' }}>
              <div style={{ padding: '1.5rem' }}>
                <Users size={32} style={{ marginBottom: '1rem', color: '#0070f3' }} />
                <Text h4 style={{ marginBottom: '0.5rem' }}>Role-Based Access</Text>
                <Text p style={{ color: '#666', fontSize: '0.9rem' }}>
                  Granular permission system with SuperAdmin, Staff, Vendor, and User roles.
                </Text>
              </div>
            </Card>
          </Grid>
          
          <Grid xs={24} sm={12} md={6}>
            <Card style={{ textAlign: 'center', height: '200px' }}>
              <div style={{ padding: '1.5rem' }}>
                <Lock size={32} style={{ marginBottom: '1rem', color: '#0070f3' }} />
                <Text h4 style={{ marginBottom: '0.5rem' }}>Row Level Security</Text>
                <Text p style={{ color: '#666', fontSize: '0.9rem' }}>
                  Database-level security policies ensuring users can only access their own data.
                </Text>
              </div>
            </Card>
          </Grid>
          
          <Grid xs={24} sm={12} md={6}>
            <Card style={{ textAlign: 'center', height: '200px' }}>
              <div style={{ padding: '1.5rem' }}>
                <Smartphone size={32} style={{ marginBottom: '1rem', color: '#0070f3' }} />
                <Text h4 style={{ marginBottom: '0.5rem' }}>Responsive Design</Text>
                <Text p style={{ color: '#666', fontSize: '0.9rem' }}>
                  Beautiful, minimalist interface that works perfectly on all devices.
                </Text>
              </div>
            </Card>
          </Grid>
        </Grid.Container>
        
        <Spacer h={4} />
        
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <Card style={{ textAlign: 'center', padding: '2rem' }}>
            <Text h3 style={{ marginBottom: '1rem' }}>Ready to get started?</Text>
            <Text p style={{ color: '#666', marginBottom: '2rem' }}>
              Create your account now and experience secure, role-based authentication.
            </Text>
            <Button 
              type="success" 
              scale={1.2}
              onClick={() => router.push('/register')}
            >
              Create Account
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}