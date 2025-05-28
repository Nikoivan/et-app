'use server';

import { FC } from 'react';
import { cn } from '@bem-react/classname';
import { Layout } from '@/widgets/tours/ui/layout';

import { getPopularTours } from '@/widgets/tours/services/get-popular-tours';
import { ServerTourCard } from '@/features/tour/server';
import styles from '../assets/styles.module.scss';

import { Title } from '@/shared/ui/title';

const cnPopularTours = cn('PopularTours');

export const PopularTours: FC = async () => {
  const tours = await getPopularTours();

  return (
    <Layout
      className={cnPopularTours(null, ['text-center p-4', styles.PopularTours])}
      title={
        <Title type='h2' className={cnPopularTours('Title')}>
          Популярные туры
        </Title>
      }
      list={
        <ul className='mt-[10%] flex flex-col gap-10'>
          {tours.map(tour => (
            <ServerTourCard {...tour} key={tour.id} />
          ))}
        </ul>
      }
    />
  );
};
