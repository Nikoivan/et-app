'use server';

import { FC, PropsWithChildren } from 'react';

const AuthLayout: FC<PropsWithChildren> = async ({ children }) => (
  <div className='w-screen h-screen pt-[15vh] flex justify-center bg-zinc-800'>
    {children}
  </div>
);

export default AuthLayout;
