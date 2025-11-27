import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import {
  checkRateLimitInMemory,
  startRateLimitCleanup
} from '@/shared/lib/security/rate-limit-memory';

const ALLOWED_ORIGINS = ['https://ay-petry.ru', 'http://localhost:3000'];
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 60;
const PROTECTED_API_PREFIX = process.env.API_ROUTE || '/api/';

startRateLimitCleanup({
  intervalMs: 5 * 60_000,
  maxAgeMs: 10 * 60_000
});

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

  const key = `ip:${ip}:${pathname}`;

  const { isLimited, remaining, resetAt } = checkRateLimitInMemory({
    key,
    windowMs: RATE_LIMIT_WINDOW_MS,
    maxRequests: RATE_LIMIT_MAX
  });

  if (isLimited) {
    return new NextResponse(
      JSON.stringify({
        error: 'Too many requests',
        rateLimit: {
          remaining,
          resetAt
        }
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  if (!pathname.startsWith(PROTECTED_API_PREFIX)) {
    return NextResponse.next();
  }

  const origin = req.headers.get('origin');
  const referer = req.headers.get('referer');
  const xApiKey = req.headers.get('X-API-KEY');

  const isSameOrigin =
    origin === null &&
    referer !== null &&
    ALLOWED_ORIGINS.some(allowed => referer.startsWith(allowed));
  const isAllowedOrigin = origin !== null && ALLOWED_ORIGINS.includes(origin);
  const xApiKeyValid = xApiKey === process.env.X_API_KEY;

  if (!xApiKeyValid || (!isAllowedOrigin && !isSameOrigin)) {
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
  res.headers.set('X-RateLimit-Limit', String(RATE_LIMIT_MAX));
  res.headers.set('X-RateLimit-Remaining', String(remaining));
  res.headers.set('X-RateLimit-Reset', resetAt.toISOString());

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
