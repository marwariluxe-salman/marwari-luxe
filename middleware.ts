import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Serve sitemap.xml with correct content type
  if (request.nextUrl.pathname === '/sitemap.xml') {
    const response = NextResponse.next()
    response.headers.set('Content-Type', 'application/xml')
    return response
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/sitemap.xml'],
}