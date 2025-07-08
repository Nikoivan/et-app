'use server';

import { FC } from 'react';
import { DashboardView } from '@/views/dashboard';
import { sessionService } from '@/entities/user/server';

const Page: FC = async () => {
  const { session } = await sessionService.verifySession();

  return <>{!!session && <DashboardView session={session} />}</>;
};

export default Page;
