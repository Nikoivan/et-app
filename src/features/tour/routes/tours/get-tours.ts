import { NextRequest } from 'next/server';
import { handleError, handleSuccess } from '@/shared/lib/response-utils';
import { TourDomain } from '@/entities/tour/server';

import { Either } from '@/shared/lib/either';
import { tourService } from '@/features/tour/server';

export async function getTours(req: NextRequest): Promise<Response> {
  try {
    const isTourCards = req.nextUrl.searchParams.get('cards');

    const getFn = isTourCards ? tourService.getTourCards : tourService.getTours;

    const eitherResult: Either<string, TourDomain.TourEntity[]> = await getFn();

    if (eitherResult.type === 'left') {
      return handleError({ body: eitherResult.error });
    }

    return handleSuccess({ body: eitherResult.value });
  } catch {
    return handleError({ body: 'Ошибка при получение карточек туров' });
  }
}
