import { Activity } from '@prisma/client';

import { ActivityDomain } from '@/entities/activity/server';
import { urlUtils } from '@/shared/lib/url-utils';
import { Either, left, right } from '@/shared/lib/either';
import { isStringArray } from '@/shared/lib/typeguargs/string-array';

const createErrorMessage = 'Ошибка создания мероприятия';
const deleteErrorMessage = 'Ошибка удаления мероприятия';

const baseKey = 'activities';

export const createActivity = async (
  data: ActivityDomain.CreateActivityData
): Promise<Either<string, ActivityDomain.ActivityEntity>> => {
  try {
    const response = await fetch(`${urlUtils.getApiUrl()}/activity`, {
      method: 'POST',
      body: JSON.stringify(data)
    });

    if (response.status >= 300) {
      const errors = await response.json();

      const error =
        !!errors &&
        (typeof errors === 'string'
          ? errors
          : isStringArray(errors)
            ? errors.join(', ')
            : createErrorMessage);

      return left(error || createErrorMessage);
    }

    return right((await response.json()) as ActivityDomain.ActivityEntity);
  } catch {
    return left(createErrorMessage);
  }
};

export const deleteActivity = async (
  id: number
): Promise<Either<string, Activity>> => {
  try {
    const response = await fetch(`${urlUtils.getApiUrl()}/activity?id=${id}`, {
      method: 'DELETE'
    });

    if (response.status >= 300) {
      return left(deleteErrorMessage);
    }

    return right(await response.json());
  } catch (e) {
    console.warn(e);

    return left(deleteErrorMessage);
  }
};

export const activityApi = { baseKey, createActivity, deleteActivity };
