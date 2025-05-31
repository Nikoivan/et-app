'use server';

import { cn as cnBem } from '@bem-react/classname';
import { FC, ReactNode } from 'react';
import Link from 'next/link';

const cnActivityCard = cnBem('ActivityCard');

type LayoutProps = {
  id: number;
  leftNode: ReactNode;
  titleNode: ReactNode;
  descriptionNode: ReactNode;
};

export const ActivityCardLayout: FC<LayoutProps> = async ({
  id,
  leftNode,
  titleNode,
  descriptionNode
}) => (
  <Link
    className={cnActivityCard(null, [
      'flex',
      'items-center',
      'backdrop-blur-xs'
    ])}
    href={`activity/${id}`}
  >
    <div className={cnActivityCard('LeftWrap', ['basis-1/3'])}>{leftNode}</div>
    <div className={cnActivityCard('RightWrap', ['basis-2/3'])}>
      <div>{titleNode}</div>
      <div>{descriptionNode}</div>
    </div>
  </Link>
);
