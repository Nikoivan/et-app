'use server';

import { FC, PropsWithChildren } from 'react';

import { DashboardLayout } from '@/views/dashboard/ui/dashboard-layout';
import { DashboardTours } from '@/widgets/tours';
import { DashboardActivities } from '@/widgets/activities';
import { DashboardPosts } from '@/widgets/posts';
import { SessionDomain } from '@/entities/user/server';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { cn } from '@/shared/lib/css';

export const DashboardSuperAdmin: FC<
  PropsWithChildren<{ session: SessionDomain.SessionEntity }>
> = async ({ session, children }) => (
  <DashboardLayout className={cn('p-4')} type='superAdmin'>
    <h1 className={cn('text-center')}>
      Панель управления cупер администратора
    </h1>
    <Tabs className={cn('my-3')} defaultValue='tours'>
      <TabsList className={cn('mx-auto', 'bg-white', 'dark:bg-black')}>
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
