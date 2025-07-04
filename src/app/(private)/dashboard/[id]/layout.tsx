import React, { FC, ReactNode } from 'react';

const DashboardLayout: FC<{ children: ReactNode }> = ({
  children
}: {
  children: React.ReactNode;
}) => <>{children}</>;

export default DashboardLayout;
