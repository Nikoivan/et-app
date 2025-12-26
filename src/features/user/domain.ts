import { User } from '../../../generated/prisma/client';

export type GetUserResponse = {
  pagesCount: number;
  users: Omit<User, 'passwordHash' | 'salt'>[];
};
