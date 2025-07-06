'use client';

import { FC } from 'react';

import { ProfileView } from '@/views/profile';
import { useUserSession } from '@/entities/user';
import { Spinner } from '@/shared/ui/spinner';

const Page: FC = () => {
  const { isLoading, session } = useUserSession();

  return (
    <>
      {!isLoading && !!session && <ProfileView session={session} />}
      {isLoading && <Spinner />}
    </>
  );
};

export default Page;
