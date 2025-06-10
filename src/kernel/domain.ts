import { ReviewDomain } from '@/entities/review';
import { ActivityDomain } from '@/entities/activity';

export type TourKernel = {
  id: number;
  title: string;
  description: string;
  mainPhoto: string;
  price: number;
  duration: string;
  categories: string[];
  authorId: string;
  photos: string[];
  reviews: ReviewDomain.Review[];
  activities: ActivityDomain.ActivityEntity[];
  rating: number;
  descriptionText?: string;
  content?: string;
  startPlace?: string;
};
