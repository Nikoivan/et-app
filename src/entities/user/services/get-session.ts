import { NextRequest } from 'next/server';

import { SessionEntity } from '@/entities/user/domain';
import { sessionService } from '@/entities/user/services/session';

export async function getSession(
  req: NextRequest
): Promise<{ isAuth: boolean; session: SessionEntity | null }> {
  const cookies = req.cookies.toString();

  return sessionService.verifySession(cookies);
}
