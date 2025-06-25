import { Prisma } from '@prisma/client';
import { dbClient } from '@/shared/lib/db';
import { TourWR } from '@/kernel/tour/model/types';

function getTour(where: Prisma.TourWhereInput): Promise<TourWR | null> {
  return dbClient.tour.findFirst({
    where,
    include: {
      reviews: true,
      activities: true,
      photos: true
    }
  });
}

export const tourRepository = { getTour };
