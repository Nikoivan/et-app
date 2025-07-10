import { Prisma } from '@prisma/client';
import { dbClient } from '@/shared/lib/db';

type Params<T extends Prisma.TourInclude | undefined = undefined> = {
  where: Prisma.TourWhereInput;
  include?: T;
  select?: Prisma.TourSelect;
  orderBy?: Prisma.TourOrderByWithRelationInput;
};

const getTours = <TInclude extends Prisma.TourInclude | undefined = undefined>(
  params: Params<TInclude>
): Promise<Prisma.TourGetPayload<{ include: TInclude }>[]> =>
  dbClient.tour.findMany(params) as Promise<
    Prisma.TourGetPayload<{ include: TInclude }>[]
  >;

export const tourRepositories = { getTours };
