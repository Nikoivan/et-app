import { Activity } from '@prisma/client';
import { ActivityEntity } from '@/entities/activity/domain';

const getSafeActivityEntity = (activity: Activity): ActivityEntity => {
  const { transactions, ...activityEntity } = activity;

  return activityEntity;
};

export const secureUtils = { getSafeActivityEntity };
