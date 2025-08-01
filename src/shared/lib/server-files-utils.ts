'use server';

import fs from 'node:fs/promises';
import { revalidatePath } from 'next/cache';
import { getUniqName } from '@/shared/lib/string-utils';

export const saveFileWithPath = async (
  file: File,
  path?: string
): Promise<string | null> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer: Uint8Array<ArrayBuffer> = new Uint8Array(arrayBuffer);
    const uniqName = getUniqName(file.name);
    const fileSource = `./public/${path || 'uploads'}/${uniqName}`;

    await fs.writeFile(fileSource, buffer);

    revalidatePath('/');

    return fileSource;
  } catch (e) {
    console.log('error', e);
    return null;
  }
};
