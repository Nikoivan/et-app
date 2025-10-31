const getOrigin = (): string =>
  globalThis.location?.origin || 'https://ay-petry.ru';
const getApiRoute = (): string => process.env.API_ROUTE || '/api';
const getApiUrl = (): string => `${getOrigin()}${getApiRoute()}`;
const getQueryParamsString = (queryParams?: Record<string, string>): string => {
  if (!queryParams) {
    return '';
  }

  return Object.entries(queryParams)
    .filter(([key, value]) => !!key && !!value)
    .reduce(
      (acc, [key, value]) =>
        (acc += `${acc !== '?' ? '&' : ''}${key}=${value}`),
      '?'
    );
};
const getUrl = (slug: string, queryParams?: Record<string, string>) =>
  `${getApiUrl()}/${slug}${getQueryParamsString(queryParams)}`;

export const urlUtils = { getOrigin, getApiRoute, getApiUrl, getUrl };
