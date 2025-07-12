'use client';

import { FC } from 'react';

import { SessionDomain } from '@/entities/user/server';
import { cn } from '@bem-react/classname';
import { Button } from '@/shared/ui/button';

const cnCreateTourForm = cn('CreateTourForm');

export const CreateTourForm: FC<{
  session: SessionDomain.SessionEntity;
}> = () => {
  return (
    <div className={cnCreateTourForm(null, ['text-center'])}>
      <Button variant='outline'>Создать тур</Button>
    </div>
  );
};
