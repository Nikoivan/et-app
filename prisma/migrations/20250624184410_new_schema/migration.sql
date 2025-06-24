/*
  Warnings:

  - You are about to drop the column `main_photo` on the `Tour` table. All the data in the column will be lost.
  - Added the required column `main_photo_id` to the `Tour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photoId` to the `Tour` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tour" DROP COLUMN "main_photo",
ADD COLUMN     "main_photo_id" INTEGER NOT NULL,
ADD COLUMN     "photoId" INTEGER NOT NULL;
