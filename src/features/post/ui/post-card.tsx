'use client';

import { FC } from 'react';
import Image from 'next/image';

import { Button } from '@/shared/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/shared/ui/card';
import { BadgeRussianRuble, HeartIcon } from 'lucide-react';
import { cn } from '@/shared/lib/css';
import { PostDomain } from '@/entities/post/server';

import mockImage from '@/shared/assets/images/backgrounds/bg-1.jpg';
import { FeaturePost } from '@/features/post/ui/feature-post';
import { FormDialogDomain } from '@/entities/form-dialog';
import { DeletePost } from '@/features/post/ui/delete-post';

export const PostCard: FC<PostDomain.PostEntity> = props => {
  const { id, title, image, content, rating, price } = props;

  return (
    <Card className='max-w-md'>
      <CardHeader className='flex items-center justify-between gap-3'>
        <div className='flex flex-col gap-0.5'>
          <CardTitle className='flex items-center gap-1 text-sm'>
            Название поста
          </CardTitle>
          <CardDescription>{title}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className='space-y-6 text-sm'>
        <Image
          src={image?.length ? image : mockImage}
          alt={title}
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
        <FeaturePost
          type='edit'
          initialData={props as unknown as FormDialogDomain.FormData}
        />
        <DeletePost id={id} />
      </CardFooter>
    </Card>
  );
};
