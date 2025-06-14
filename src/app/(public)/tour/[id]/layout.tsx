import { FC, PropsWithChildren } from 'react';
import { TourViewLayout } from '@/views/tour/ui/tour-layout';
import type { Metadata } from 'next';
import { tourServices } from '@/kernel/tour/server';
import { getMetadataByEither } from '@/shared/lib/metadata-utils';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const either = await tourServices.getTourById(Number(id));

  return await getMetadataByEither(either);
}

const Layout: FC<PropsWithChildren<Props>> = async ({ children, ...props }) => (
  <TourViewLayout {...props}>{children}</TourViewLayout>
);

export default Layout;
