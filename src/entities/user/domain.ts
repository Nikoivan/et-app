import { UserId } from '@/kernel/ids';

export enum Role {
  USER = 'USER',
  GUIDE = 'GUIDE',
  ADMIN = 'ADMIN',
  CONTRIBUTOR = 'CONTRIBUTOR',
  SUPER_ADMIN = 'SUPER_ADMIN'
}

export type Roles = {
  [K in keyof Role]: Role[K] extends string ? Role[K] : never;
}[keyof Role];

const test: Roles = 'USER';

console.log(test);

export type UserEntity = {
  id: UserId;
  login: string;
  passwordHash: string;
  salt: string;
  role: string;
  firstName?: string;
  lastName?: string;
  avatarPhotoId?: number;
  email?: string;
  rating?: number;
};

export type UserEntityUpdate = Partial<UserEntity> & { id: number };

export type SessionEntity = Omit<UserEntity, 'passwordHash'> & {
  expiredAt: string;
};

export const userToSession = (
  user: UserEntity,
  expiredAt: string
): SessionEntity => {
  // Security
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash, ...userSession } = user;

  return {
    ...userSession,
    expiredAt
  };
};
