import { Prisma, Tour } from '@prisma/client';
import { dbClient } from '@/shared/lib/db';

function getTour(where: Prisma.TourWhereInput): Promise<Tour | null> {
  return dbClient.tour.findFirst({ where });
}

export const tourRepository = { getTour };
