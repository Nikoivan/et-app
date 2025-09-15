import { NextRequest } from 'next/server';
import { handleError, handleSuccess } from '@/shared/lib/response-utils';
import { TourDomain } from '@/entities/tour/server';
import { tourService } from '@/features/tour/server';
import { TourCardEntity } from '@/features/tour';

export async function getTours(req: NextRequest): Promise<Response> {
  try {
    const isTourCards = req.nextUrl.searchParams.get('cards');

    const getFn = isTourCards ? tourService.getTourCards : tourService.getTours;

    const result: TourCardEntity[] | TourDomain.TourEntity[] =
      (await getFn()) as TourCardEntity[] | TourDomain.TourEntity[];

    if (!result) {
      return handleError({ body: 'Ошибка получения туров' });
    }

    return handleSuccess({ body: result });
  } catch {
    return handleError({ body: 'Ошибка при получение карточек туров' });
  }
}
