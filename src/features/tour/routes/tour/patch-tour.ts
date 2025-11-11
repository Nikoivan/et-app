import { NextRequest } from 'next/server';
import { handleError, handleSuccess } from '@/shared/lib/response-utils';
import { sessionService } from '@/entities/user/services/session';
import { UserDomain } from '@/entities/user';
import { editTourSchema } from '@/features/tour/lib/schemas/create-tour-schemas';
import { tourService } from '@/features/tour/services/tour-service';
import { Tour } from '@prisma/client';

export async function patchTour(req: NextRequest): Promise<Response> {
  try {
    const cookies = req.cookies.get('session')?.value;

    if (!cookies) {
      return handleError({ body: 'Ошибка верификации. Cookies lost' });
    }

    const { session } = await sessionService.verifySession(cookies);

    if (!session) {
      return handleError({ body: 'Ошибка верификации' });
    }

    const data = await req.json();

    const tourEntity = editTourSchema.safeParse(data);

    if (!tourEntity.success) {
      return handleError({ body: 'Ошибка формата полученных данных' });
    }

    const tour = await tourService.getTour(tourEntity.data.id, {
      authorId: true
    });

    if (
      session.role !== UserDomain.Role.SUPER_ADMIN &&
      tour?.authorId !== session.id
    ) {
      return handleError({
        body: 'У вас нет прав на редактирование этого тура'
      });
    }

    const patchedTour = await tourService.updateTour(
      tourEntity as unknown as Tour
    );

    if (!patchedTour) {
      return handleError({ body: 'Ошибка при удаление тура' });
    }

    return handleSuccess({ body: patchedTour });
  } catch (error) {
    console.error(error);

    return handleError({ body: 'Ошибка при удаление тура' });
  }
}
