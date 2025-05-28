/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_post_author_id_fkey";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "salt" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_login_key" ON "user"("login");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_post_author_id_fkey" FOREIGN KEY ("post_author_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
