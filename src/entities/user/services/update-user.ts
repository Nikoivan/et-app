import { Either, left, Right, right } from '@/shared/lib/either';
import { userRepository } from '../repositories/user';
import { UserEntity, UserEntityUpdate } from '@/entities/user/domain';
import { WithoutNull } from '@/shared/model/types';

export const updateUser = async (
  user: UserEntityUpdate
): Promise<Either<string, WithoutNull<UserEntity>>> => {
  const updatedUser = await userRepository.updateUser(user);

  if (updatedUser) {
    return left('Ошибка обновления данных пользователя');
  }

  return right(user) as Right<WithoutNull<UserEntity>>;
};
