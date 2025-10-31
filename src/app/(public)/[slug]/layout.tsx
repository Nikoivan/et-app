'use server';

import { FC, PropsWithChildren } from 'react';

import type { Metadata } from 'next';
import { getMetadataByEither } from '@/shared/lib/metadata-utils';
import { ServerPostProps } from '@/shared/model/types';
import { postServices } from '@/features/post/services/post-services';
import { PostViewLayout } from '@/views/post/server';

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const either = await postServices.getPostBySlug(slug);

  return await getMetadataByEither(either);
}

const Layout: FC<PropsWithChildren<ServerPostProps>> = async ({
  children,
  ...props
}) => <PostViewLayout {...props}>{children}</PostViewLayout>;

export default Layout;
