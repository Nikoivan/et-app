import { getOwnUserActivitiesUrl } from '@/widgets/activities/lib/url-utils';

export const getOwnUserActivities = async <T>({
  signal
}: {
  signal?: AbortSignal;
}): Promise<T> => {
  const url = getOwnUserActivitiesUrl();

  const response = await fetch(url, { signal });

  return { list: await response.json() } as T;
};
