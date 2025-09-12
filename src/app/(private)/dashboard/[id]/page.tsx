'use server';

import { FC } from 'react';
import { DashboardGuide } from '@/views/dashboard/server';
import { sessionService } from '@/entities/user/server';

const Page: FC = async () => {
  const { session } = await sessionService.verifySession();

  return <>{!!session && <DashboardGuide session={session} />}</>;
};

export default Page;
