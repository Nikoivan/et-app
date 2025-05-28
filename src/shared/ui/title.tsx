import { FC, PropsWithChildren } from 'react';
import { cn } from '@/shared/lib/css';

import styles from '@/shared/assets/styles.module.scss';

type TitleProps = {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
};

export const Title: FC<PropsWithChildren<TitleProps>> = ({
  children,
  type,
  className
}) => {
  const Tag = type;

  return (
    <Tag
      className={cn(
        className,
        styles.Title,
        'text-center',
        'tracking-wider',
        Tag === 'h2' ? 'text-3xl' : 'text-xl'
      )}
    >
      {children}
    </Tag>
  );
};
