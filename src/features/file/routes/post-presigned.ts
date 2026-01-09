import { nanoid } from 'nanoid';
import { PresignedUrlProp, ShortFileProp } from '@/entities/file/domain';
import { bucketService } from '@/features/file/services/bucket-service';
import { handleError, handleSuccess } from '@/shared/lib/response-utils';
import { NextRequest } from 'next/server';

const bucketName = process.env.S3_BUCKET_NAME || '';
const expiry = 60 * 60;

export const postPresigned = async (req: NextRequest) => {
  try {
    // get the files from the request body
    const files = (await req.json()) as ShortFileProp[];

    if (!files?.length) {
      return handleError({ error: 'No files to upload' });
    }

    const presignedUrls = [] as PresignedUrlProp[];

    if (files?.length) {
      // use Promise.all to get all the presigned urls in parallel
      await Promise.all(
        // loop through the files
        files.map(async file => {
          const fileName = `${nanoid(5)}-${file?.originalFileName}`;

          // get presigned url using s3 sdk
          const url = await bucketService.createPresignedUrlToUpload({
            bucketName,
            fileName,
            expiry
          });

          if (url.type === 'left') {
            return handleError({ error: 'Error of create presigned url' });
          }

          // add presigned url to the list
          presignedUrls.push({
            fileNameInBucket: fileName,
            originalFileName: file.originalFileName,
            fileSize: file.fileSize,
            url: url.value
          });
        })
      );
    }

    return handleSuccess({ body: presignedUrls });
  } catch (e) {
    console.error(e);

    return handleError({ error: 'Unknown upload error' });
  }
};
