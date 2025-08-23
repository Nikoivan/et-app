'use server';

import { FC } from 'react';
import { cn } from '@bem-react/classname';

import { ServerLayout } from '@/widgets/tours/ui/server-layout';
import { getPopularTours } from '@/widgets/tours/services/get-popular-tours';
import { ServerTourCard } from '@/features/tour/server';
import { Title } from '@/shared/ui/title';

import styles from '../assets/styles.module.scss';

const cnPopularTours = cn('PopularTours');

export const PopularTours: FC = async () => {
  const tours = await getPopularTours();

  return (
    <ServerLayout
      className={cnPopularTours(null, ['text-center p-4', styles.PopularTours])}
      title={
        <Title type='h2' className={cnPopularTours('Title')}>
          Популярные туры
        </Title>
      }
      list={
        <ul className='mt-[10%] flex flex-col gap-10'>
          {tours.map(tour => (
            <li key={tour.id}>
              <ServerTourCard {...tour} />
            </li>
          ))}
        </ul>
      }
    />
  );
};
