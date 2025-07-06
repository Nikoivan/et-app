'use client';

import { FC } from 'react';
import { cn } from '@bem-react/classname';
import { ProfileAvatar } from '@/views/profile/ui/profile-avatar';
import Link from 'next/link';
import { permissionsServices } from '@/features/dashboard';

const cnProfileView = cn('ProfileView');

export const ProfileLayout: FC<{ id: number; role: string }> = ({
  id,
  role
}) => {
  return (
    <main className={cnProfileView(null, ['px-4', 'pt-[15vh]'])}>
      <h1>Профиль</h1>
      <ProfileAvatar />
      {permissionsServices.userHasPermissionsToDashboard(role) && (
        <Link href={`/dashboard/${id}`}>Мои туры</Link>
      )}
    </main>
  );
};
