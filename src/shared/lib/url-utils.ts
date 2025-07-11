const getOrigin = (): string =>
  globalThis.location?.origin || 'https://ay-petry.ru';
const getApiRoute = (): string => process.env.API_ROUTE || '/api';
const getApiUrl = (): string => `${getOrigin()}${getApiRoute()}`;

export const urlUtils = { getOrigin, getApiRoute, getApiUrl };
