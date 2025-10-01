const getOrigin = (): string =>
  globalThis.location?.origin || 'https://ay-petry.ru';
const getApiRoute = (): string => process.env.API_ROUTE || '/api';
const getApiUrl = (): string => `${getOrigin()}${getApiRoute()}`;
const getQueryParamsString = (queryParams?: Record<string, string>): string => {
  let queryParamsString = '';

  if (queryParams) {
    queryParamsString += '?';

    Object.entries(queryParams).forEach(
      ([key, value], idx) =>
        (queryParamsString += `${idx !== 0 ? '&' : ''}${key}=${value}`)
    );
  }

  return queryParamsString;
};
const getUrl = (route: string, queryParams?: Record<string, string>) =>
  `${getApiUrl()}/${route}${getQueryParamsString(queryParams)}`;

export const urlUtils = { getOrigin, getApiRoute, getApiUrl, getUrl };
