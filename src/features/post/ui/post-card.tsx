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
import { BadgeRussianRuble, HeartIcon, UserPen, XCircle } from 'lucide-react';
import { cn } from '@/shared/lib/css';
import { ConfirmDialog } from '@/entities/confirm-dialog';
import { PostDomain } from '@/entities/post/server';
import { postApi } from '@/features/post/api/post-api';
import { useMutation } from '@tanstack/react-query';

export const PostCard: FC<PostDomain.PostEntity> = props => {
  const { id, title, image, content, rating, price } = props;
  const mutation = useMutation({
    mutationFn: postApi.deletePost,
    mutationKey: ['posts']
  });

  const onDelete = async () => {
    console.log('onDelete');
    mutation.mutate(id);
  };

  //TODO: доделать корректно, заставить queryClient сделать новый запрос

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
        <Image src={image} alt={title} width={400} height={400} />
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
        </Button>
        <ConfirmDialog
          title='Удаление тура'
          description='Вы уверенны, что хотите удалить этот тур?'
          triggger={
            <Button variant='ghost' size='sm'>
              <XCircle className='size-4' />
            </Button>
          }
          onSubmit={onDelete}
        />
      </CardFooter>
    </Card>
  );
};
