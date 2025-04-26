import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This is a minimal middleware that just passes all requests through
// You can build upon this to add proper authentication later
export function middleware(request: NextRequest) {
  return NextResponse.next()
}

// See "Matching Paths" below to learn more about how the matcher works
export const config = {
  matcher: [
    // Optional: specify protected routes that require authentication
    // Example: '/dashboard/:path*',
    // For now, not protecting any routes
  ],
}