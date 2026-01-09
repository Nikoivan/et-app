'use server';

import { FC, PropsWithChildren } from 'react';

import { DashboardLayout } from '@/views/dashboard/ui/dashboard-layout';
import { SessionDomain } from '@/entities/user/server';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { cn } from '@/shared/lib/css';
import { DashboardTours } from '@/widgets/tours';
import { DashboardPosts } from '@/widgets/posts';
import { DashboardUsers } from '@/widgets/users';
import { FilesLibraryDashboard } from '@/widgets/files-library';

export const DashboardSuperAdmin: FC<
  PropsWithChildren<{ session: SessionDomain.SessionEntity }>
> = async ({ session, children }) => (
  <DashboardLayout className={cn('p-4')} type='superAdmin'>
    <h1 className={cn('text-center')}>
      Панель управления cупер администратора
    </h1>
    <Tabs className={cn('my-3')} defaultValue='tours' orientation='vertical'>
      <TabsList
        className={cn(
          'h-full',
          'w-full',
          'flex-col',
          'items-start',
          'mx-auto',
          'bg-white',
          'dark:bg-black'
        )}
      >
        <TabsTrigger value='tours'>Туры компании</TabsTrigger>
        <TabsTrigger value='posts'>Посты/Легаси туры</TabsTrigger>
        <TabsTrigger value='users'>Пользователи</TabsTrigger>
        <TabsTrigger value='files'>Библиотека файлов</TabsTrigger>
      </TabsList>
      <TabsContent value='tours'>
        <DashboardTours session={session} />
      </TabsContent>
      <TabsContent value='posts'>
        <DashboardPosts session={session} />
      </TabsContent>
      <TabsContent value='users'>
        <DashboardUsers session={session} />
      </TabsContent>
      <TabsContent value='files'>
        <FilesLibraryDashboard session={session} />
      </TabsContent>
    </Tabs>
    {children}
  </DashboardLayout>
);
