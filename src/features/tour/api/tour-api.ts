import { Tour } from '@prisma/client';

import { Either, left, right } from '@/shared/lib/either';
import { urlUtils } from '@/shared/lib/url-utils';
import { isStringArray } from '@/shared/lib/typeguargs/string-array';

const createErrorMessage = 'Ошибка создания тура';
const deleteErrorMessage = 'Ошибка при удаление тура';

const baseKey = 'tours';

export const createTour = async (
  formData: FormData
): Promise<Either<string, string>> => {
  try {
    const response = await fetch(`${urlUtils.getApiUrl()}/tour`, {
      method: 'POST',
      body: formData
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

    return right(await response.json());
  } catch {
    return left(createErrorMessage);
  }
};

export const deleteTour = async (id: number): Promise<Either<string, Tour>> => {
  try {
    const response = await fetch(`${urlUtils.getApiUrl()}/tour?id=${id}`, {
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

export const tourApi = { baseKey, createTour, deleteTour };
