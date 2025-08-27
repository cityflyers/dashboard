import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Protected routes that require authentication
  const protectedRoutes = ['/dashboard', '/profile', '/admin', '/staff', '/vendor', '/user']
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )

  // Redirect to login if accessing protected route without session
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If user is authenticated, check role-based access
  if (session && isProtectedRoute) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, category')
      .eq('id', session.user.id)
      .single()

    if (profile) {
      const { pathname } = request.nextUrl
      
      // Role-based route protection
      if (pathname.startsWith('/admin') && profile.role !== 'SuperAdmin') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
      
      if (pathname.startsWith('/staff') && profile.category !== 'Staff' && profile.role !== 'SuperAdmin') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
      
      if (pathname.startsWith('/vendor') && profile.category !== 'Vendor' && profile.role !== 'SuperAdmin') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
      
      if (pathname.startsWith('/user') && profile.category !== 'PublicUser' && profile.role !== 'SuperAdmin') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    }
  }

  // Redirect authenticated users away from auth pages
  if (session && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return res
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/admin/:path*', '/staff/:path*', '/vendor/:path*', '/user/:path*', '/login', '/register']
}