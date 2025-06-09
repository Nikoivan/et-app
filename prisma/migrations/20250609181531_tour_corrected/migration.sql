/*
  Warnings:

  - You are about to drop the column `mainPhoto` on the `Tour` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Activity" ALTER COLUMN "discount" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Tour" DROP COLUMN "mainPhoto",
ADD COLUMN     "content" TEXT,
ADD COLUMN     "description_text" TEXT,
ADD COLUMN     "main_photo" TEXT,
ADD COLUMN     "start_place" JSONB;
