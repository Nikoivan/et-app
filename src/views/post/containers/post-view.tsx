'use server';

import { FC } from 'react';

import { postServices } from '@/features/post/services/post-services';
import { PostMain } from '@/views/post/ui/post-main';

type Props = {
  params: Promise<{
    route: string;
  }>;
};

export const PostView: FC<Props> = async ({ params }) => {
  const { route } = await params;
  const either = await postServices.getPostByRoute(route);

  return (
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
};
