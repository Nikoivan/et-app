'use server';

import { FC } from 'react';

import { PostCardEntity } from '../domain';
import { PostCard } from '../ui/post-card';

export const ServerPostCard: FC<PostCardEntity> = async props => (
  <PostCard {...props} />
);
