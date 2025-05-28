'use client';

import { FC, PropsWithChildren } from 'react';
import { AppHeader } from '@/widgets/app-header/containers/app-header';

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <div className='w-full mt-52 flex items-center justify-center'>
    <AppHeader variant='private' />
    {children}
  </div>
);

export default Layout;
