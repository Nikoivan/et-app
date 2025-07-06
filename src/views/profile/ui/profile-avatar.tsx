import { FC } from 'react';
import { cn } from '@bem-react/classname';
import Image from 'next/image';

import mockAvaSrc from '@/views/profile/assets/images/mockAvatar.jpg';

type Props = {
  avatarPhoto?: string;
};

const cnProfileAvatar = cn('ProfileAvatar');

export const ProfileAvatar: FC<Props> = ({ avatarPhoto }) => (
  <div className={cnProfileAvatar(null, ['w-full'])}>
    <Image
      className={cnProfileAvatar('Image', ['rounded-full'])}
      src={avatarPhoto || mockAvaSrc}
      alt='Фото профиля'
      width={200}
      height={200}
    />
  </div>
);
