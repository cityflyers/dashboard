'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth/auth-context'
import { Navigation } from '@/components/layout/navigation'
import { Button, Input, Text, Card, Grid, Spacer, useToasts } from '@geist-ui/core'
import { supabase } from '@/lib/supabase/client'

export default function ProfilePage() {
  const { profile, loading, refreshProfile } = useAuth()
  const [updating, setUpdating] = useState(false)
  const [formData, setFormData] = useState({
    firstName: profile?.first_name || '',
    lastName: profile?.last_name || '',
    mobile: profile?.mobile || '',
    address: profile?.address || '',
    city: profile?.city || '',
    post: profile?.post || '',
    country: profile?.country || ''
  })
  
  const { setToast } = useToasts()

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
          <Text>Profile not found</Text>
        </div>
      </div>
    )
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdating(true)
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: formData.firstName,
          last_name: formData.lastName,
          mobile: formData.mobile,
          address: formData.address || null,
          city: formData.city || null,
          post: formData.post || null,
          country: formData.country || null
        })
        .eq('id', profile.id)
      
      if (error) throw error
      
      await refreshProfile()
      setToast({ text: 'Profile updated successfully!', type: 'success' })
    } catch (error: any) {
      setToast({ text: error.message || 'Update failed', type: 'error' })
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div>
      <Navigation />
      
      <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <Text h2 style={{ marginBottom: '2rem' }}>Profile Settings</Text>
        
        <Grid.Container gap={2}>
          <Grid xs={24} md={12}>
            <Card style={{ padding: '1.5rem', height: '100%' }}>
              <Text h4 style={{ marginBottom: '1rem' }}>Account Information</Text>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Text><strong>Email:</strong> {profile.email}</Text>
                <Text><strong>Date of Birth:</strong> {new Date(profile.dob).toLocaleDateString()}</Text>
                <Text><strong>Category:</strong> {profile.category}</Text>
                <Text><strong>Role:</strong> {profile.role}</Text>
                <Text><strong>Member Since:</strong> {new Date(profile.created_at).toLocaleDateString()}</Text>
              </div>
            </Card>
          </Grid>
          
          <Grid xs={24} md={12}>
            <Card style={{ padding: '1.5rem' }}>
              <Text h4 style={{ marginBottom: '1rem' }}>Update Profile</Text>
              
              <form onSubmit={handleUpdate}>
                <Grid.Container gap={1}>
                  <Grid xs={12}>
                    <Input
                      placeholder="First Name"
                      width="100%"
                      value={formData.firstName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                      {...({} as any)}
                    />
                  </Grid>
                  <Grid xs={12}>
                    <Input
                      placeholder="Last Name"
                      width="100%"
                      value={formData.lastName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                      {...({} as any)}
                    />
                  </Grid>
                </Grid.Container>
                
                <Spacer h={1} />
                
                <Input
                  placeholder="Mobile"
                  htmlType="tel"
                  width="100%"
                  value={formData.mobile}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, mobile: e.target.value })}
                  required
                  {...({} as any)}
                />
                
                <Spacer h={1} />
                
                <Input
                  placeholder="Address"
                  width="100%"
                  value={formData.address}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, address: e.target.value })}
                  {...({} as any)}
                />
                
                <Spacer h={1} />
                
                <Grid.Container gap={1}>
                  <Grid xs={8}>
                    <Input
                      placeholder="City"
                      width="100%"
                      value={formData.city}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, city: e.target.value })}
                      {...({} as any)}
                    />
                  </Grid>
                  <Grid xs={8}>
                    <Input
                      placeholder="Postal Code"
                      width="100%"
                      value={formData.post}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, post: e.target.value })}
                      {...({} as any)}
                    />
                  </Grid>
                  <Grid xs={8}>
                    <Input
                      placeholder="Country"
                      width="100%"
                      value={formData.country}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, country: e.target.value })}
                      {...({} as any)}
                    />
                  </Grid>
                </Grid.Container>
                
                <Spacer h={2} />
                
                <Button
                  type="success"
                  htmlType="submit"
                  width="100%"
                  loading={updating}
                  {...({} as any)}
                >
                  Update Profile
                </Button>
              </form>
            </Card>
          </Grid>
        </Grid.Container>
      </div>
    </div>
  )
}