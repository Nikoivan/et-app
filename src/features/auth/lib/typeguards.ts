import { UserEntity } from '@/entities/user/domain';

export function isUserEntity(value: unknown): value is UserEntity {
  return (
    !!value &&
    typeof value === 'object' &&
    'id' in value &&
    typeof value.id === 'string' &&
    'login' in value &&
    typeof value.login === 'string'
  );
}
