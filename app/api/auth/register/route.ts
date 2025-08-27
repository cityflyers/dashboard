import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'
import { CATEGORY_ROLES, UserCategory } from '@/types/database'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      firstName,
      lastName,
      email,
      password,
      dob,
      mobile,
      category,
      address,
      city,
      post,
      country
    } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !dob || !mobile || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Register user with Supabase Auth
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      )
    }

    if (!data.user) {
      return NextResponse.json(
        { error: 'Registration failed' },
        { status: 400 }
      )
    }

    // Get default role for category
    const defaultRole = CATEGORY_ROLES[category as UserCategory][0]

    // Create profile record
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: data.user.id,
        first_name: firstName,
        last_name: lastName,
        email,
        dob,
        mobile,
        category,
        role: defaultRole,
        address: address || null,
        city: city || null,
        post: post || null,
        country: country || null,
      })

    if (profileError) {
      return NextResponse.json(
        { error: profileError.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      user: data.user,
      message: 'Registration successful'
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}