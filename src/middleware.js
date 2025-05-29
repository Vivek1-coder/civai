import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import jwt from 'jsonwebtoken'; // You forgot to import this

// Mock session validation (replace with your actual logic)
async function isSessionValidForUser(sessionID, userId) {
  // Dummy logic: sessionID must equal reversed userId
  return sessionID && userId && sessionID === userId.split('').reverse().join('');
}

export async function middleware(req) {
  const url = req.nextUrl;

  // 1. Check token & session cookies manually for protected routes (/dashboard, /u)
  if (url.pathname.startsWith('/dashboard') || url.pathname.startsWith('/u')) {
    const token = req.cookies.get('authToken')?.value;
    const sessionID = req.cookies.get('sessionID')?.value;

    if (!token || !sessionID) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Verify token manually (to check expiry & get userId)
    try {
      const secret = process.env.JWT_SECRET;
      const payload = jwt.verify(token, secret);
      const userId = payload.userId;

      if (!userId) {
        return NextResponse.redirect(new URL('/login', req.url));
      }

      const validSession = await isSessionValidForUser(sessionID, userId);
      if (!validSession) {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    } catch (error) {
      console.log('Token verification failed:', error.message);
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // 2. Use next-auth's getToken to check if user is authenticated for public routes
  const token = await getToken({ req });
  if (
    token &&
    (url.pathname.startsWith('/login') ||
      url.pathname.startsWith('/sign-up') ||
      url.pathname.startsWith('/verify') ||
      url.pathname === '/')
  ) {
    // Authenticated user should not access auth pages, redirect to dashboard
    return NextResponse.redirect(new URL('/u', req.url));
  }

  if (!token && (url.pathname.startsWith('/dashboard') || url.pathname.startsWith('/u'))) {
    // Unauthenticated users trying to access protected routes redirect to home
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/u/:path*', '/login', '/sign-up', '/', '/verify/:path*'],
};
