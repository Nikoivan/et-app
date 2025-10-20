'use server';

import { FC } from 'react';
import { cn } from '@bem-react/classname';

import { Layout } from '../ui/layout';
import { postsServices } from '../services/posts-services';
import { ServerPostCardList } from '@/widgets/posts/ui/server-post-card-list';
import { Title } from '@/shared/ui/title';

const cnHomePosts = cn('HomePosts');

export const HomePosts: FC = async () => {
  const postCards = await postsServices.getPostCards({
    categories: {
      has: 'home'
    }
  });

  return (
    <Layout
      className={cnHomePosts(null, ['p-4'])}
      title={
        <Title type='h2' className={cnHomePosts('Title', ['relative', 'z-3'])}>
          Открой для себя мир путешествий уже сегодня!
        </Title>
      }
      list={<ServerPostCardList list={postCards} />}
    />
  );
};
