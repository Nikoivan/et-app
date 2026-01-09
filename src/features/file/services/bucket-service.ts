import { s3Client } from '@/shared/lib/s3';
import { Either, left, right } from '@/shared/lib/either';
import Stream, { Readable } from 'node:stream';

type UploadedObjectInfo = {
  etag: string;
  versionId: string | null;
};

const createBucketIfNotExists = async (
  bucketName: string
): Promise<Either<string, { success: true }>> => {
  try {
    const bucketExists = await s3Client.bucketExists(bucketName);
    if (bucketExists) {
      return left('Bucket already exists');
    }
    await s3Client.makeBucket(bucketName);

    return right({ success: true });
  } catch (e) {
    console.warn(e);

    return left('Неизвестная ошибка');
  }
};

export const checkFileExistsInBucket = async ({
  bucketName,
  fileName
}: {
  bucketName: string;
  fileName: string;
}) => {
  try {
    await s3Client.statObject(bucketName, fileName);
  } catch (error) {
    return false;
  }
  return true;
};

export const saveFileInBucket = async ({
  bucketName,
  fileName,
  file
}: {
  bucketName: string;
  fileName: string;
  file: Buffer | Stream.Readable;
}): Promise<Either<string, UploadedObjectInfo>> => {
  try {
    // Create bucket if it doesn't exist
    await createBucketIfNotExists(bucketName);

    // check if file exists
    const fileExists = await checkFileExistsInBucket({
      bucketName,
      fileName
    });

    if (!fileExists) {
      return left('Не удалось сохранить файл в хранилище');
    }

    // Upload image to S3 bucket
    const uploadResult = await s3Client.putObject(bucketName, fileName, file);

    if (!uploadResult) {
      return left('Не удалось сохранить файл в хранилище');
    }

    return right(uploadResult);
  } catch {
    return left('Неизвестная ошибка');
  }
};

const getFileFromBucket = async ({
  bucketName,
  fileName
}: {
  bucketName: string;
  fileName: string;
}): Promise<Either<string, Readable>> => {
  try {
    await s3Client.statObject(bucketName, fileName);
  } catch (error) {
    console.error(error);
    return left('Bucket is not available');
  }
  const bucket = await s3Client.getObject(bucketName, fileName);

  return right(bucket);
};

const deleteFileFromBucket = async ({
  bucketName,
  fileName
}: {
  bucketName: string;
  fileName: string;
}): Promise<Either<{ success: false }, { success: true }>> => {
  try {
    await s3Client.removeObject(bucketName, fileName);
  } catch (error) {
    console.error(error);

    return left({ success: false });
  }

  return right({ success: true });
};

const createPresignedUrlToUpload = async ({
  bucketName,
  fileName,
  expiry = 60 * 60 // 1 hour
}: {
  bucketName: string;
  fileName: string;
  expiry?: number;
}): Promise<Either<string, string>> => {
  try {
    // Create bucket if it doesn't exist
    await createBucketIfNotExists(bucketName);

    const presignedUrl = await s3Client.presignedPutObject(
      bucketName,
      fileName,
      expiry
    );

    return right(presignedUrl);
  } catch (e) {
    return left('Error of presignedPutObject');
  }
};

const createPresignedUrlToDownload = async ({
  bucketName,
  fileName,
  expiry = 60 * 60 // 1 hour
}: {
  bucketName: string;
  fileName: string;
  expiry?: number;
}) => {
  try {
    const presignedUrl = await s3Client.presignedGetObject(
      bucketName,
      fileName,
      expiry
    );

    if (!presignedUrl) {
      return left('Error of presignedGetObject');
    }

    return right(presignedUrl);
  } catch (e) {
    console.error(e);

    return left('Error of presignedGetObject');
  }
};

export const bucketService = {
  getFileFromBucket,
  saveFileInBucket,
  createBucketIfNotExists,
  deleteFileFromBucket,
  createPresignedUrlToUpload,
  createPresignedUrlToDownload
};
