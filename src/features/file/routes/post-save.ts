import type { NextApiRequest, NextApiResponse } from 'next';
import { PresignedUrlProp } from '@/entities/file/domain';
import { dbClient } from '@/shared/lib/db';
import { handleError, handleSuccess } from '@/shared/lib/response-utils';
import { NextRequest } from 'next/server';

type FileInDBProp = {
  fileNameInBucket: string;
  originalFileName: string;
  fileSize: number;
};

export const postSave = async (req: NextRequest) => {
  try {
    const presignedUrls = (await req.json()) as PresignedUrlProp[];

    // Get the file name in bucket from the database
    const saveFilesInfo = await dbClient.file.createMany({
      data: presignedUrls.map((file: FileInDBProp) => ({
        bucket: process.env.S3_BUCKET_NAME || '',
        fileName: file.fileNameInBucket,
        originalName: file.originalFileName,
        size: file.fileSize
      }))
    });

    if (!saveFilesInfo) {
      return handleError({ error: 'Files not found', status: 404 });
    }

    return handleSuccess({ body: saveFilesInfo });
  } catch (e) {
    console.error(e);

    return handleError({ error: 'Files not found', status: 404 });
  }
};
