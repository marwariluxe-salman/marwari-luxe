import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Serve sitemap.xml with correct content type
  if (request.nextUrl.pathname === '/sitemap.xml') {
    const response = NextResponse.next()
    response.headers.set('Content-Type', 'application/xml')
    return response
  }
  
  // Add comprehensive security headers to all responses
  const response = NextResponse.next()
  
  // Essential Security Headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('X-Frame-Options', 'DENY')
  
  // Enhanced Content Security Policy to prevent XSS and code injection
  response.headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://pagead2.googlesyndication.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com https://res.cloudinary.com; connect-src 'self' https://www.google-analytics.com; frame-src 'self' https://www.googletagmanager.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;")
  
  // Additional Security Headers
  response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=(), interest-cohort=()')
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none')
  response.headers.set('Cross-Origin-Embedder-Policy', 'require-corp')
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin')
  response.headers.set('Cross-Origin-Resource-Policy', 'same-origin')
  
  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/',
    '/(about|products|blogs|tools|contact|checkout|categories/.*)',
    '/(legal/.*)',
    '/(tools/.*)',
    '/(products/.*)'
  ],
}