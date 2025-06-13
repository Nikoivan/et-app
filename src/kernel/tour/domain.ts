import { ReviewDomain } from '@/entities/review';
import { ActivityDomain } from '@/entities/activity';
import { TourWR } from '@/kernel/tour/model/types';
import { GeoPointDomain } from '@/entities/geo-point';
import { isGeoPointEntity } from '@/entities/geo-point/lib/typeguadrs';

export type TourKernel = {
  id: number;
  title: string;
  description: string;
  mainPhoto: string;
  price: number;
  duration: string;
  categories: string[];
  authorId: number;
  photos: string[];
  reviews: ReviewDomain.ReviewEntity[];
  activities: ActivityDomain.ActivityEntity[];
  rating: number;
  descriptionText?: string;
  content?: string;
  startPlace?: GeoPointDomain.GeoPointEntity;
};

export function tourToKernelTour(tour: TourWR): TourKernel {
  const { rating, descriptionText, startPlace, ...rest } = tour;
  const reviews = tour.reviews.length
    ? tour.reviews.map(ReviewDomain.reviewToReviewEntity)
    : [];
  const activities = tour.activities.length
    ? tour.activities.map(ActivityDomain.activityToActivityEntity)
    : [];

  return {
    ...rest,
    rating: rating || 0,
    descriptionText: descriptionText || undefined,
    startPlace:
      startPlace && isGeoPointEntity(startPlace) ? startPlace : undefined,
    reviews,
    activities
  };
}
