'use client';

import { FC } from 'react';
import { useTourList } from '@/features/tour/hooks/use-tour-list';
import { cn } from '@bem-react/classname';
import { TourCard } from '@/features/tour';

const cnTourFeatureList = cn('TourFeatureList');

export const TourFeatureList: FC = () => {
  const { data, isFetching, tools, pagination, cursor } = useTourList();

  return (
    <>
      {tools}
      {!!data?.tours?.length && (
        <div
          className={cnTourFeatureList('Wrapper', [
            isFetching ? 'opacity-50' : ''
          ])}
        >
          {pagination}
          <ul className={cnTourFeatureList()}>
            {data.tours.map(tour => (
              <li
                className={cnTourFeatureList('Item', [
                  'flex',
                  'justify-center',
                  'mt-3'
                ])}
                key={tour.id}
              >
                <TourCard {...tour} />
              </li>
            ))}
          </ul>
        </div>
      )}
      {cursor}
    </>
  );
};
