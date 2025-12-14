// Tour with relations
import {
  Activity,
  Photo,
  Review,
  Tour
} from '../../../../generated/prisma/client';

export type TourWR = Tour & {
  reviews: Review[];
  activities: Activity[];
  photos: Photo[];
};
