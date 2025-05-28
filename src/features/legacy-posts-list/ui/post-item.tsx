'use server';

import { cn } from '@bem-react/classname';
import { FC } from 'react';

const cnLegacyPostItem = cn('LegacyPostItem');

type LegacyPostItemProps = {
  post: LegacyPostsListElement;
  onDelete?: () => void;
};

export const LegacyPostItem: FC<LegacyPostItemProps> = async ({
  post: { postContent, postTitle }
}) => (
  <div className={cnLegacyPostItem()}>
    Старый пост
    <div className={cnLegacyPostItem('Title')}>
      {postTitle || 'Название поста'}
    </div>
    <div className={cnLegacyPostItem('Content')}>
      {postContent || 'Тут должен быть контент'}
    </div>
  </div>
);
