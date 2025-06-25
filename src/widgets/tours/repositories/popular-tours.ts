import { dbClient } from '@/shared/lib/db';
import { DraftTourCardEntity } from '@/widgets/tours/domain';

const getDraftPopularTours = async (): Promise<DraftTourCardEntity[]> => {
  return dbClient.tour.findMany({
    where: {
      categories: {
        has: 'popular'
      }
    },
    select: {
      id: true,
      title: true,
      price: true,
      rating: true,
      duration: true,
      mainPhotoId: true,
      photos: true
    }
  });
};

export const popularToursRepositories = { getDraftPopularTours };
