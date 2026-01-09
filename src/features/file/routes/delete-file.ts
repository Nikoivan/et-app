import type { NextApiRequest, NextApiResponse } from 'next';
import { dbClient } from '@/shared/lib/db';
import { bucketService } from '@/features/file/services/bucket-service';
import { handleError, handleSuccess } from '@/shared/lib/response-utils';

export const deletefile = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ message: 'Missing or invalid id' });
    }

    // Get the file name in bucket from the database
    const fileObject = await dbClient.file.findUnique({
      where: {
        id: Number(id)
      },
      select: {
        fileName: true
      }
    });

    if (!fileObject) {
      return handleError({ status: 404, error: 'Not Found' });
    }
    // Delete the file from the bucket
    await bucketService.deleteFileFromBucket({
      bucketName: process.env.S3_BUCKET_NAME || '',
      fileName: fileObject?.fileName
    });
    // Delete the file from the database
    const deletedItem = await dbClient.file.delete({
      where: {
        id: Number(id)
      }
    });

    if (!deletedItem) {
      return handleError({ status: 404, error: 'Not Found' });
    }
    return handleSuccess({ body: deletedItem });
  } catch (e) {
    console.error(e);

    return handleError({ status: 404, error: 'Unknown error occurred' });
  }
};
