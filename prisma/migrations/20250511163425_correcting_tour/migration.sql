/*
  Warnings:

  - Made the column `price` on table `Tour` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Tour" ALTER COLUMN "rating" DROP NOT NULL,
ALTER COLUMN "rating" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "price" SET NOT NULL;
