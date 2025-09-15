'use server';

import { FC } from 'react';
import { DashboardGuide, DashboardSuperAdmin } from '@/views/dashboard/server';
import { sessionService } from '@/entities/user/server';

const Page: FC = async () => {
  const { session } = await sessionService.verifySession();

  return (
    <>
      {!!session && (
        <>
          {session.role === 'GUIDE' && <DashboardGuide session={session} />}
          {session.role === 'SUPER_ADMIN' && (
            <DashboardSuperAdmin session={session} />
          )}
        </>
      )}
    </>
  );
};

export default Page;
