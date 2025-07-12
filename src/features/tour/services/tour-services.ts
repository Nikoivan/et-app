import { tourRepositories } from '@/entities/tour/repositories/tour';
import { Prisma } from '@prisma/client';
import { Either, left, right } from '@/shared/lib/either';
import { TourEntity, tourToTourEntity } from '@/entities/tour/domain';

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

export const tourServices = { getUserTours };
