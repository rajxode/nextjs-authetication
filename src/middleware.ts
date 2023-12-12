
// request and response
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

    // getting current path name
    const path = request.nextUrl.pathname;

    // check whether path is public or not
    const isPublicPath = path === '/login' || path === '/signup';

    // get the token from cookies
    const token = request.cookies.get('token')?.value || '';

    // if path is public and token is present
    // redirect user to profile page
    if( isPublicPath && token ){
        return NextResponse.redirect(new URL('/profile', request.url));
    }


    // if token is not present, user in unauthorized for private paths
    // redirect to login
    if(!isPublicPath && !token ){
        return NextResponse.redirect(new URL('/login', request.url));
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/', 
    '/login',
    '/profile/:path*',
    '/signup'],
}