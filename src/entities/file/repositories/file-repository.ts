import { dbClient } from '@/shared/lib/db';

const getFile = (id: number) => dbClient.file.findUnique({ where: { id } });

export const fileRepository = { getFile };
