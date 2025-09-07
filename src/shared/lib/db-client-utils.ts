import { Prisma } from '@prisma/client';
import { Params } from '@/entities/tour/repositories/tour';

export type DbQueryParams = { take: number; skip?: number };

const pageCount = 10;

const getQueryParamsByPage = (
  params: (Prisma.TourFindManyArgs & { page?: number }) | undefined
): Params | void => {
  if (!params) return;

  const { where, select, include, page } = params;

  const validParams = select
    ? {
        where,
        select
      }
    : include
      ? {
          where,
          include
        }
      : { where };

  if (!page || page === 1) {
    return { ...validParams, take: 10 } as Params;
  }

  const take = page * pageCount;

  return { ...validParams, take, skip: take - pageCount } as Params;
};

export const qbQueryUtils = { getQueryParamsByPage };
