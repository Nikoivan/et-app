import { tourRepositories } from '@/entities/tour/repositories/tour';
import { Prisma } from '@prisma/client';
import { Either, left, right } from '@/shared/lib/either';
import { TourEntity, tourToTourEntity } from '@/entities/tour/domain';
import { CreateTourData } from '@/features/tour/domain';
import { PhotoDomain } from '@/entities/photo';

const getUserTours = async (
  authorId: number
): Promise<Either<string, TourEntity[]>> => {
  const where: Prisma.TourWhereInput = { authorId };
  const tourIncludes: Prisma.TourInclude = { photos: true };

  const tours: Prisma.TourGetPayload<{
    include: {
      photos: true;
    };
  }>[] = await tourRepositories.getTours({ where, include: tourIncludes });

  if (!tours) {
    return left('Ошибка при получение туров');
  }

  const tourEntities: TourEntity[] = tours.length
    ? tours.map(tourToTourEntity)
    : [];

  return right(tourEntities);
};

const createTour = async (
  data: Omit<CreateTourData, 'mainPhoto' | 'photos'> & {
    authorId: number;
    mainPhoto: Omit<PhotoDomain.PhotoEntity, 'id'>;
    photos?: Omit<PhotoDomain.PhotoEntity, 'id'>[];
  }
): Promise<TourEntity | null> => {
  const tour = await tourRepositories.createTour(data);

  return tour ? tourToTourEntity(tour) : null;
};

export const tourServices = { getUserTours, createTour };
