'use server';

import { FC, PropsWithChildren } from 'react';

import { DashboardLayout } from '@/views/dashboard/ui/dashboard-layout';
import { DashboardTours } from '@/widgets/tours';
import { SessionEntity } from '@/entities/user/domain';
import { cn } from '@/shared/lib/css';
import { DashboardActivities } from '@/widgets/activities';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { DashboardPosts } from '@/widgets/posts';

export const DashboardSuperAdmin: FC<
  PropsWithChildren<{ session: SessionEntity }>
> = async ({ session, children }) => (
  <DashboardLayout className={cn('p-4')} type='superAdmin'>
    <h1 className={cn('text-center')}>
      Панель управления cупер администратора
    </h1>
    <Tabs className={cn('my-3')} defaultValue='tours'>
      <TabsList className={cn('bg-white', 'dark:bg-black')}>
        <TabsTrigger value='tours'>Туры компании</TabsTrigger>
        <TabsTrigger value='posts'>Посты/Легаси туры</TabsTrigger>
        <TabsTrigger value='guideTours'>Туры гидов</TabsTrigger>
      </TabsList>
      <TabsContent value='tours'>
        <DashboardTours session={session} />
        <DashboardActivities session={session} />
      </TabsContent>
      <TabsContent value='posts'>
        <DashboardPosts />
      </TabsContent>
      <TabsContent value='guideTours'>DashboardGuideTours</TabsContent>
    </Tabs>

    {children}
  </DashboardLayout>
);
