import { Prisma } from '@prisma/client';

import { TourWR } from '@/kernel/tour/model/types';
import { dbClient } from '@/shared/lib/db';

type Params = {
  where: Prisma.TourWhereInput;
  include?: Prisma.TourInclude;
  select?: Prisma.TourSelect;
  orderBy?: Prisma.TourOrderByWithRelationInput;
};

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

function getTours(params: Params) {
  return dbClient.tour.findMany(params);
}

export const tourRepository = { getTour, getTours };
