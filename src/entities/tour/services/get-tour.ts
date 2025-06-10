import { tourRepository } from '@/entities/tour/repositories/tour';
import { Either, left, right } from '@/shared/lib/either';
import { Tour } from '@prisma/client';

async function getTourById(id: number): Promise<Either<string, Tour>> {
  const tour = await tourRepository.getTour({ id });

  if (!tour) {
    return left('Тур с указанным идентификатором не найден');
  }

  //TODO: возвращать чистый TourEntity

  return right(tour);
}

export const tourServices = { getTourById };
