export type DbQueryParams = { take: number; skip?: number };

const take = 10;

export type Params<T> = ({ page?: number } & Partial<T>) | undefined;
export type PageParams = {
  take?: number;
  skip?: number;
};

const getDbQueryParamsByPage = <T>(params: Params<T>) => {
  if (!params) return;

  const { page, ...rest } = params;

  if (!page || page === 1) {
    return { ...rest, take: 10 };
  }

  return { ...rest, take, skip: take * (page - 1) };
};

const getPageParams = (pageQuery: string | null): PageParams => {
  const page = pageQuery ? Number(pageQuery) : 1;

  if (!page || page === 1) {
    return { take };
  }

  return { take, skip: (page - 1) * take };
};

export const dbQueryUtils = { getDbQueryParamsByPage, getPageParams };
