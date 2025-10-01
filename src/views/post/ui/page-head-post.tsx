'use server';

import { FC } from 'react';
import Image from 'next/image';
import { cn } from '@bem-react/classname';
import { PageHeadLayout } from '@/entities/page-head/ui/page-head-layout';
import { Title } from '@/shared/ui/title';

import styles from '../assets/styles.module.scss';

type Props = {
  id: number;
  title: string;
  mainPhoto: string;
};

const cnPagePost = cn('PagePost');

export const PageHeadPost: FC<Props> = async ({ title, mainPhoto }) => (
  <PageHeadLayout
    title={null}
    page='tour'
    content={
      <div
        className={cnPagePost(null, [
          'h-[75vh]',
          'bg-white',
          'relative',
          'pt-[38vh]',
          'pb-28'
        ])}
      >
        <Image
          className={cnPagePost('MainImage', [
            styles.PagePost__MainImage,
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
        <div
          className={cnPagePost('Filter', [
            'absolute',
            'z-2',
            'top-0',
            'right-0',
            'bottom-0',
            'left-0',
            'bg-[#0000003a]'
          ])}
        ></div>

        <Title
          className={cnPagePost('Title', [
            'z-2',
            'relative',
            'px-4',
            'mt-22',
            'text-left',
            styles.PagePost__Title
          ])}
          type='h1'
        >
          {title}
        </Title>
      </div>
    }
  />
);
