'use server';

import { FC, PropsWithChildren } from 'react';
import { AppHeader } from '@/widgets/app-header/containers/app-header';

const AuthLayout: FC<PropsWithChildren> = async ({ children }) => (
  <>
    <AppHeader variant='auth' />
    <div className='w-full mt-52 flex items-center justify-center'>
      {children}
    </div>
  </>
);

export default AuthLayout;
