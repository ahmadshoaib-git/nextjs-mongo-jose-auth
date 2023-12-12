import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const dashboardRoutes = pathname === '/';
    const isLogin = pathname === '/login';
    const isRegister = pathname === '/register';
    const isVerifyOtpRoute = pathname === '/verifyOtp';
    const hasToken = request.cookies.get('access_token')?.value || undefined;
    const hasTemporaryToken = request.cookies.get('temporary-token')?.value || undefined;

    if (dashboardRoutes && !hasToken) return NextResponse.redirect(new URL('/login', request.url));
    if (dashboardRoutes && hasTemporaryToken) return NextResponse.redirect(new URL('/login', request.url));
    if (isVerifyOtpRoute && !hasTemporaryToken && !hasToken) return NextResponse.redirect(new URL('/login', request.url));
    if (hasTemporaryToken) {
        if (isLogin) return NextResponse.redirect(new URL('/verifyOtp', request.url));
        if (dashboardRoutes) return NextResponse.redirect(new URL('/login', request.url));
    }
    if (hasToken) {
        if (isVerifyOtpRoute) return NextResponse.redirect(new URL('/', request.url));
        if (isLogin) return NextResponse.redirect(new URL('/', request.url));
    }
    if (isRegister && (hasToken || hasTemporaryToken)) return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
    matcher: ['/', '/register', '/login', '/verifyOtp'],
};

