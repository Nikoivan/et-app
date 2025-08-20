import { NextRequest } from 'next/server';

import { handleError, handleSuccess } from '@/shared/lib/response-utils';
import { sessionService } from '@/entities/user/server';
import { roleUtils } from '@/entities/user';
import { prepareDataUtils } from '@/features/tour/lib/prepare-data-utils';
import { getPhotoEntity } from '@/entities/photo/lib/photo-utils';
import { tourServices } from '@/features/tour/services/tour-services';
import { PhotoDomain } from '@/entities/photo';

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

    if (!mainPhotoEntity) {
      return handleSuccess({
        body: 'Невозможно создать главное фото тура'
      });
    }

    const photosEntities = photos?.length
      ? await Promise.all(
          photos
            ?.map(
              async file =>
                await getPhotoEntity({
                  file,
                  authorId: session.id,
                  keywords: []
                })
            )
            .filter(Boolean)
        )
      : undefined;

    const tour = await tourServices.createTour({
      authorId: session.id,
      ...rest,
      title,
      mainPhoto: mainPhotoEntity,
      photos: photosEntities as Omit<PhotoDomain.PhotoEntity, 'id'>[]
    });

    if (!tour) {
      return handleError({ body: 'Ошибка. Не удалось создать тур' });
    }

    return handleSuccess({ body: tour });
  } catch (e) {
    console.error(e);

    return handleError({ body: 'Catch' });
  }
}
