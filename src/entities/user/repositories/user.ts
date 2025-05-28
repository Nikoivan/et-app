import { UserEntity } from '@/entities/user/domain';
import { dbClient } from '@/shared/lib/db';
import { Prisma } from '@prisma/client';

export const saveUser = (user: UserEntity): Promise<UserEntity> => {
  return dbClient.user.create({
    data: user
  });
};

export async function getUser(
  where: Prisma.UserWhereUniqueInput
): Promise<UserEntity | null> {
  return dbClient.user.findFirst({ where });
}

export const userRepository = { getUser, saveUser };
