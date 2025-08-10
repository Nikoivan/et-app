import { NextRequest } from 'next/server';
import { handleError, handleSuccess } from '@/shared/lib/response-utils';
import { sessionService } from '@/entities/user/server';
import { TourDomain } from '@/entities/tour/server';
import { tourServices } from '@/features/tour/services/tour-services';
import { Either } from '@/shared/lib/either';

export async function getUserTours(req: NextRequest): Promise<Response> {
  try {
    const cookies = req.cookies.get('session')?.value;

    if (!cookies) {
      return handleError({ body: 'Cookie not found' });
    }

    const { session } = await sessionService.verifySession(cookies);

    if (!session) {
      return handleError({ body: 'Session not found' });
    }

    const eitherResult: Either<string, TourDomain.TourEntity[]> =
      await tourServices.getUserTours(session.id);

    if (eitherResult.type === 'left') {
      return handleError({ body: eitherResult.error });
    }

    return handleSuccess({ body: eitherResult.value });
  } catch {
    return handleError({ body: 'Ошибка верификации' });
  }
}
