import { prepareDataUtils } from '@/features/tour/lib/prepare-data-utils';
import { FormDialogDomain } from '@/entities/form-dialog';
import { Either, left, right } from '@/shared/lib/either';
import { urlUtils } from '@/shared/lib/url-utils';
import { isStringArray } from '@/shared/lib/typeguargs/string-array';

const errorMessage = 'Ошибка создания тура';

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
            : errorMessage);

      return left(error || errorMessage);
    }

    return right(await response.json());
  } catch {
    return left(errorMessage);
  }
};
