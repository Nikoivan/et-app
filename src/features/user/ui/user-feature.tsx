'use client';

import { SessionDomain } from '@/entities/user/server';
import { FC } from 'react';
import { cn } from '@bem-react/classname';
import { UserCard } from '@/features/user/ui/user-card';

const cnUserFeature = cn('UserFeature');

const UserFeature: FC<{ user: SessionDomain.UserEntity }> = ({ user }) => {
  const onDelete = (id: number) => {
    console.log({ id });
  };

  return (
    <div className={cnUserFeature()}>
      <UserCard user={user} onDelete={onDelete} />
    </div>
  );
};
