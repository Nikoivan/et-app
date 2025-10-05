/*
  Warnings:

  - You are about to drop the column `duration` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "post" DROP COLUMN "duration",
DROP COLUMN "price",
ADD COLUMN     "meta_duration" VARCHAR(512),
ADD COLUMN     "meta_price" VARCHAR(256);
