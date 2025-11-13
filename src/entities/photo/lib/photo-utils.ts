import { saveFileWithPath } from '@/shared/lib/server-files-utils';
import { PhotoEntity } from '@/entities/photo/domain';
import { getFileBySource } from '@/shared/lib/file-utils';
import { photoTypeguards } from '@/entities/photo';

const savePhoto = (photo: File): Promise<string | null> => {
  return saveFileWithPath(photo, 'images');
};

export const getPhotoEntity = async ({
  file,
  title,
  ...rest
}: {
  file: File;
  authorId: number;
  keywords: string[];
  title?: string;
}): Promise<Omit<PhotoEntity, 'id'> | null> => {
  const source = await savePhoto(file);

  if (!source) {
    return null;
  }

  return {
    title: title || file.name,
    source,
    fileName: file.name,
    ...rest
  };
};

const getFileByPhotoEntity = (
  photo?: unknown
): Promise<File | undefined> | undefined => {
  if (!photo || !photoTypeguards.isPhotoEntity(photo)) return undefined;

  return getFileBySource(photo.source, photo.fileName);
};

export const photoUtils = { getPhotoEntity, getFileByPhotoEntity };
