import { dbQueryUtils, PageParams } from '@/shared/lib/db-client-utils';
import { Prisma } from '@prisma/client';
import { postUtils } from '@/entities/post/lib/post-utils';

type ParamsFns = {
  page: (value: string | null) => PageParams;
  search: (
    value: string | null
  ) => { where: Prisma.PostWhereInput } | undefined;
};

const paramsFns: ParamsFns = {
  page: dbQueryUtils.getPageParams,
  search: postUtils.getSearchParamsUtils
};

const isKeyOfParamsFns = (value: unknown): value is keyof ParamsFns =>
  !!value && typeof value === 'string' && value in paramsFns;

const getParamsByKey = (key: string, searchParams: URLSearchParams) => {
  if (!isKeyOfParamsFns(key)) return;

  const searchValue = searchParams.get(key);

  return paramsFns[key](searchValue);
};

const getParamsBySearchParams = (
  searchParams: URLSearchParams
): Prisma.PostFindManyArgs & {
  select?: never;
  include: { user: true };
} => {
  const keys = [...searchParams.keys()];

  const paramsArr = keys.reduce(
    (acc, key) => ({ ...acc, ...getParamsByKey(key, searchParams) }),
    {}
  );

  return { ...paramsArr, include: { user: true } };
};

export const searchParamsUtils = { getParamsBySearchParams };
