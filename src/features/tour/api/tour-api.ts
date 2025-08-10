import { Tour } from '@prisma/client';

import { prepareDataUtils } from '@/features/tour/lib/prepare-data-utils';
import { FormDialogDomain } from '@/entities/form-dialog';
import { Either, left, right } from '@/shared/lib/either';
import { urlUtils } from '@/shared/lib/url-utils';
import { isStringArray } from '@/shared/lib/typeguargs/string-array';

const createErrorMessage = 'Ошибка создания тура';
const deleteErrorMessage = 'Ошибка при удаление тура';

export const createTour = async (
  data: FormDialogDomain.FormData
): Promise<Either<string, string>> => {
  const dataForCreate: [string, string | File][] =
    prepareDataUtils.prepareDataToCreate(data);

  const formData = new FormData();

  dataForCreate.forEach(([key, value]) => formData.append(key, value));

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
