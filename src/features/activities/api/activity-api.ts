import { Either, left, right } from '@/shared/lib/either';
import { Tour } from '@prisma/client';
import { urlUtils } from '@/shared/lib/url-utils';

const deleteErrorMessage = 'Ошибка удаления мероприятия';

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
