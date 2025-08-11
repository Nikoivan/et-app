import { Activity, Tour } from '@prisma/client';
import { UserEntity } from '@/entities/user/domain';
import { dateUtils } from '@/entities/activity/lib/date-utils';

enum ActivityTypes {
  PERSONAL = 'personal',
  GROUP = 'group'
}

export type ActivityType = ActivityTypes.PERSONAL | ActivityTypes.GROUP;

export enum ActivityStatuses {
  'CREATED' = 'created',
  'ACTIVE' = 'active',
  'CANCELLED' = 'cancelled',
  'FINISHED' = 'finished',
  'REMOVED' = 'remover'
}

export type ActivityStatus =
  | ActivityStatuses.CREATED
  | ActivityStatuses.ACTIVE
  | ActivityStatuses.CANCELLED
  | ActivityStatuses.FINISHED
  | ActivityStatuses.REMOVED;

export type Author = {
  id: number;
  firstName: string;
  lastName: string;
};

export type Transaction = {
  id: number;
  amount: number;
  activityId: number;
  user: Author;
};

export type ActivityEntity = {
  id: number;
  title: string;
  description: string;
  status: string;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  startTime: Date;
  finishTime: Date;
  places: number;
  participants: number[];
  groupPrice: number;
  personPrice: number;
  type: string;
  tourId: number;
  tags: string[];
  categories: string[];
  author?: UserEntity;
  tour?: Tour;
  discount?: number;
};

export type ActivityCardEntity = {
  id: number;
  title: string;
  startTime: Date;
  finishTime: Date;
  freePlaces: number;
  price: number;
};

export function activityToActivityEntity(activity: Activity): ActivityEntity {
  const discount = activity.discount || undefined;
  const { createdAt, updatedAt, startTime, finishTime, ...rest } = activity;
  const validCreatedAt = dateUtils.prepareDate(createdAt);
  const validUpdatedAt = dateUtils.prepareDate(updatedAt);
  const validStartTime = dateUtils.prepareDate(startTime);
  const validFinishTime = dateUtils.prepareDate(finishTime);

  return {
    ...rest,
    discount,
    createdAt: validCreatedAt,
    updatedAt: validUpdatedAt,
    startTime: validStartTime,
    finishTime: validFinishTime
  };
}
