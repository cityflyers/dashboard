'use client'

import { useState } from 'react'
import { Navigation } from '@/components/layout/navigation'
import { Button, Input, Text, Card, Grid, Spacer, useToasts } from '@geist-ui/core'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

export default function RegisterPage() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    dob: '',
    mobile: '',
    category: 'PublicUser',
    address: '',
    city: '',
    post: '',
    country: ''
  })
  
  const router = useRouter()
  const { setToast } = useToasts()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      setToast({ text: 'Passwords do not match', type: 'error' })
      return
    }
    
    if (formData.password.length < 6) {
      setToast({ text: 'Password must be at least 6 characters', type: 'error' })
      return
    }
    
    setLoading(true)
    
    try {
      // Register user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      })
      
      if (authError) throw authError
      
      if (authData.user) {
        // Create profile record
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            first_name: formData.firstName,
            last_name: formData.lastName,
            dob: formData.dob,
            mobile: formData.mobile,
            email: formData.email,
            category: formData.category as any,
            role: 'UserAdmin',
            address: formData.address || null,
            city: formData.city || null,
            post: formData.post || null,
            country: formData.country || null
          })
        
        if (profileError) throw profileError
        
        setToast({ 
          text: 'Registration successful! Please check your email to confirm your account.', 
          type: 'success' 
        })
        
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      }
    } catch (error: any) {
      setToast({ text: error.message || 'Registration failed', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Navigation />
      
      <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
        <Card style={{ padding: '2rem' }}>
          <Text h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Create Account</Text>
          
          <form onSubmit={handleSubmit}>
            <Grid.Container gap={1}>
              <Grid xs={12}>
                <Input
                  placeholder="First Name"
                  width="100%"
                  value={formData.firstName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                />
              </Grid>
              <Grid xs={12}>
                <Input
                  placeholder="Last Name"
                  width="100%"
                  value={formData.lastName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                />
              </Grid>
            </Grid.Container>
            
            <Spacer h={1} />
            
            <Input
              placeholder="Email"
              htmlType="email"
              width="100%"
              value={formData.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            
            <Spacer h={1} />
            
            <Grid.Container gap={1}>
              <Grid xs={12}>
                <Input
                  placeholder="Password"
                  htmlType="password"
                  width="100%"
                  value={formData.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </Grid>
              <Grid xs={12}>
                <Input
                  placeholder="Confirm Password"
                  htmlType="password"
                  width="100%"
                  value={formData.confirmPassword}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                />
              </Grid>
            </Grid.Container>
            
            <Spacer h={1} />
            
            <Grid.Container gap={1}>
              <Grid xs={12}>
                <Input
                  placeholder="Date of Birth"
                  htmlType="date"
                  width="100%"
                  value={formData.dob}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, dob: e.target.value })}
                  required
                />
              </Grid>
              <Grid xs={12}>
                <Input
                  placeholder="Mobile"
                  htmlType="tel"
                  width="100%"
                  value={formData.mobile}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, mobile: e.target.value })}
                  required
                />
              </Grid>
            </Grid.Container>
            
            <Spacer h={1} />
            
            <select
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #eaeaea',
                borderRadius: '6px',
                fontSize: '14px',
                backgroundColor: '#fff'
              }}
              value={formData.category}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, category: e.target.value })}
              required
            >
              <option value="PublicUser">Public User</option>
              <option value="Staff">Staff</option>
              <option value="Vendor">Vendor</option>
            </select>
            
            <Spacer h={1} />
            
            <Input
              placeholder="Address (Optional)"
              width="100%"
              value={formData.address}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, address: e.target.value })}
            />
            
            <Spacer h={1} />
            
            <Grid.Container gap={1}>
              <Grid xs={8}>
                <Input
                  placeholder="City (Optional)"
                  width="100%"
                  value={formData.city}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, city: e.target.value })}
                />
              </Grid>
              <Grid xs={8}>
                <Input
                  placeholder="Postal Code (Optional)"
                  width="100%"
                  value={formData.post}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, post: e.target.value })}
                />
              </Grid>
              <Grid xs={8}>
                <Input
                  placeholder="Country (Optional)"
                  width="100%"
                  value={formData.country}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, country: e.target.value })}
                />
              </Grid>
            </Grid.Container>
            
            <Spacer h={2} />
            
            <Button
              type="success"
              htmlType="submit"
              width="100%"
              loading={loading}
            >
              Create Account
            </Button>
          </form>
          
          <Spacer h={1} />
          
          <Text p style={{ textAlign: 'center', color: '#666' }}>
            Already have an account?{' '}
            <Button 
              auto 
              scale={0.8} 
              type="abort" 
              onClick={() => router.push('/login')}
            >
              Sign In
            </Button>
          </Text>
        </Card>
      </div>
    </div>
  )
}