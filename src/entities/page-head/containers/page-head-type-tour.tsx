'use server';

import { FC } from 'react';
import { PageHeadLayout } from '@/entities/page-head/ui/page-head-layout';
import { Title } from '@/shared/ui/title';
import { cn } from '@bem-react/classname';
import { GeoPoint } from '@/entities/geo-point';
import { FavouriteLabel } from '@/entities/favourite';
import Image from 'next/image';

type Props = {
  id: number;
  title: string;
  mainPhoto: string;
};

const cnPageTour = cn('PageTour');

export const PageHeadTour: FC<Props> = async ({ id, title, mainPhoto }) => (
  <PageHeadLayout
    title={null}
    page='tour'
    content={
      <div className={cnPageTour(null, ['h-[70vh]', 'bg-white', 'relative'])}>
        <Image
          className={cnPageTour('MainImage', [
            'absolute',
            'top-0',
            'right-0',
            'bottom-0',
            'left-0'
          ])}
          alt={title}
          src={mainPhoto}
        />
        <div className='flex items-center justify-between'>
          <button>LEFT ARROW</button>
          <FavouriteLabel id={id} />
        </div>
        <Title type='h1'>{title}</Title>
        <div className={cnPageTour('GeoPoint')}>
          <GeoPoint />
        </div>
      </div>
    }
  />
);
