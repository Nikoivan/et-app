'use server';

import { FC } from 'react';
import { PostView } from '@/views/post/server';

const Page: FC<{
  params: Promise<{ route: string }>;
}> = async props => <PostView {...props} />;

export default Page;
