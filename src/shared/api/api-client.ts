import { urlUtils } from '@/shared/lib/url-utils';

type RequestParams = {
  url: string;
  queryParams?: Record<string, string>;
} & RequestInit;

const request = async <T>({
  url,
  body,
  method,
  signal,

  queryParams
}: RequestParams): Promise<T> => {
  const response = await fetch(`${urlUtils.getUrl(url, queryParams)}`, {
    method,
    body,
    signal
  });

  return response.json();
};

const get = <T>(params: RequestParams): Promise<T> =>
  request<T>({ ...params, method: 'GET', body: undefined });

const post = <T>(params: RequestParams) =>
  request<T>({ ...params, method: 'POST' });

const put = (params: RequestParams) => request({ ...params, method: 'PUT' });

const patch = (params: RequestParams) =>
  request({ ...params, method: 'PATCH' });

const del = (params: RequestParams) => request({ ...params, method: 'DELETE' });

export const apiClient = { get, post, put, patch, del };
