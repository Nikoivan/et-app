import { NextRequest } from 'next/server';

import { activityServices } from '@/features/activities/services/activity-services';
import { sessionService } from '@/entities/user/server';
import { ActivityDomain } from '@/entities/activity';
import { Either } from '@/shared/lib/either';
import { handleError, handleSuccess } from '@/shared/lib/response-utils';

export async function getUserActivities(req: NextRequest): Promise<Response> {
  try {
    const cookies = req.cookies.get('session')?.value;

    if (!cookies) {
      return handleError({ body: 'Cookie not found' });
    }

    const { session } = await sessionService.verifySession(cookies);

    if (!session) {
      return handleError({ body: 'Session not found' });
    }

    const eitherResult: Either<string, ActivityDomain.ActivityEntity[]> =
      await activityServices.getUserActivities(session.id);

    if (eitherResult.type === 'left') {
      return handleError({ body: eitherResult.error });
    }

    return handleSuccess({ body: eitherResult.value });
  } catch {
    return handleError({ body: 'Ошибка верификации' });
  }
}
