import { left, right } from '@/shared/lib/either';
import { userRepository } from '../repositories/user';
import { passwordService } from './password';
import { Role } from '@/entities/user/domain';
import { Prisma } from '.prisma/client';
import UserWhereUniqueInput = Prisma.UserWhereUniqueInput;

export const createUser = async ({
  login,
  password
}: {
  login: string;
  password: string;
}) => {
  const userWithLogin = await userRepository.getUser({
    login
  } as UserWhereUniqueInput);

  if (userWithLogin) {
    return left('user-login-exists' as const);
  }

  const { hash, salt } = await passwordService.hashPassword(password);

  const user = await userRepository.saveUser({
    id: Math.round(Math.random() * 1000),
    login,
    passwordHash: hash,
    salt,
    role: Role.USER
  });

  return right(user);
};
