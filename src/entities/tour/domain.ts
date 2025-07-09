import { Tour } from '@prisma/client';

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
  yandexLik: string;
};

export type TourEntity = {
  id: number;
  title: string;
  description: string;
  mainPhoto: PhotoEntity;
  price: number;
  duration: number;
  categories: string[];
  photos: PhotoEntity[];
  rating?: number;
  descriptionText?: string;
  startPlace?: PlaceEntity;
};

export function tourToTourEntity(tour: Tour): TourEntity {
  const { mainPhotoId, photos } = tour;

  return { ...tour };
}
