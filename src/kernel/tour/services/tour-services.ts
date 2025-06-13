import { Either, left, right } from '@/shared/lib/either';
import { tourRepository } from '@/kernel/tour/repositories/tour';
import { TourKernel, tourToKernelTour } from '@/kernel/tour/domain';

async function getTourById(id: number): Promise<Either<string, TourKernel>> {
  const tour = await tourRepository.getTour({ id });

  if (!tour) {
    return left('Тур с указанным идентификатором не найден');
  }

  const kernalTour = tourToKernelTour(tour);

  return right(kernalTour);
}

export const tourServices = { getTourById };
