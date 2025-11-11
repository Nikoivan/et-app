import { postServices } from '@/features/post/services/post-services';
import { FC } from 'react';
import { PostView } from '@/views/post/server';

const Page: FC<{
  params: Promise<{ slug: string }>;
}> = async ({ params }) => {
  const { slug } = await params;
  const either = await postServices.getPostBySlug(slug);

  return <PostView either={either} />;
};

export default Page;
