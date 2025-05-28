'use server';

import { FC } from 'react';
import Link from 'next/link';
import { cn } from '@bem-react/classname';

const cnMainNav = cn('MainNav');

export const MainNav: FC = async () => (
  <nav
    className={cnMainNav(null, [
      'flex items-start md:items-center gap-6 text-sm font-medium flex-col md:flex-row'
    ])}
  >
    <Link
      className='transition-colors hover:text-foreground/80 text-foreground/60'
      href='/tours'
    >
      Туры
    </Link>
    <Link
      className='transition-colors hover:text-foreground/80 text-foreground/60'
      href='/services'
    >
      Услуги
    </Link>
    <Link
      className='transition-colors hover:text-foreground/80 text-foreground/60'
      href='/posts'
    >
      Интересное
    </Link>
  </nav>
);
