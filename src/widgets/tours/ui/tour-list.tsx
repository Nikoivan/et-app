'use client';

import { FC } from 'react';
import { cn } from '@bem-react/classname';

import { TourDomain } from '@/entities/tour/server';
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
