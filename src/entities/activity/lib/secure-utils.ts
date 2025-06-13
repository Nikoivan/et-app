import { Activity } from '@prisma/client';
import { ActivityEntity } from '@/entities/activity/domain';
import { removeEmptyProperties } from '@/shared/lib/object-utils';

const getSafeActivityEntity = (activity: Activity): ActivityEntity => {
  const activityEntity = removeEmptyProperties<Activity>(activity);

  return activityEntity;
};

export const secureUtils = { getSafeActivityEntity };
