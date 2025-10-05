/*
  Warnings:

  - The `image` column on the `post` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "post" ADD COLUMN     "duration" VARCHAR(512),
ADD COLUMN     "meta_keywords" TEXT[],
ADD COLUMN     "price" VARCHAR(256),
DROP COLUMN "image",
ADD COLUMN     "image" VARCHAR(512)[];
