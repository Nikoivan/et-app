'use client';

import { FC } from 'react';
import Image from 'next/image';

import { TourDomain } from '@/entities/tour/server';
import { Button } from '@/shared/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/shared/ui/card';
import { BadgeRussianRuble, HeartIcon, UserPen } from 'lucide-react';
import { cn } from '@/shared/lib/css';

export const TourCard: FC<TourDomain.TourEntity> = props => {
  const { title, mainPhoto, content, rating, price } = props;

  return (
    <Card className='max-w-md'>
      <CardHeader className='flex items-center justify-between gap-3'>
        <div className='flex flex-col gap-0.5'>
          <CardTitle className='flex items-center gap-1 text-sm'>
            Название тура
          </CardTitle>
          <CardDescription>{title}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className='space-y-6 text-sm'>
        <Image
          src={mainPhoto.source}
          alt={mainPhoto.title}
          width={400}
          height={400}
        />
        <p>{content.slice(0, 250)} ...</p>
      </CardContent>
      <CardFooter className='flex justify-end items-center gap-1'>
        <Button variant='ghost' size='sm'>
          <HeartIcon className={cn('size-4')} />
          {rating}
        </Button>
        <Button variant='ghost' size='sm'>
          <BadgeRussianRuble className='size-4' />
          {price}
        </Button>
        <Button variant='ghost' size='sm'>
          <UserPen className='size-4' />
          Редактировать
        </Button>
      </CardFooter>
    </Card>
  );
};
