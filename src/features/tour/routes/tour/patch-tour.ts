import { NextRequest } from 'next/server';
import { handleError, handleSuccess } from '@/shared/lib/response-utils';
import { UserDomain } from '@/entities/user';
import { editTourSchema } from '@/features/tour/lib/schemas/create-tour-schemas';
import { tourService } from '@/features/tour/services/tour-service';
import { sessionUtils } from '@/entities/user/lib/session-utils';
import { Tour } from '@prisma/client';

export async function patchTour(req: NextRequest): Promise<Response> {
  try {
    const session = await sessionUtils.getSession(
      req.cookies.get('session')?.value
    );

    const data = await req.json();

    const tourEntity = editTourSchema.safeParse(data);

    if (!tourEntity.success) {
      return handleError({ body: 'Ошибка формата полученных данных' });
    }

    if (
      session.role !== UserDomain.Role.SUPER_ADMIN &&
      tourEntity.data.authorId !== session.id
    ) {
      return handleError({
        body: 'У вас нет прав на редактирование этого тура'
      });
    }

    const { mainPhoto, photos, ...tour } = tourEntity.data;

    const patchedTour = await tourService.updateTour(tour as Tour);

    if (!patchedTour) {
      return handleError({ body: 'Ошибка изменения данных тура' });
    }

    return handleSuccess({ body: patchedTour });
  } catch (error) {
    console.error(error);

    return handleError({
      body: error instanceof Error ? error.message : 'Ошибка при удаление тура'
    });
  }
}
