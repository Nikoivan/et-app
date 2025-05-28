'use server';

import { Separator } from '@/shared/ui/separator';
import { FC } from 'react';

type ProfilePageProps = { params: { id: string } };

const ProfilePage: FC<ProfilePageProps> = async ({ params: { id } }) => (
  <main className='space-y-6 py-14 container  max-w-[600px]'>
    <div>
      <h3 className='text-lg font-medium'>Профиль</h3>
      <p className='text-sm text-muted-foreground'>
        Это как другие пользователи видят вас на сайте
      </p>
    </div>
    <Separator />
    <div> Форма профайла {id}</div>
    {/*<UpdateProfileForm userId={params.id} />*/}
  </main>
);

export default ProfilePage;
