import { Either, left, right } from '@/shared/lib/either';
import { tourRepository } from '@/kernel/tour/repositories/tour';
import { TourKernel, tourToKernelTour } from '@/kernel/tour/domain';
import { PageMetaData } from '@/shared/model/types';
import { TourWR } from '@/kernel/tour/model/types';

async function getTourById(id: number): Promise<Either<string, TourKernel>> {
  const tour = await tourRepository.getTour({ where: { id } });

  if (!tour) {
    return left('Тур с указанным идентификатором не найден');
  }

  const kernalTour = tourToKernelTour(tour as TourWR);

  return right(kernalTour);
}

async function getTourBySlug(
  slug: string
): Promise<Either<string, TourKernel>> {
  const tour = await tourRepository.getTour({
    where: { slug },
    include: {
      reviews: true,
      photos: true,
      activities: true
    }
  });

  if (!tour) {
    return left('Тур с указанным слоганом не найден');
  }

  return right(tourToKernelTour(tour as TourWR));
}

async function getTourMetaData(
  slug: string
): Promise<Either<string, PageMetaData>> {
  const tour = await tourRepository.getTour<{
    select: {
      title: true;
      description: true;
      metaTitle: true;
      metaDescription: true;
      metaKeywords: true;
    };
  }>({ where: { slug } });

  if (!tour) {
    return left('Тур с указанным слоганом не найден');
  }

  return right({
    title: tour.metaTitle || tour.title,
    description: tour.metaDescription || tour.description,
    keywords: tour.metaKeywords
  });
}

export const tourServices = { getTourBySlug, getTourMetaData };
