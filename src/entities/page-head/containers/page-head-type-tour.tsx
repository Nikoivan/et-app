'use server';

import { FC } from 'react';
import Image from 'next/image';
import { cn } from '@bem-react/classname';
import { PageHeadLayout } from '@/entities/page-head/ui/page-head-layout';
import { Title } from '@/shared/ui/title';
import { GeoPoint } from '@/entities/geo-point';

import styles from '../assets/styles.module.scss';

type Props = {
  id: number;
  title: string;
  mainPhoto: string;
};

const cnPageTour = cn('PageTour');

export const PageHeadTour: FC<Props> = async ({ title, mainPhoto }) => (
  <PageHeadLayout
    title={null}
    page='tour'
    content={
      <div
        className={cnPageTour(null, [
          'h-[50vh]',
          'bg-white',
          'relative',
          'pt-38',
          'pb-28'
        ])}
      >
        <Image
          className={cnPageTour('MainImage', [
            styles.PageTour__MainImage,
            'absolute',
            'top-0',
            'right-0',
            'bottom-0',
            'left-0',
            'z-1',
            'w-full',
            'h-full'
          ])}
          alt={title}
          src={mainPhoto}
          width={500}
          height={500}
        />

        <Title
          className={cnPageTour('Title', [
            'z-2',
            'relative',
            'px-4',
            'mt-22',
            'text-left',
            styles.PageTour__Title
          ])}
          type='h1'
        >
          {title}
        </Title>
        <div
          className={cnPageTour('StartPlace', [
            'flex items-center z-2 relative px-4 mt-2'
          ])}
        >
          <GeoPoint />
        </div>
      </div>
    }
  />
);
