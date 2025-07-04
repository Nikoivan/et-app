import { FC } from 'react';
import { cn } from '@bem-react/classname';
import Image from 'next/image';

type Props = {
  avatarPhoto?: string;
};

const cnProfileAvatar = cn('ProfileAvatar');

export const ProfileAvatar: FC<Props> = ({ avatarPhoto }) => (
  <div className={cnProfileAvatar(null, ['w-full'])}>
    {!!avatarPhoto && (
      <Image src={avatarPhoto} alt='Фото профиля' width={200} height={200} />
    )}
  </div>
);
