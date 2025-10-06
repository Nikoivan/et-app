'use server';

import { FC } from 'react';
import { PostMain } from '@/views/post/ui/post-main';

import { Either } from '@/shared/lib/either';
import { PostDomain } from '@/entities/post/server';

type Props = {
  either: Either<string, PostDomain.PostEntity>;
};

export const PostView: FC<Props> = async ({ either }) => (
  <>
    {either.type === 'right' ? (
      <PostMain {...either.value} />
    ) : (
      <div className='flex justify-center items-center'>
        Ошибка при загрузке страницы... попробуйте вновь
      </div>
    )}
  </>
);
