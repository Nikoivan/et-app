import { SessionEntity } from '@/entities/user/domain';
import { sessionService } from '@/entities/user/services/session';

export const getCurrentSession = async (
  cookies: string
): Promise<SessionEntity | null> => {
  const { isAuth, session } = await sessionService.verifySession(cookies);

  return isAuth ? session : null;
};
