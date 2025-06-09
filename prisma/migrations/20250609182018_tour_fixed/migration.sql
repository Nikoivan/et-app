/*
  Warnings:

  - Made the column `content` on table `Tour` required. This step will fail if there are existing NULL values in that column.
  - Made the column `main_photo` on table `Tour` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Tour" ALTER COLUMN "content" SET NOT NULL,
ALTER COLUMN "main_photo" SET NOT NULL;
