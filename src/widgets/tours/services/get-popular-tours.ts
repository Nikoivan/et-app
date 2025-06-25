import { popularToursRepositories } from '@/widgets/tours/repositories/popular-tours';
import { TourCardEntity } from '@/features/tour';
import { draftTourToTourCardEntity } from '@/widgets/tours/domain';

export const getPopularTours = async (): Promise<TourCardEntity[]> => {
  const draftPopularTours =
    await popularToursRepositories.getDraftPopularTours();

  return draftPopularTours.map(draftTourToTourCardEntity);
};
