import { getTourCardsUrl } from '@/widgets/tours/lib/url-utils';

export const getTourCards = async <T>(
  { page }: { page: number },
  signal?: AbortSignal
): Promise<T> => {
  const url = getTourCardsUrl(page);
  const response = await fetch(url, { signal });

  return response.json() as Promise<T>;
};
