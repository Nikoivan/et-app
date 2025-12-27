'use client';

import { FC } from 'react';
import { cn } from '@bem-react/classname';
import { UserCard } from '@/features/user/ui/user-card';
import { useDeleteUser } from '@/features/user/hooks/use-delete-user';

const cnUserFeature = cn('UserFeature');

export const UserFeature: FC<{
  user: Omit<
    {
      id: number;
      login: string;
      passwordHash: string;
      salt: string;
      role: string;
      phone: string | null;
      firstName: string | null;
      lastName: string | null;
      avatarPhotoId: number | null;
      email: string | null;
      rating: number | null;
    },
    'passwordHash' | 'salt'
  >;
}> = ({ user }) => {
  const onDelete = useDeleteUser({ id: user.id });

  return (
    <div className={cnUserFeature(null, ['w-full'])}>
      <UserCard user={user} onDelete={onDelete} />
    </div>
  );
};
