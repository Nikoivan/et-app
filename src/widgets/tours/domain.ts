import { TourCardEntity } from '@/features/tour';

export type PhotoEntity = {
  id: number;
  source: string;
};

export type DraftTourCardEntity = {
  id: number;
  title: string;
  price: number;
  rating: number | null;
  duration: number | null;
  mainPhotoId: number;
  photos: PhotoEntity[];
};

export function draftTourToTourCardEntity(
  tour: DraftTourCardEntity
): TourCardEntity {
  const { mainPhotoId, photos, ...rest } = tour;

  const mainPhoto = photos.find(photo => photo.id === mainPhotoId)?.source;

  if (!mainPhoto) {
    throw new Error(`Main photo not found for tour id: ${tour.id}`);
  }

  return { ...rest, mainPhoto };
}
