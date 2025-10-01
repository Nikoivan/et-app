import { Either, left, right } from '@/shared/lib/either';
import { urlUtils } from '@/shared/lib/url-utils';

type RestMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

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
}: RequestParams): Promise<Either<string, T>> => {
  const response = await fetch(`${urlUtils.getUrl(url, queryParams)}`, {
    method,
    body,
    signal
  });

  const result = await response.json();

  return response.status >= 300 ? left(result) : right(result);
};

const get = (params: RequestParams) =>
  request({ ...params, method: 'GET', body: undefined });

const post = (params: RequestParams) => request({ ...params, method: 'POST' });

const put = (params: RequestParams) => request({ ...params, method: 'PUT' });

const patch = (params: RequestParams) =>
  request({ ...params, method: 'PATCH' });

const del = (params: RequestParams) => request({ ...params, method: 'DELETE' });

export const apiClient = { get, post, put, patch, del };
