'use client';

import { FC } from 'react';
import { cn } from '@bem-react/classname';

const cnCreateActivityForm = cn('CreateActivityForm');

export const CreateActivityForm: FC = () => {
  return <div className={cnCreateActivityForm()}></div>;
};
