import { TourWR } from '@/kernel/tour/model/types';
import { ReviewDomain } from '@/entities/review';
import { ActivityDomain } from '@/entities/activity/server';
import { GeoPointDomain } from '@/entities/geo-point';
import { isGeoPointEntity } from '@/entities/geo-point/lib/typeguadrs';
import { Photo } from '@prisma/client';
import { tourTypeguards } from '@/kernel/tour/model/typeguards';

export type TourKernel = {
  id: number;
  title: string;
  description: string;
  mainPhoto: string;
  price: number;
  slug: string;
  duration: number;
  categories: string[];
  authorId: number;
  photos: Photo[];
  reviews: ReviewDomain.ReviewEntity[];
  activities: ActivityDomain.ActivityEntity[];
  rating: number;
  descriptionText?: string;
  content?: string;
  startPlace?: GeoPointDomain.GeoPointEntity;
};

export function tourToKernelTour(tour: TourWR): TourKernel {
  const { mainPhotoId, photos, rating, descriptionText, startPlace, ...rest } =
    tour;

  if (
    !Array.isArray(photos) ||
    !photos.some(photo => !tourTypeguards.isPhotoEntity(photo))
  ) {
    throw new Error('Сущность photos - имеет неверный тип данных');
  }

  const reviews = tour.reviews.length
    ? tour.reviews.map(ReviewDomain.reviewToReviewEntity)
    : [];
  const activities = tour.activities.length
    ? tour.activities.map(ActivityDomain.activityToActivityEntity)
    : [];

  const mainPhoto = photos.find(photo => photo.id === mainPhotoId)?.source;

  if (!mainPhoto) {
    throw new Error('Error of main photo id: ' + mainPhotoId);
  }

  return {
    ...rest,
    rating: rating || 0,
    descriptionText: descriptionText || undefined,
    startPlace:
      startPlace && isGeoPointEntity(startPlace) ? startPlace : undefined,
    reviews,
    activities,
    mainPhoto,
    photos
  };
}
