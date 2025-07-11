import { NextRequest } from 'next/server';
import { handleError, handleSuccess } from '@/shared/lib/response-utils';
import { tourRepository } from '@/kernel/tour/repositories/tour';
import { Prisma } from '@prisma/client';
import { sessionService } from '@/entities/user/server';

export async function getUsersTours(req: NextRequest): Promise<Response> {
  const cookies = req.cookies.get('session')?.value;

  if (!cookies) {
    return handleError({ body: 'Ошибка верификации' });
  }

  const { session } = await sessionService.verifySession(cookies);

  if (!session) {
    return handleError({ body: 'Ошибка верификации' });
  }

  const userTours: Prisma.TourGetPayload<{
    include: {
      photos: true;
    };
    //TODO
    // select:
  }> = await tourRepository.getTours({ where: { authorId: session.id } });

  try {
    return handleSuccess({ body: 'testr' });
  } catch {
    return handleError({ body: 'Ошибка верификации' });
  }
}
