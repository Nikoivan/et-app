'use client';

import { PostDomain } from '@/entities/post/server';
import { FC } from 'react';
import { cn } from '@bem-react/classname';
import { PostCard } from '@/features/post/ui/post-card';

type Props = {
  list: PostDomain.PostEntity[];
};

const cnPostFeatureList = cn('PostFeatureList');

export const PostFeatureList: FC<Props> = ({ list }) => {
  // const {} = useQuery({
  //   queryKey: ['posts'],
  //   queryFn: meta => postServices.getPosts
  // });

  return (
    <ul className={cnPostFeatureList()}>
      {list.map(post => (
        <li key={post.id}>
          <PostCard {...post} />
        </li>
      ))}
    </ul>
  );
};
