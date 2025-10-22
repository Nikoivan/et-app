import { Post, Prisma } from '@prisma/client';
import { qbQueryUtils } from '@/shared/lib/db-client-utils';

import { PostDomain, postRepositories } from '@/entities/post/server';
import { Either, left, right } from '@/shared/lib/either';
import PostGetPayload = Prisma.PostGetPayload;

const getPosts = async (
  params?: Prisma.PostFindManyArgs & { page?: number }
): Promise<Either<string, PostDomain.PostEntity[]>> => {
  const dbQueryParams = qbQueryUtils.getDbQueryParamsByPage<Prisma.PostInclude>(
    params || { page: 1, include: { user: true } }
  ) as Prisma.PostFindManyArgs & {
    select?: never;
    include: { user: true };
  };

  const result = await postRepositories.getPosts(dbQueryParams);

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

const deletePost = async (id: number): Promise<Either<string, Post>> => {
  const result = await postRepositories.deletePost(id);

  if (!result) {
    return left<string>('Не удалось удалить данный пост');
  }

  return right<Post>(result);
};

export const postServices = {
  getPosts,
  getPostByRoute,
  createPosts,
  deletePost
};
