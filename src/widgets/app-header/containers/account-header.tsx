'use server';

import { FC } from 'react';

import { Layout } from '@/widgets/app-header/ui/layout';
import { Logo } from '@/widgets/app-header/ui/logo';
import { MainNav } from '@/widgets/app-header/ui/main-nav';
import { Search } from 'lucide-react';

export const AccountHeader: FC = async () => {
  return <Layout nav={<MainNav />} logo={<Logo />} rightNode={<Search />} />;
};
