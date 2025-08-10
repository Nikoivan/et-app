'use client';

import { FC } from 'react';
import { cn } from '@bem-react/classname';

import { ActivityDomain } from '@/entities/activity';
import { ActivityFeature } from '@/features/activities/server';

type ActivitiesListProps = {
  list: ActivityDomain.ActivityEntity[];
};

const cnActivitiesList = cn('ActivitiesList');

export const ActivitiesList: FC<ActivitiesListProps> = ({ list }) => (
  <ul className={cnActivitiesList()}>
    {list.map(item => (
      <li key={item.id}>
        <ActivityFeature {...item} />
      </li>
    ))}
  </ul>
);
