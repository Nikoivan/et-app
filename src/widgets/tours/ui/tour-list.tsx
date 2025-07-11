'use client';

import { FC } from 'react';

import { TourDomain } from '@/entities/tour/server';
import { cn } from '@bem-react/classname';
import TourFeature from '@/features/tour';

type TourListProps = {
  list: TourDomain.TourEntity[];
};

const cnTourList = cn('TourList');

export const TourList: FC<TourListProps> = ({ list }) => (
  <ul className={cnTourList()}>
    {list.map(tour => (
      <li key={tour.id}>
        <TourFeature {...tour} />
      </li>
    ))}
  </ul>
);
