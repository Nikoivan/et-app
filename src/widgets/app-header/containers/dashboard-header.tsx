'use server';

import { FC } from 'react';

import { Layout } from '@/widgets/app-header/ui/layout';
import { Logo } from '@/widgets/app-header/ui/logo';
import { ToggleTheme } from '@/features/theme/toogle-theme';
import { MainNav } from '@/widgets/app-header/ui/main-nav';
import { Profile } from '@/widgets/app-header/ui/profile';

type AppHeaderProps = {
  variant?: 'auth' | 'private' | 'public';
};

export const DashboardHeader: FC<AppHeaderProps> = async ({ variant }) => {
  const isProfile = variant !== 'auth';

  return (
    <Layout
      nav={<MainNav />}
      logo={<Logo />}
      profile={isProfile && <Profile />}
      actions={<ToggleTheme />}
    />
  );
};
