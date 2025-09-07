import { getOwnUserToursUrl } from '../lib/url-utils';

export const getOwnTours = async <T>(signal?: AbortSignal): Promise<T> => {
  const url = getOwnUserToursUrl();

  const response = await fetch(url, { signal });

  return { list: await response.json() } as T;
};
