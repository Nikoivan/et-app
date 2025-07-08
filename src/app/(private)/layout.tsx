import { FC, PropsWithChildren } from 'react';
import { redirect } from 'next/navigation';

import { routes } from '@/kernel/routes';
import { sessionService } from '@/entities/user/services/session';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/css';

const PrivateLayout: FC<PropsWithChildren> = async ({ children }) => {
  const { session } = await sessionService.verifySessionWithRedirect();

  return (
    <div className={cn('bg-gray-900 w-full h-screen')}>
      <div className='hidden'>{session?.login}</div>
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
    </div>
  );
};

export default PrivateLayout;
