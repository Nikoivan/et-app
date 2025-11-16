import { NextRequest } from 'next/server';

import { handleError, handleSuccess } from '@/shared/lib/response-utils';
import { roleUtils } from '@/entities/user';
import { prepareDataUtils } from '@/features/tour/lib/prepare-data-utils';

import { tourService } from '@/features/tour/services/tour-service';
import { PhotoDomain } from '@/entities/photo';
import { sessionUtils } from '@/entities/user/lib/session-utils';
import { serverPhotoUtils } from '@/entities/photo/server';
import { patchTourSchema } from '@/features/tour/lib/schemas/create-tour-schemas';
import { Role } from '@/entities/user/domain';

export async function patchTour(req: NextRequest): Promise<Response> {
  try {
    const session = await sessionUtils.getSession(
      req.cookies.get('session')?.value
    );

    if (!roleUtils.userHasPermissionOn(session?.role, 'updateTour')) {
      return handleError({ body: 'У вас нет полномочий на создание туров' });
    }

    const formData = await req.formData?.();
    const data = prepareDataUtils.getEditTourData(formData);
    const dataEntity = patchTourSchema.safeParse(data);

    if (!data || !dataEntity.success) {
      return handleError({
        body: 'Невозможно обновить запись. Данные не валидны'
      });
    }

    const { title, authorId, ...rest } = dataEntity.data;

    if (session.role !== Role.SUPER_ADMIN) {
    }

    const mainPhotoEntity =
      'mainPhoto' in dataEntity.data &&
      dataEntity.data.mainPhoto &&
      dataEntity.data.mainPhoto.length
        ? await serverPhotoUtils.getPhotoEntity({
            title,
            keywords: [],
            authorId: session.id,
            file: dataEntity.data.mainPhoto[0]
          })
        : undefined;

    const photosEntities =
      'photos' in dataEntity.data && dataEntity.data.photos?.length
        ? await Promise.all(
            dataEntity.data.photos
              ?.map(
                async file =>
                  await serverPhotoUtils.getPhotoEntity({
                    file,
                    authorId: session.id,
                    keywords: []
                  })
              )
              .filter(Boolean)
          )
        : undefined;

    const tourEditData = { authorId, ...rest };

    if (!!mainPhotoEntity) {
      tourEditData.mainPhoto = mainPhotoEntity;
    }

    const tour = await tourService.updateTour({
      authorId,
      ...rest,
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

// export async function patchTour(req: NextRequest): Promise<Response> {
//   try {
//     const session = await sessionUtils.getSession(
//       req.cookies.get('session')?.value
//     );
//
//     const data = await req.json();
//
//     const tourEntity = editTourSchema.safeParse(data);
//
//     if (!tourEntity.success) {
//       return handleError({ body: 'Ошибка формата полученных данных' });
//     }
//
//     if (
//       session.role !== UserDomain.Role.SUPER_ADMIN &&
//       tourEntity.data.authorId !== session.id
//     ) {
//       return handleError({
//         body: 'У вас нет прав на редактирование этого тура'
//       });
//     }
//
//     const { mainPhoto, photos, ...tour } = tourEntity.data;
//
//     const patchedTour = await tourService.updateTour(tour as Tour);
//
//     if (!patchedTour) {
//       return handleError({ body: 'Ошибка изменения данных тура' });
//     }
//
//     return handleSuccess({ body: patchedTour });
//   } catch (error) {
//     console.error(error);
//
//     return handleError({
//       body: error instanceof Error ? error.message : 'Ошибка при удаление тура'
//     });
//   }
// }
