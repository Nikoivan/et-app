import { FC, PropsWithChildren } from 'react';

import type { Metadata } from 'next';
import { tourServices } from '@/kernel/tour/server';
import { getMetadataByEither } from '@/shared/lib/metadata-utils';
import { ServerTourProps } from '@/shared/model/types';
import { TourViewLayout } from '@/views/tour/server';

export async function generateMetadata({
  params
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const either = await tourServices.getTourById(Number(id));

  return await getMetadataByEither(either);
}

const Layout: FC<PropsWithChildren<ServerTourProps>> = async ({
  children,
  ...props
}) => <TourViewLayout {...props}>{children}</TourViewLayout>;

export default Layout;
