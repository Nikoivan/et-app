import { Prisma } from '@prisma/client';
import { qbQueryUtils } from '@/shared/lib/db-client-utils';

import { PostDomain, postRepositories } from '@/entities/post/server';
import { Params } from '@/entities/post/repositories/post';
import { Either, left, right } from '@/shared/lib/either';
import PostInclude = Prisma.PostInclude;
import PostGetPayload = Prisma.PostGetPayload;

const getPosts = async (
  params?: Prisma.PostFindManyArgs & { page?: number }
): Promise<Either<string, PostDomain.PostEntity[]>> => {
  const dbQueryParams = qbQueryUtils.getDbQueryParamsByPage<
    Prisma.PostInclude | undefined
  >(
    params || { page: 1, include: { user: true } }
  ) as Params<Prisma.PostInclude>;

  const result = await postRepositories.getPosts<PostInclude>(dbQueryParams);

  if (!result) {
    return left('Ошибка получения постов из базы данных');
  }

  return right(result.map(PostDomain.postToPostEntity));
};

const getPostByRoute = async (
  route: string
): Promise<Either<string, PostDomain.PostEntity>> => {
  const result: PostGetPayload<{ include: { user: true } }> | null =
    await postRepositories.getPost({ route });

  console.log('result', result);

  if (!result) {
    return left('Ошибка получения данных поста из базы данных');
  }

  const postEntity = PostDomain.postToPostEntity(result);

  return right(postEntity);
};

const createPosts = async (
  posts: Omit<PostDomain.PostEntity, 'id' | 'user'>[]
): Promise<Either<string, Prisma.BatchPayload>> => {
  const createResult = await postRepositories.createManyPosts(posts);

  if (!createResult || !createResult.count) {
    return left('Не удалось создать посты');
  }

  return right(createResult);
};

export const postServices = { getPosts, getPostByRoute, createPosts };
