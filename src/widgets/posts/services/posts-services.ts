import { PostDomain, postRepositories } from '@/entities/post/server';
import { postCardFields } from '../constants/request-constants';
import { Prisma } from '@prisma/client';

const getPostCards = (
  where?: Prisma.PostWhereInput
): Promise<PostDomain.PostCardEntity[]> =>
  postRepositories.getPosts({
    where,
    select: postCardFields
  });

export const postsServices = { getPostCards };
