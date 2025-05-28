'use server';

import { FC, PropsWithChildren } from 'react';
import { AppHeader } from '@/widgets/app-header/containers/app-header';

const Layout: FC<PropsWithChildren> = async ({ children }) => (
  <>
    <AppHeader variant='public' />
    {children}
  </>
);

export default Layout;
