'use server';

import { FC, PropsWithChildren } from 'react';

const AuthLayout: FC<PropsWithChildren> = async ({ children }) => (
  <div className='w-full mt-52 flex items-center justify-center'>
    {children}
  </div>
);

export default AuthLayout;
