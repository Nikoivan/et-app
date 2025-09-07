import { Prisma } from '@prisma/client';

import {
  ActivityDomain,
  ActivityEntity,
  activityRepositories
} from '@/entities/activity/server';
import { activityToActivityEntity } from '@/entities/activity/domain';
import { Either, left, right } from '@/shared/lib/either';

const createActivity = async (
  data: ActivityDomain.CreateActivityData & { authorId: number }
): Promise<ActivityEntity | null> => {
  const activity = await activityRepositories.createActivity(data);

  return activity ? activityToActivityEntity(activity) : null;
};

const getUserActivities = async (
  authorId: number
): Promise<Either<string, ActivityDomain.ActivityEntity[]>> => {
  const where: Prisma.ActivityWhereInput = { authorId };
  const tourIncludes: Prisma.ActivityInclude = { photos: true };

  const tours: Prisma.ActivityGetPayload<{
    include: {
      tour: true;
    };
  }>[] = await activityRepositories.getActivities({
    where,
    include: tourIncludes
  });

  if (!tours) {
    return left('Ошибка при получение туров');
  }

  const activityEntities: ActivityDomain.ActivityEntity[] = tours.length
    ? tours.map(activityToActivityEntity)
    : [];

  return right(activityEntities);
};

export const activityServices = { getUserActivities, createActivity };
