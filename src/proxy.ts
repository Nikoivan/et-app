import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const ALLOWED_ORIGINS = ['https://ay-petry.ru', 'http://localhost:3000'];

const PROTECTED_API_PREFIX = process.env.API_ROUTE || '/api/';

export function proxy(req: NextRequest) {
  const url = req.nextUrl;
  const { pathname } = url;

  if (!pathname.startsWith(PROTECTED_API_PREFIX)) {
    return NextResponse.next();
  }

  const origin = req.headers.get('origin');
  const referer = req.headers.get('referer');

  const isSameOrigin =
    origin === null &&
    referer !== null &&
    ALLOWED_ORIGINS.some(allowed => referer.startsWith(allowed));

  const isAllowedOrigin = origin !== null && ALLOWED_ORIGINS.includes(origin);

  if (!isAllowedOrigin && !isSameOrigin) {
    return new NextResponse(JSON.stringify({ error: 'Origin not allowed' }), {
      status: 403,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  const res = NextResponse.next();

  const corsOrigin =
    origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];

  res.headers.set('Access-Control-Allow-Origin', corsOrigin);
  res.headers.set(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );
  res.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-API-KEY'
  );
  res.headers.set('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: res.headers
    });
  }

  return res;
}

export const config = {
  matcher: ['/api/:path*']
};
