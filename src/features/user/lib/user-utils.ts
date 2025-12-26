import { UserWhereInput } from '../../../../generated/prisma/models/User';

const getSearchParamsUtils = (
  searchQuery: string | null
): { where: UserWhereInput } | undefined => {
  if (!searchQuery) {
    return;
  }

  return {
    where: {
      OR: [
        { login: { contains: searchQuery, mode: 'insensitive' } },
        { firstName: { contains: searchQuery, mode: 'insensitive' } },
        { lastName: { contains: searchQuery, mode: 'insensitive' } }
      ]
    }
  };
};

export const userUtils = { getSearchParamsUtils };
