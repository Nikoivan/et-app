import { Prisma, User } from '@prisma/client';
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

export type PostCardEntity = {
  id: number;
  title: string;
  route: string;
  price: number | null;
  rating: number | null;
  duration: number | null;
  metaPrice: string | null;
  metaDuration: string | null;
  mainPhoto: string;
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
  images: string[];
  status: PostStatus;
  route: string;
  categories: string[];
  metaTitle?: string;
  metaDescription?: string;
  metaDuration?: string;
  metaPrice?: string;
  link?: string;
  pubDate?: string;
};

const userToUserEntity = ({
  id,
  login,
  role,
  firstName,
  lastName
}: User): WithoutNull<UserEntity> =>
  objectUtils.makeWithoutNull<UserEntity>({
    id,
    login,
    role,
    firstName: firstName || undefined,
    lastName: lastName || undefined
  }) as WithoutNull<UserEntity>;

export const postToPostEntity = (
  post: Prisma.PostGetPayload<{ include: { user: true } }>
): PostEntity => {
  const entity = objectUtils.makeWithoutNull(post);
  userToUserEntity(post.user);

  return {
    ...entity,
    status: postUtils.getValidStatus(entity.status),
    user: userToUserEntity(post.user)
  } as WithoutNull<PostEntity>;
};
