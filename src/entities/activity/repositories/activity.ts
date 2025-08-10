import { Activity, Prisma } from '@prisma/client';
import { dbClient } from '@/shared/lib/db';

type Params<T extends Prisma.ActivityInclude | undefined = undefined> = {
  where: Prisma.ActivityWhereInput | undefined;
  include?: T;
  select?: Prisma.ActivitySelect;
  orderBy?: Prisma.ActivityOrderByWithRelationInput;
};

const getActivity = (id: number): Promise<Activity | null> =>
  dbClient.activity.findUnique({
    where: {
      id
    }
  });

const getActivities = <
  TInclude extends Prisma.ActivityInclude | undefined = undefined
>(
  params: Params<TInclude>
): Promise<Prisma.ActivityGetPayload<{ include: TInclude }>[]> =>
  dbClient.activity.findMany(params) as Promise<
    Prisma.ActivityGetPayload<{ include: TInclude }>[]
  >;

const deleteActivity = async (id: number): Promise<Activity | null> =>
  dbClient.activity.delete({
    where: {
      id
    }
  });

export const activityRepositories = {
  getActivity,
  getActivities,
  deleteActivity
};
