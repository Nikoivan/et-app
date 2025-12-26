/*
  Warnings:

  - You are about to drop the `LegacyPosts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'GUIDE', 'CONTRIBUTOR', 'ADMIN', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "Permissions" AS ENUM ('READ', 'CREATE', 'UPDATE', 'DELETE', 'ALL');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_post_author_id_fkey";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "role" "Role" NOT NULL;

-- DropTable
DROP TABLE "LegacyPosts";

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "post_author_id" INTEGER NOT NULL,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "legacy_post" (
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

    CONSTRAINT "legacy_post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "estimation" JSONB NOT NULL,
    "estimate_value" INTEGER NOT NULL,
    "author_id" INTEGER NOT NULL,
    "tourId" INTEGER,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tour" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(180) NOT NULL,
    "description" TEXT NOT NULL,
    "mainPhoto" TEXT NOT NULL,
    "duration" VARCHAR(180) NOT NULL,
    "tour_author_id" INTEGER NOT NULL,
    "photos" TEXT[],
    "rating" INTEGER NOT NULL,

    CONSTRAINT "Tour_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_post_author_id_fkey" FOREIGN KEY ("post_author_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tour" ADD CONSTRAINT "Tour_tour_author_id_fkey" FOREIGN KEY ("tour_author_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
