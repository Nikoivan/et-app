import { sessionService, updateUser } from '@/entities/user/server';

export const makeSuperAdminAction = async (id: number) => {
  const result = await updateUser({
    id,
    role: 'SUPER_ADMIN'
  });

  if (result.type !== 'right') {
    return;
  }

  await sessionService.updateSession(result.value);
};
