import { dbClient } from '@/shared/lib/db';
import { Activity } from '@prisma/client';
import { ActivityStatuses } from '@/entities/activity/server';

const getLastActivities = async (): Promise<Activity[]> => {
  return dbClient.activity.findMany({
    where: { status: { equals: ActivityStatuses.ACTIVE } },
    take: 5
  });
};

export const activitiesRepository = { getLastActivities };
