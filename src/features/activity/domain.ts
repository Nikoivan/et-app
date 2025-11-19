import { ActivityDomain } from '@/entities/activity/server';

export type GetActivityResponse = {
  pagesCount: number;
  activities: ActivityDomain.ActivityEntity[];
};
