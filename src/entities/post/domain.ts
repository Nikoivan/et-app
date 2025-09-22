import { Prisma } from '@prisma/client';
import { objectUtils } from '@/shared/lib/object-utils';
import { postUtils } from '@/entities/post/lib/post-utils';
import { WithoutNull } from '@/shared/model/types';

type UserEntity = {
  id: number;
  login: string;
  role: string;
  firstName?: string;
  lastName?: string;
};

export type PostStatus = 'legacy' | 'fresh' | 'unknown';

export type PostEntity = {
  id: number;
  title: string;
  description: string;
  content: string;
  user: UserEntity;
  postAuthorId: number;
  type: string;
  guid: string;
  image: string;
  status: PostStatus;
  route: string;
  categories: string[];
  metaTitle?: string;
  metaDescription?: string;
  link?: string;
  pubDate?: string;
};

export const postToPostEntity = (
  post: Prisma.PostGetPayload<{ include: { user: true } }>
): PostEntity => {
  const entity = objectUtils.makeWithoutNull(post);

  return {
    ...entity,
    status: postUtils.getValidStatus(entity.status)
  } as WithoutNull<PostEntity>;
};
