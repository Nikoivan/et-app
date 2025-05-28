import { popularToursRepositories } from '@/widgets/tours/repositories/popular-tours';
import { TourCardEntity } from '@/features/tour';

export const getPopularTours = async (): Promise<TourCardEntity[]> => {
  return popularToursRepositories.getPopularTours();
};
