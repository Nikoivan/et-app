import { tourRepositories } from '@/entities/tour/repositories/tour';
import { Prisma } from '@prisma/client';
import { Either, left, right } from '@/shared/lib/either';
import { TourEntity, tourToTourEntity } from '@/entities/tour/domain';
import { CreateTourData, TourCardEntity } from '@/features/tour/domain';
import { PhotoDomain } from '@/entities/photo';
import { draftTourToTourCardEntity } from '@/widgets/tours/domain';
import { dbQueryUtils } from '@/shared/lib/db-client-utils';
import { Role } from '@/entities/user/domain';

type UserToursData = {
  authorId: number;
  role: string;
};

const tourCardsSelect = {
  id: true,
  title: true,
  price: true,
  rating: true,
  duration: true,
  mainPhotoId: true,
  photos: true
};

const getPopularTourCards = async (): Promise<TourCardEntity[]> => {
  const draftPopularTours = await tourRepositories.getStrictTours({
    where: {
      categories: {
        has: 'popular'
      }
    },
    select: tourCardsSelect,
    take: 4
  });

  return draftPopularTours.map(draftTourToTourCardEntity);
};

const getTourCards = async (
  params?: Prisma.TourFindManyArgs & { page?: number }
) => {
  const dbQueryParams = dbQueryUtils.getDbQueryParamsByPage<
    Prisma.TourInclude | undefined
  >(params);

  const draftTourCards = dbQueryParams
    ? await tourRepositories.getStrictTours({
        ...dbQueryParams,
        select: tourCardsSelect
      })
    : await tourRepositories.getStrictTours({
        select: tourCardsSelect
      });

  return draftTourCards.map(draftTourToTourCardEntity);
};

export const getTours = async (
  params?: Prisma.TourFindManyArgs & { page?: number }
) => {
  const dbQueryParams = dbQueryUtils.getDbQueryParamsByPage<
    Prisma.TourInclude | undefined
  >(params);

  return dbQueryParams
    ? tourRepositories.getStrictTours(dbQueryParams)
    : tourRepositories.getStrictTours();
};

const getUserTours = async ({
  authorId,
  role
}: UserToursData): Promise<Either<string, TourEntity[]>> => {
  const isSuperAdmin = role === Role.SUPER_ADMIN;
  const where: Prisma.TourWhereInput | undefined = isSuperAdmin
    ? undefined
    : { authorId };
  const tourIncludes: Prisma.TourInclude = { photos: true };

  const tours: Prisma.TourGetPayload<{
    include: {
      photos: true;
    };
  }>[] = await tourRepositories.getStrictTours({
    where,
    include: tourIncludes
  });

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

export const tourService = {
  getUserTours,
  createTour,
  getPopularTourCards,
  getTourCards,
  getTours
};
