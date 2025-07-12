import { Prisma } from '@prisma/client';
import { objectUtils } from '@/shared/lib/object-utils';
import { WithoutNull } from '@/shared/model/types';
import { placeEntitySchema } from '@/entities/tour/lib/validation-schemas';

type PhotoEntity = {
  id: number;
  title: string;
  source: string;
  authorId: number;
};

type PlaceEntity = {
  id: number;
  title: string;
  coordinates: [number, number];
  yandexLink: string;
};

export type TourEntity = {
  id: number;
  title: string;
  description: string;
  mainPhoto: PhotoEntity;
  content: string;
  price: number;
  duration: number;
  categories: string[];
  photos: PhotoEntity[];
  rating?: number;
  descriptionText?: string;
  startPlace?: PlaceEntity;
};

export function tourToTourEntity(
  tour: Prisma.TourGetPayload<{
    include: {
      photos: true;
    };
  }>
): WithoutNull<TourEntity> {
  const { mainPhotoId, photos, startPlace, ...rest } = tour;

  const mainPhoto = photos.find(photo => photo.id === mainPhotoId);

  if (!mainPhoto) {
    throw new Error('Error of main photo id: ' + mainPhotoId);
  }

  const tourEntity = objectUtils.makeWithoutNull(rest);
  const checkedStartPlace = placeEntitySchema.safeParse(startPlace);

  return {
    ...tourEntity,
    startPlace: checkedStartPlace.success ? checkedStartPlace.data : undefined,
    mainPhoto,
    photos
  } as WithoutNull<TourEntity>;
}
