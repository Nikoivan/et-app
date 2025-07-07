'use client';

import { useEffect, useState } from 'react';
import { SessionEntity } from '@/entities/user/domain';
import { getSessionRequest } from '@/entities/user/api/session-requests';

export function useUserSession() {
  const [session, setSession] = useState<SessionEntity | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const { session: newSession } = await getSessionRequest();

      if (session !== newSession) {
        setSession(newSession);
      }

      setLoading(false);
    })();
  }, []);

  return { session, isLoading };
}
