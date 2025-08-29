'use client'

import { useState } from 'react'
import { Navigation } from '@/components/layout/navigation'
import { Text, Card, Spacer, useToasts } from '@geist-ui/core'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  
  const router = useRouter()
  const { setToast } = useToasts()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })
      
      if (error) throw error
      
      if (data.user) {
        setToast({ text: 'Login successful!', type: 'success' })
        router.push('/dashboard')
      }
    } catch (error: any) {
      setToast({ text: error.message || 'Login failed', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Navigation />
      
      <div style={{ padding: '4rem 2rem', maxWidth: '400px', margin: '0 auto' }}>
        <Card style={{ padding: '2rem' }}>
          <Text h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Sign In</Text>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #eaeaea',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            />
            
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #eaeaea',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            />
            
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: loading ? '#ccc' : '#0070f3',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginTop: '1rem'
              }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          
          <Text p style={{ textAlign: 'center', color: '#666', marginTop: '1rem' }}>
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => router.push('/register')}
              style={{
                background: 'none',
                border: 'none',
                color: '#0070f3',
                cursor: 'pointer',
                textDecoration: 'underline',
                fontSize: 'inherit'
              }}
            >
              Sign Up
            </button>
          </Text>
        </Card>
      </div>
    </div>
  )
}