import { PostDomain, postRepositories } from '@/entities/post/server';
import { postCardFields } from '../constants/request-constants';
import { Prisma } from '../../../../generated/prisma/client';

const getPostCards = (
  where?: Prisma.PostWhereInput
): PostDomain.PostCardEntity[] =>
  postRepositories.getPostsBySelect({
    where,
    select: postCardFields
  }) as unknown as PostDomain.PostCardEntity[];

export const postsServices = { getPostCards };
