import { Tour } from '@prisma/client';

import { Either, left, right } from '@/shared/lib/either';
import { urlUtils } from '@/shared/lib/url-utils';
import { isStringArray } from '@/shared/lib/typeguargs/string-array';
import { TourUpdate } from '@/features/tour/lib/schemas/create-tour-schemas';
import { apiClient } from '@/shared/api/api-client';

const createErrorMessage = 'Ошибка создания тура';
const updateErrorMessage = 'Ошибка редактирования тура';
const deleteErrorMessage = 'Ошибка при удаление тура';

const baseKey = 'tours';
const baseUrl = 'tour';

export const createTour = async (
  formData: FormData
): Promise<Either<string, string>> => {
  try {
    const response = await fetch(`${urlUtils.getApiUrl()}/${baseUrl}`, {
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

const editTour = async (tour: TourUpdate): Promise<Either<string, Tour>> => {
  const result = await apiClient.patch<Tour>({
    url: baseUrl,
    body: JSON.stringify(tour)
  });

  if (!result) {
    return left(updateErrorMessage);
  }

  return right(result);
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

export const tourApi = { baseKey, createTour, editTour, deleteTour };
