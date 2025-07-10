import { TourEntity } from '@/entities/tour/domain';
import { Either, left, right } from '@/shared/lib/either';
import { urlUtils } from '@/shared/lib/url-utils';

const getUserTours = async (
  userId: number
): Promise<Either<string, TourEntity[]>> => {
  const errorText = `Ошибка получения туров пользователя. Идентификатор пользователя ${userId}`;

  const params = new URLSearchParams();
  params.append('user_id', userId.toString());

  const url = `${urlUtils.getApiUrl()}/tours/user?${params.toString()}`;

  try {
    const response = await fetch(url);

    if (response.status >= 300) {
      return left(errorText);
    }

    return right(await response.json());
  } catch {
    return left(errorText);
  }
};

export const tourApi = { getUserTours };
