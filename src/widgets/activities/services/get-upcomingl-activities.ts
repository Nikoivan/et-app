import { secureUtils } from '@/entities/activity/server';
import { activitiesRepository } from '@/widgets/activities/repositories/activities';

export const getUpcominglActivities = async () => {
  const activities = await activitiesRepository.getLastActivities();

  return activities.map(secureUtils.getSafeActivityEntity);
};
