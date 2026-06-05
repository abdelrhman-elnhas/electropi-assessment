import { getToken } from "next-auth/jwt";

import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isAuth = await getToken({ req: request });
    const protectedRoutes = ['/profile', '/cart', 'wishlist'];
    const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
    const isAuthRoute = pathname.startsWith('/auth');
    const isApiAuthRoute = pathname.startsWith('/api/auth');

    if (isApiAuthRoute) {
        return NextResponse.next();
    }

    if (!isAuth && isProtectedRoute) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    if (isAuth && isAuthRoute) {
        return NextResponse.redirect(new URL('/', request.url));
    }
};

export const config = {
    matcher: ['/profile/:path*', '/auth/:path*'],
}