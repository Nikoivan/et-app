/*
  Warnings:

  - You are about to alter the column `link` on the `post` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(512)`.
  - You are about to alter the column `meta_descriptions` on the `post` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(512)`.
  - You are about to alter the column `meta_title` on the `post` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(512)`.
  - You are about to alter the column `pubDate` on the `post` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(128)`.
  - A unique constraint covering the columns `[slug]` on the table `post` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "post" ALTER COLUMN "link" SET DATA TYPE VARCHAR(512),
ALTER COLUMN "meta_descriptions" SET DATA TYPE VARCHAR(512),
ALTER COLUMN "meta_title" SET DATA TYPE VARCHAR(512),
ALTER COLUMN "pubDate" SET DATA TYPE VARCHAR(128);

-- CreateIndex
CREATE UNIQUE INDEX "post_route_key" ON "post"("route");
