import { Prisma, User } from '@prisma/client';
import { objectUtils } from '@/shared/lib/object-utils';
import { postUtils } from '@/entities/post/lib/post-utils';
import { WithoutNull } from '@/shared/model/types';
import { PostCreateSchema } from '@/entities/post/model/schemas';

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
  user: UserEntity;
  images: string[];
  price: number | null;
  duration: number | null;
  metaPrice: string | null;
  metaDuration: string | null;
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
  price?: number;
  rating?: number;
  duration?: number;
};

type UserSelectValue = true | { select: Prisma.UserSelect };

export type EnforceUserSelect<
  T extends Prisma.PostFindManyArgs & { include?: never }
> = Omit<T, 'select'> & {
  select: T extends { select: infer S }
    ? S extends Prisma.PostSelect
      ? Omit<S, 'user'> & { user: UserSelectValue }
      : { user: true }
    : { user: true };
};

export type WithUser<T extends Prisma.PostFindManyArgs & { select?: never }> =
  T & {
    include: T extends { include: infer I }
      ? I extends Prisma.PostInclude
        ? Omit<I, 'user'> & { user: true }
        : { user: true }
      : { user: true };
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

export const postToPostEntity = (post: unknown): PostEntity => {
  const result = PostCreateSchema.safeParse(post);

  if (!result.success) {
    throw new Error('Ошибка в типах данных');
  }

  const entity = objectUtils.makeWithoutNull(result.data);

  return {
    ...entity,
    status: postUtils.getValidStatus(entity.status),
    user: userToUserEntity(result.data.user as User)
  } as WithoutNull<PostEntity>;
};
