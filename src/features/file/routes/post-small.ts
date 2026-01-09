import fs from 'fs';
import { NextRequest } from 'next/server';
import { v4 } from 'uuid';
import { bucketService } from '@/features/file/services/bucket-service';
import { dbClient } from '@/shared/lib/db';
import { handleError, handleSuccess } from '@/shared/lib/response-utils';

const bucketName = process.env.S3_BUCKET_NAME || '';

export const postSmall = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const files = [...formData.values().filter(item => item instanceof File)];

    await Promise.all(
      files.map(async fileObject => {
        const file = fs.createReadStream(fileObject?.webkitRelativePath);
        // generate unique file name
        const fileName = `${v4()}-${fileObject?.name}`;
        // Save file to S3 bucket and save file info to database concurrently
        await bucketService.saveFileInBucket({
          bucketName,
          fileName,
          file
        });
        // save file info to database
        await dbClient.file.create({
          data: {
            bucket: bucketName,
            fileName,
            originalName: fileObject?.name ?? fileName,
            size: fileObject?.size ?? 0
          }
        });
      })
    );

    return handleSuccess({ body: 'Files were uploaded successfully' });
  } catch (error) {
    console.error(error);

    return handleError({ error });
  }
};
