'use client';

import { FC, PropsWithChildren } from 'react';

import { AppHeader } from '@/widgets/app-header/containers/app-header';
import { ServerFCProps } from '@/shared/model/types';
import ProfilePage from '@/app/(private)/profile/[id]/page';

const Layout: FC<PropsWithChildren<ServerFCProps>> = ({
  children,
  ...props
}) => (
  <div className='w-full mt-52 flex items-center justify-center'>
    <AppHeader variant='private' />
    <ProfilePage {...props}>{children}</ProfilePage>
  </div>
);

export default Layout;
