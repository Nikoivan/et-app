/*
  Warnings:

  - You are about to drop the column `photosIds` on the `Tour` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tour" DROP COLUMN "photosIds",
ADD COLUMN     "status" TEXT;
