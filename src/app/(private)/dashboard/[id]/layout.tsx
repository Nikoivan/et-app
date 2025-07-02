import React, { FC, ReactNode } from 'react';
import { sessionService } from '@/entities/user/services/session';
import { redirect } from 'next/navigation';
import { routes } from '@/kernel/routes';
import { Button } from '@/shared/ui/button';

const DashboardLayout: FC<{ children: ReactNode }> = ({
  children
}: {
  children: React.ReactNode;
}) => (
  <>
    <form
      className='hidden'
      action={async () => {
        'use server';
        await sessionService.deleteSession();
        redirect(routes.signIn());
      }}
    >
      <Button type='submit' variant='outline'>
        Выйти
      </Button>
    </form>
    {children}
  </>
);

export default DashboardLayout;
