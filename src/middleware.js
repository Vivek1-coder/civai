import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
// export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/sign-up', '/', '/verify/:path*'],
};

export async function middleware(request) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // Redirect to dashboard if the user is already authenticated
  // and trying to access sign-in, sign-up, or home page
  if (
    token &&
    (url.pathname.startsWith('/login') ||
      url.pathname.startsWith('/sign-up') ||
      url.pathname.startsWith('/verify') ||
      url.pathname === '/')
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!token && (url.pathname.startsWith('/dashboard') || url.pathname.startsWith('/u') )) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  

  return NextResponse.next();
}