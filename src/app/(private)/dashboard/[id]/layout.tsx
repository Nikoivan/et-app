import React, { FC, ReactNode } from 'react';
import { redirect } from 'next/navigation';

import { sessionService } from '@/entities/user/services/session';
import { roleUtils } from '@/entities/user';

const DashboardLayout: FC<{ children: ReactNode }> = async ({
  children
}: {
  children: React.ReactNode;
}) => {
  const { session } = await sessionService.verifySessionWithRedirect();
  const hasPermissions = roleUtils.userHasPermissionOn(
    session?.role,
    'dashboard'
  );

  if (!hasPermissions) {
    redirect('/');
  }

  return <>{children}</>;
};

export default DashboardLayout;
