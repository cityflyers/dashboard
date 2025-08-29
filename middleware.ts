import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Completely disabled middleware for debugging
  return NextResponse.next()
}

// Temporarily disable all routes
export const config = {
  matcher: []
}