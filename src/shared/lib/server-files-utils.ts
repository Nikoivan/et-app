import fs from 'node:fs/promises';
import { File } from 'formdata-node';
import { revalidatePath } from 'next/cache';
import { getUniqName } from '@/shared/lib/string-utils';

export const saveFileWithPath = async (
  file: File,
  path?: string
): Promise<string | null> => {
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const uniqName = getUniqName(file.name);
    const fileSource = `/${path || 'images'}/${uniqName}`;

    await fs.writeFile(`./public${fileSource}`, buffer);

    revalidatePath('/');

    return fileSource;
  } catch (e) {
    console.error(e);

    return null;
  }
};
