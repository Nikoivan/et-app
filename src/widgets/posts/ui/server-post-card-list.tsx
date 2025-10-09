'use server';

import { PostDomain, ServerPostCard } from '@/entities/post/server';
import { FC } from 'react';
import { cn } from '@bem-react/classname';

type Props = {
  list: PostDomain.PostCardEntity[];
};

const cnPostCardList = cn('ServerPostCardList');

export const ServerPostCardList: FC<Props> = async ({ list }) => (
  <ul className={cnPostCardList()}>
    {list.map(card => (
      <li key={card.id}>
        <ServerPostCard {...card} />
      </li>
    ))}
  </ul>
);
