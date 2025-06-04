import { FC, ReactNode } from 'react';
import { cn } from '@bem-react/classname';

import styles from '../assets/styles.module.scss';

const cnSocialItem = cn('SocialItem');

type SocialItemProps = {
  icon: ReactNode;
};

export const SocialItem: FC<SocialItemProps> = ({ icon }) => (
  <div className={cnSocialItem(null, [styles.SocialItem])}>{icon}</div>
);
