'use client';

import { FC } from 'react';
import { cn } from '@bem-react/classname';

const cnProfileView = cn('ProfileView');

export const ProfileLayout: FC = () => {
  return (
    <main className={cnProfileView(null, ['px-4', 'pt-[15vh]'])}>
      <h1>Профиль</h1>
    </main>
  );
};
