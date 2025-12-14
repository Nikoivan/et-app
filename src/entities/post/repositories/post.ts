import { Post, Prisma } from '@prisma/client';
import { dbClient } from '@/shared/lib/db';
import { PostEntity, WithUser } from '@/entities/post/domain';
import PostWhereInput = Prisma.PostWhereInput;

const getPostsCount = (where?: Prisma.PostWhereInput) =>
  dbClient.post.count({ where });

const getPost = <T extends Prisma.PostFindUniqueArgs>(
  uniqueParam: Prisma.SelectSubset<T, Prisma.PostFindUniqueArgs>
) => {
  const params = uniqueParam || { include: { user: true } };

  return dbClient.post.findUnique(params);
};

const getPosts = <
  T extends Prisma.PostFindManyArgs & {
    select?: never;
    include: { user: true };
  }
>(
  params?: Prisma.SelectSubset<T, Prisma.PostFindManyArgs>
): Promise<Prisma.PostGetPayload<WithUser<T>>[]> => {
  const base = (params ?? {}) as Prisma.PostFindManyArgs;

  const args = {
    ...base,
    include: {
      ...(base.include ?? {}),
      user: true
    }
  } as WithUser<T>;

  return dbClient.post.findMany(args) as Promise<
    Prisma.PostGetPayload<WithUser<T>>[]
  >;
};

const getPostsBySelect = <T extends Prisma.PostSelect>(params?: {
  where?: PostWhereInput;
  select?: T;
}) => {
  return dbClient.post.findMany(params);
};

const createPost = (post: Omit<Post, 'id'>): Promise<Post> =>
  dbClient.post.create({ data: post as Post });

const createManyPosts = (
  posts: Omit<PostEntity, 'id' | 'user'>[]
): Prisma.PrismaPromise<Prisma.BatchPayload> =>
  dbClient.post.createMany({ data: posts, skipDuplicates: true });

const updatePost = (post: Post): Promise<Post> =>
  dbClient.post.update({ where: { id: post.id }, data: post });

const deletePost = (id: number): Promise<Post> =>
  dbClient.post.delete({
    where: {
      id
    }
  });

export const postRepositories = {
  getPostsCount,
  getPost,
  getPosts,
  getPostsBySelect,
  createPost,
  createManyPosts,
  updatePost,
  deletePost
};
