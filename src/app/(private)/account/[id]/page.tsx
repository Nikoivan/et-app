'use server';

import { FC } from 'react';

import { ProfileView } from '@/views/profile';
import { getCurrentUser } from '@/entities/user/services/get-current-user';

const Page: FC = async () => {
  const user = await getCurrentUser();

  return <>{!!user && <ProfileView user={user} />}</>;
};

export default Page;
