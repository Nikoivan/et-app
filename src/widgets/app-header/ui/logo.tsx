'use server';

import { FC } from 'react';
import Link from 'next/link';
import { cn } from '@bem-react/classname';
import { LogoIcon } from '@/shared/ui/logo-icon';

const cnLogo = cn('Logo');

export const Logo: FC = async () => (
  <Link className={cnLogo()} href='/'>
    <LogoIcon />
  </Link>
);
