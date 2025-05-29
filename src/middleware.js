import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(req) {
const { pathname } = req.nextUrl;
const protectedRoutes = ['/u', '/dashboard'];
const authRoutes = ['/login', '/sign-up'];

if (protectedRoutes.some((route) => pathname.startsWith(route))) {
const token = req.cookies.get('auth'); // No .value needed
console.log("HIi");
console.log("Cookies:", req.cookies);
console.log("Token:", token);

    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
      // Verify token and check expiration
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      
      // Optional: Add DB check for valid sessions here
      // Example: await validateSessionInDB(payload.userId, token);

      return NextResponse.next();
    } catch (err) {
      console.error('JWT verification failed:', err.message);
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // ─── Auth Routes: Redirect if Logged In ────────────────
  const token = req.cookies.get('auth')?.value;
  if (token && authRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/u', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/sign-up', '/u/:path*', '/dashboard/:path*'],
};