import { NextRequest } from 'next/server';
import { handleError, handleSuccess } from '@/shared/lib/response-utils';
import { sessionService } from '@/entities/user/server';
import { roleUtils } from '@/entities/user';
import { prepareDataUtils } from '@/features/tour/lib/prepare-data-utils';
import { getPhotoEntity } from '@/entities/photo/lib/photo-utils';
import { tourServices } from '@/features/tour/services/tour-services';
import { dbClient } from '@/shared/lib/db';

export async function postTour(req: NextRequest): Promise<Response> {
  try {
    const cookies = req.cookies.get('session')?.value;

    if (!cookies) {
      return handleError({ body: 'Ошибка верификации' });
    }

    const { session } = await sessionService.verifySession(cookies);

    if (!session) {
      return handleError({ body: 'Ошибка верификации' });
    }

    if (!roleUtils.userHasPermissionOn(session?.role, 'createTour')) {
      return handleError({ body: 'У вас нет полномочий на создание туров' });
    }

    const formData = await req.formData?.();
    const data = prepareDataUtils.getTourData(formData);

    if (!data) {
      return handleSuccess({
        body: 'Невозможно создать запись. Данные не валидны'
      });
    }

    const { title, mainPhoto, photos, ...rest } = data;

    const mainPhotoEntity = await getPhotoEntity({
      title,
      keywords: [],
      authorId: session.id,
      file: mainPhoto
    });

    console.log('mainPhotoEntity', mainPhotoEntity);

    if (!mainPhotoEntity) {
      return handleSuccess({
        body: 'Невозможно создать главное фото тура'
      });
    }

    const tour = await tourServices.createTour({
      authorId: session.id,
      ...rest,
      title,
      mainPhoto: mainPhotoEntity
    });

    console.log('tour', tour);

    if (tour) {
      dbClient.tour.delete({ where: { id: tour.id } });
    }

    // const eitherResult: Either<string, TourDomain.TourEntity[]> =
    //   await tourServices.crea(session.id);
    //
    // if (eitherResult.type === 'left') {
    //   return handleError({ body: eitherResult.error });
    // }

    return handleSuccess({ body: 'eitherResult.value' });
  } catch (e) {
    console.error(e);

    return handleError({ body: 'Catch' });
  }
}
