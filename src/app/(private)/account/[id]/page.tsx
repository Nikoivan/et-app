'use server';

import { FC } from 'react';

import { ProfileView } from '@/views/profile';
import { getCurrentUser } from '@/entities/user/services/get-current-user';
import { redirect } from 'next/navigation';

const Page: FC = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/sign-in');
  }

  return <>{!!user && <ProfileView user={user} />}</>;
};

export default Page;
