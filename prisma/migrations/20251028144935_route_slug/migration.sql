/*
  Warnings:

  - You are about to drop the column `route` on the `post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Tour` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Tour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "post_route_key";

-- AlterTable
ALTER TABLE "Tour" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "post" DROP COLUMN "route",
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Tour_slug_key" ON "Tour"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "post_slug_key" ON "post"("slug");
