import { tourRepositories } from '@/entities/tour/repositories/tour';
import { Prisma } from '@prisma/client';
import { Either, left, right } from '@/shared/lib/either';
import { TourEntity } from '@/entities/tour/domain';

type TourWithPhotos = Prisma.TourGetPayload<{
  include: {
    photos: true;
  };
}>;

async function getUserTours(
  authorId: number
): Promise<Either<string, TourEntity[]>> {
  const where: Prisma.TourWhereInput = { authorId };
  const tourIncludes: Prisma.TourInclude = { photos: true };

  const tours: Prisma.TourGetPayload<{
    include: {
      photos: true;
    };
  }>[] = await tourRepositories.getTours(where, tourIncludes);

  if (!tours) {
    return left('Ошибка при получение туров');
  }
  //типизация вложенных photos
  //тут остановились

  const tourEntities: TourEntity[] = tours.length ? tours.map() : [];

  return right(tours);
}
