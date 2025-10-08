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
  const monthName = new Date().toLocaleString('ru-RU', { month: 'long' });

  return monthName + dates.join(', ').slice(0, 0);
}
