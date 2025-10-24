export type DbQueryParams = { take: number; skip?: number };

const take = 10;

export type Params<T> = ({ page?: number } & Partial<T>) | undefined;

const getDbQueryParamsByPage = <T>(params: Params<T>) => {
  if (!params) return;

  const { page, ...rest } = params;

  if (!page || page === 1) {
    return { ...rest, take: 10 };
  }

  return { ...rest, take, skip: take * page };
};

export const qbQueryUtils = { getDbQueryParamsByPage };
