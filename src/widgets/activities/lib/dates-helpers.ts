import { ActivityEntity } from '@/entities/activity/domain';
import { ActivityDate } from '@/widgets/activities/domain';

export function getActivitiesDates(
  activities: ActivityEntity[]
): ActivityDate[] {
  return activities.map(({ startTime, finishTime }) => ({
    startTime,
    finishTime
  }));
}

export function getMonthesTitle(dates: ActivityDate[]): string {
  return 'Март';
}
