import { Post, Prisma } from '@prisma/client';
import { dbClient } from '@/shared/lib/db';
import { PostEntity } from '@/entities/post/domain';
import PostGetPayload = Prisma.PostGetPayload;

export type Params<T extends Prisma.PostInclude | undefined = undefined> = {
  where?: Prisma.PostWhereInput;
  include?: T;
  select?: Prisma.PostSelect;
  orderBy?: Prisma.PostOrderByWithRelationInput;
  take?: number;
  skip?: number;
};

type UniquePostParams = { id: number } | { route: string };

const getPost = (
  params: UniquePostParams
): Promise<PostGetPayload<{ include: { user: true } }> | null> =>
  dbClient.post.findUnique({
    where: params,
    include: { user: true }
  }) as Promise<PostGetPayload<{ include: { user: true } }> | null>;

const getPosts = <TInclude extends Prisma.PostInclude>(
  params: Params<TInclude>
): Promise<Prisma.PostGetPayload<{ include: TInclude }>[]> =>
  dbClient.post.findMany(params) as Promise<
    Prisma.PostGetPayload<{ include: TInclude }>[]
  >;

const createPost = (post: Omit<Post, 'id'>): Promise<Post> =>
  dbClient.post.create({ data: post });

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
  getPost,
  getPosts,
  createPost,
  createManyPosts,
  updatePost,
  deletePost
};
