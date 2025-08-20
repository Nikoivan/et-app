import { Either, left, right } from '@/shared/lib/either';
import { Activity, Tour } from '@prisma/client';
import { urlUtils } from '@/shared/lib/url-utils';

import { isStringArray } from '@/shared/lib/typeguargs/string-array';
import { CreateActivityData } from '@/features/activities/domain';
import { ActivityDomain } from '@/entities/activity/';

const createErrorMessage = 'Ошибка создания мероприятия';
const deleteErrorMessage = 'Ошибка удаления мероприятия';

export const createActivity = async (
  data: CreateActivityData
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
): Promise<Either<string, Tour>> => {
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
