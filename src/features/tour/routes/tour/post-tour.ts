import { NextRequest } from 'next/server';
import { handleError, handleSuccess } from '@/shared/lib/response-utils';
import { sessionService } from '@/entities/user/server';
import { roleUtils } from '@/entities/user';
import { prepareDataUtils } from '@/features/tour/lib/prepare-data-utils';

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

    if (!roleUtils.userHasPermissionOn(session?.role, 'dashboard')) {
      return handleError({ body: 'У вас нет полномочий на создание туров' });
    }

    const formData = await req.formData();
    const data = prepareDataUtils.getTourData(formData);

    if (!data) {
      return handleSuccess({
        body: 'Невозможно создать запись. Данные не валидны'
      });
    }

    console.log('data', data);

    // const eitherResult: Either<string, TourDomain.TourEntity[]> =
    //   await tourServices.crea(session.id);
    //
    // if (eitherResult.type === 'left') {
    //   return handleError({ body: eitherResult.error });
    // }

    return handleSuccess({ body: 'eitherResult.value' });
  } catch {
    return handleError({ body: 'Ошибка верификации' });
  }
}
