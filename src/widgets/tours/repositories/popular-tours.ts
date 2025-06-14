import { dbClient } from '@/shared/lib/db';

import { TourCardEntity } from '@/features/tour';

const getPopularTours = async (): Promise<TourCardEntity[]> => {
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
      mainPhoto: true,
      duration: true
    }
  });
};

export const popularToursRepositories = { getPopularTours };
