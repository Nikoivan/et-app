import { UserId } from '@/kernel/ids';

export enum Role {
  USER = 'USER',
  GUIDE = 'GUIDE',
  ADMIN = 'ADMIN',
  CONTRIBUTOR = 'CONTRIBUTOR',
  SUPER_ADMIN = 'SUPER_ADMIN'
}

export type UserEntity = {
  id: UserId;
  login: string;
  passwordHash: string;
  salt: string;
  role: string;
};

export type SessionEntity = {
  id: UserId;
  login: string;
  role: string;
  expiredAt: string;
};

export const userToSession = (
  user: UserEntity,
  expiredAt: string
): SessionEntity => {
  return {
    id: user.id,
    login: user.login,
    role: user.role,
    expiredAt
  };
};
