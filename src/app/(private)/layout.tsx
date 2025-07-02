import { FC, PropsWithChildren } from 'react';
import { cn } from '@/shared/lib/css';

const PrivateLayout: FC<PropsWithChildren> = ({ children }) => {
  return <div className={cn('bg-gray-900 w-full h-screen')}>{children}</div>;
};

export default PrivateLayout;
