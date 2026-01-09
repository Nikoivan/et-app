import { dbClient } from '@/shared/lib/db';
import { FileProps } from '@/entities/file/domain';
import { handleError, handleSuccess } from '@/shared/lib/response-utils';

const LIMIT_FILES = 10;

export const getFiles = async () => {
  console.log('getFiles');
  try {
    const files = await dbClient.file.findMany({
      take: LIMIT_FILES,
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        originalName: true,
        size: true
      }
    });

    console.log({ files });

    if (!files.length) {
      handleError({ body: 'Ошибка получения файлов' });
    }
    // The database type is a bit different from the frontend type
    // Make the array of files compatible with the frontend type FileProps
    const filesWithProps: FileProps[] = files.map(file => ({
      id: file.id,
      originalFileName: file.originalName,
      fileSize: file.size
    }));

    console.log({ filesWithProps: filesWithProps });

    return handleSuccess({ body: filesWithProps });
  } catch (e) {
    console.error(e);

    handleError({ body: 'Ошибка получения файлов' });
  }
};
