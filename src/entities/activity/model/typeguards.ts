import { ActivityStatus, ActivityStatuses } from '../domain';

const statuses = new Set(Object.values(ActivityStatuses));

export const isActivityStatus = (value: unknown): value is ActivityStatus =>
  !!value && typeof value === 'string' && statuses.has(value as ActivityStatus);
