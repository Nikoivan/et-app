/*
  Warnings:

  - The primary key for the `Post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `post_author` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Post` table. All the data in the column will be lost.
  - The `id` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `passwordHash` on the `User` table. All the data in the column will be lost.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `post_author_id` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_hash` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_post_author_fkey";

-- AlterTable
ALTER TABLE "Post" DROP CONSTRAINT "Post_pkey",
DROP COLUMN "post_author",
DROP COLUMN "status",
ADD COLUMN     "post_author_id" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "passwordHash",
ADD COLUMN     "password_hash" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- DropEnum
DROP TYPE "PostStatus";

-- DropEnum
DROP TYPE "UserRole";

-- CreateTable
CREATE TABLE "LegacyPosts" (
    "id" SERIAL NOT NULL,
    "post_author_id" INTEGER NOT NULL,
    "post_date" TEXT NOT NULL,
    "guid" TEXT NOT NULL,
    "post_content" TEXT,
    "post_title" TEXT,
    "post_status" VARCHAR(80),
    "post_name" TEXT,
    "post_modified" TEXT,
    "post_parent" INTEGER,

    CONSTRAINT "LegacyPosts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_post_author_id_fkey" FOREIGN KEY ("post_author_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
