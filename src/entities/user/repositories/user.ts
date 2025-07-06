import { UserEntity } from '@/entities/user/domain';
import { dbClient } from '@/shared/lib/db';
import { Prisma } from '@prisma/client';
import { objectUtils } from '@/shared/lib/object-utils';
import { WithoutNull } from '@/shared/model/types';

export const saveUser = async (
  user: UserEntity
): Promise<WithoutNull<UserEntity>> => {
  return objectUtils.makeWithoutNull(
    await dbClient.user.create({
      data: user
    })
  ) as WithoutNull<UserEntity>;
};

// export const updateUser = (use)

export async function getUser(
  where: Prisma.UserWhereUniqueInput
): Promise<UserEntity | null> {
  const user = await dbClient.user.findFirst({ where });

  return user ? (objectUtils.makeWithoutNull(user) as UserEntity) : null;
}

export const userRepository = { getUser, saveUser };
