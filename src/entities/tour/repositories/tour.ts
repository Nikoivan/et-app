import { Prisma } from '@prisma/client';
import { dbClient } from '@/shared/lib/db';
import { CreateTourData } from '@/features/tour/domain';
import { PhotoDomain } from '@/entities/photo';

type Params<T extends Prisma.TourInclude | undefined = undefined> = {
  where: Prisma.TourWhereInput;
  include?: T;
  select?: Prisma.TourSelect;
  orderBy?: Prisma.TourOrderByWithRelationInput;
};

const getTours = <TInclude extends Prisma.TourInclude | undefined = undefined>(
  params: Params<TInclude>
): Promise<Prisma.TourGetPayload<{ include: TInclude }>[]> =>
  dbClient.tour.findMany(params) as Promise<
    Prisma.TourGetPayload<{ include: TInclude }>[]
  >;

const createTour = async (
  data: Omit<CreateTourData, 'mainPhoto' | 'photos'> & {
    authorId: number;
    mainPhoto: Omit<PhotoDomain.PhotoEntity, 'id'>;
    photos?: Omit<PhotoDomain.PhotoEntity, 'id'>[];
  }
): Promise<Prisma.TourGetPayload<{
  include: {
    photos: true;
  };
}> | null> =>
  dbClient.$transaction(async prisma => {
    const {
      mainPhoto: mainPhotoEntity,
      photos: photosEntities,
      ...rest
    } = data;
    const mainPhoto = await prisma.photo.create({ data: mainPhotoEntity });

    if (!mainPhoto) {
      throw new Error('Ошибка при создание основного фото тура');
    }

    return prisma.tour.create({
      data: {
        ...rest,
        mainPhotoId: mainPhoto.id,
        photos: {
          create: photosEntities
        }
      },
      include: {
        photos: true
      }
    });
  });

export const tourRepositories = { getTours, createTour };
