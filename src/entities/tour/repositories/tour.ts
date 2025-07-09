import { Prisma } from '@prisma/client';
import { dbClient } from '@/shared/lib/db';

const getTours = <TInclude extends Prisma.TourInclude | undefined = undefined>(
  where: Prisma.TourWhereInput,
  include?: TInclude
): Promise<Prisma.TourGetPayload<{ include: TInclude }>[]> =>
  dbClient.tour.findMany({ where, include }) as Promise<
    Prisma.TourGetPayload<{ include: TInclude }>[]
  >;

export const tourRepositories = { getTours };
