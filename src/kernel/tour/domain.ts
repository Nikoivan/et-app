import { TourWR } from '@/kernel/tour/model/types';
import { ReviewDomain } from '@/entities/review';
import { ActivityDomain } from '@/entities/activity/server';
import { GeoPointDomain } from '@/entities/geo-point';
import { isGeoPointEntity } from '@/entities/geo-point/lib/typeguadrs';
import { Photo } from '@prisma/client';

export type TourKernel = {
  id: number;
  title: string;
  description: string;
  mainPhoto: string;
  price: number;
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
