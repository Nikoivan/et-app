import { postServices } from '@/features/post/services/post-services';
import { FC } from 'react';
import { PostView } from '@/views/post/server';

export const dynamic = 'force-static'; // жёстко SSG
export const revalidate = false;

const Page: FC<{
  params: Promise<{ route: string }>;
}> = async ({ params }) => {
  const { route } = await params;
  const either = await postServices.getPostByRoute(route);

  return <PostView either={either} />;
};

export default Page;
