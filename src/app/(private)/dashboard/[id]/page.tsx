import { DashboardView } from '@/views/dashboard/containers/dashboard-view';

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <DashboardView>USER {id}</DashboardView>;
}
