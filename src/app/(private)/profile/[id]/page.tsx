export default async function Page({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  console.log('id', id);
  return (
    <main className='flex flex-col grow pt-24 w-full max-w-[400px] mx-auto'>
      ПРОФИЛЬ ПОЛЬЗОВАТЕЛЯ
    </main>
  );
}
