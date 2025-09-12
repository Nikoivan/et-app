/*
  Warnings:

  - You are about to alter the column `title` on the `post` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(180)`.
  - You are about to alter the column `salt` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(800)`.
  - You are about to drop the `legacy_post` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guid` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `route` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tour" ADD COLUMN     "meta_description" TEXT,
ADD COLUMN     "meta_keywords" TEXT,
ADD COLUMN     "meta_title" TEXT;

-- AlterTable
ALTER TABLE "post" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "guid" VARCHAR(80) NOT NULL,
ADD COLUMN     "image" VARCHAR(512) NOT NULL,
ADD COLUMN     "link" TEXT,
ADD COLUMN     "meta_descriptions" TEXT,
ADD COLUMN     "meta_title" TEXT,
ADD COLUMN     "pubDate" TEXT,
ADD COLUMN     "route" VARCHAR(512) NOT NULL,
ADD COLUMN     "status" VARCHAR(20) NOT NULL,
ADD COLUMN     "type" VARCHAR(20) NOT NULL,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(180);

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "salt" SET DATA TYPE VARCHAR(800);

-- DropTable
DROP TABLE "legacy_post";
