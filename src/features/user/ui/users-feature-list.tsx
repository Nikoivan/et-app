'use client';

import { FC } from 'react';
import { cn } from '@bem-react/classname';

const cnUserFeatureList = cn('UserFeatureList');

export const UserFeatureList: FC = () => {
  return (
    <div className={cnUserFeatureList()}>
      <span>userFeatureList</span>
    </div>
  );
};
