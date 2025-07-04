'use client';

import { FC, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { roleUtils, useUserSession } from '@/entities/user';
import { Spinner } from '@/shared/ui/spinner';

const Page: FC = () => {
  const { session, isLoading } = useUserSession();
  const router = useRouter();

  useEffect(() => {
    if (
      !session ||
      !roleUtils.userHasPermissionOn(session?.role, 'dashboard')
    ) {
      router.back();
    }
  }, []);

  return (
    <>
      <div>Page Dashboard</div>
      {isLoading && <Spinner />}
    </>
  );
};

export default Page;
