import { Activity, Photo, Review, Tour } from '@prisma/client';

// Tour with relations
export type TourWR = Tour & {
  reviews: Review[];
  activities: Activity[];
  photos: Photo[];
};
