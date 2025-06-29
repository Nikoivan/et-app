import { Activity } from '@prisma/client';
import { removeEmptyProperties } from '@/shared/lib/object-utils';

const getSafeActivityEntity = (activity: Activity): Activity => {
  return removeEmptyProperties<Activity>(activity);
};

export const secureUtils = { getSafeActivityEntity };
