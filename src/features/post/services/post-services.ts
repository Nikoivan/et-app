import { Post, Prisma } from '@prisma/client';

import { GetPostsResponse } from '@/features/post/domain';
import { PostDomain, postRepositories } from '@/entities/post/server';
import { qbQueryUtils } from '@/shared/lib/db-client-utils';
import { Either, left, right } from '@/shared/lib/either';
import { PostUpdate } from '@/entities/post';
import PostGetPayload = Prisma.PostGetPayload;

const getPagesCount = async () => {
  const count = await postRepositories.getPostsCount();

  return Math.ceil(count / 10);
};

const getPosts = async (
  params?: Prisma.PostFindManyArgs & { page?: number }
): Promise<Either<string, GetPostsResponse>> => {
  const dbQueryParams = qbQueryUtils.getDbQueryParamsByPage<Prisma.PostInclude>(
    params || { page: 1, include: { user: true } }
  ) as Prisma.PostFindManyArgs & {
    select?: never;
    include: { user: true };
  };

  const pagesCount = await getPagesCount();
  const result = await postRepositories.getPosts(dbQueryParams);

  if (!pagesCount || !result) {
    return left('Ошибка получения постов из базы данных');
  }

  const postEntities = result.map(PostDomain.postToPostEntity);

  return right({ pagesCount, posts: postEntities });
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

const updatePost = async (post: PostUpdate): Promise<Either<string, Post>> => {
  const result = await postRepositories.updatePost(post as Post);

  if (!result) {
    return left<string>('Не удалось обновить пост.');
  }

  return right<Post>(result);
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
  updatePost,
  deletePost
};
