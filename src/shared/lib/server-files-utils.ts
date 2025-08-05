import fs from 'node:fs/promises';
import { revalidatePath } from 'next/cache';
import { getUniqName } from '@/shared/lib/string-utils';

export const saveFileWithPath = async (
  file: File,
  path?: string
): Promise<string | null> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    console.log('arrayBuffer', arrayBuffer);
    const buffer: Uint8Array<ArrayBuffer> = new Uint8Array(arrayBuffer);
    console.log('buffer', buffer);
    const uniqName = getUniqName(file.name);

    console.log('uniqName', uniqName);
    const fileSource = `/${path || 'images'}/${uniqName}`;

    console.log('fileSource', fileSource);

    await fs.writeFile(`./public${fileSource}`, buffer);

    revalidatePath('/');
    console.log('inFiniesh');
    return fileSource;
  } catch (e) {
    console.error(e);

    return null;
  }
};
