import { FC, PropsWithChildren } from 'react';
import { cn } from '@bem-react/classname';

import styles from '../assets/styles.module.scss';
import { PropsWithClassNames } from '@/shared/model/types';

const cnRow = cn('Row');

export const Row: FC<PropsWithChildren & PropsWithClassNames> = ({
  children
}) => <div className={cnRow(null, [styles.Row])}>{children}</div>;
