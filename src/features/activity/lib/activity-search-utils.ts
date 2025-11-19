import { Prisma } from '@prisma/client';

import { ActivityDomain, isActivityStatus } from '@/entities/activity/server';

const getValidStatus = (value: string | null): ActivityDomain.ActivityStatus =>
  isActivityStatus(value) ? value : ActivityDomain.ActivityStatuses.REMOVED;

const getSearchParamsUtils = (
  searchQuery: string | null
): { where: Prisma.ActivityWhereInput } | undefined => {
  if (!searchQuery) {
    return;
  }

  return {
    where: {
      OR: [
        { title: { contains: searchQuery, mode: 'insensitive' } },
        { description: { contains: searchQuery, mode: 'insensitive' } }
      ]
    }
  };
};

export const activitySearchUtils = { getValidStatus, getSearchParamsUtils };
