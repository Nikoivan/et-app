/*
  Warnings:

  - You are about to drop the column `tour_author_id` on the `Tour` table. All the data in the column will be lost.
  - Added the required column `author_id` to the `Tour` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `role` on the `user` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Tour" DROP CONSTRAINT "Tour_tour_author_id_fkey";

-- AlterTable
ALTER TABLE "Tour" DROP COLUMN "tour_author_id",
ADD COLUMN     "author_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "role",
ADD COLUMN     "role" VARCHAR(80) NOT NULL;

-- DropEnum
DROP TYPE "Permissions";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" VARCHAR(80) NOT NULL,
    "places" INTEGER,
    "tour_id" INTEGER,
    "activity_id" INTEGER,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "author_id" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(180) NOT NULL,
    "description" TEXT NOT NULL,
    "status" VARCHAR(80) NOT NULL,
    "author_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "start_time" TIMESTAMP NOT NULL,
    "finish_time" TIMESTAMP NOT NULL,
    "places" INTEGER NOT NULL,
    "participants" INTEGER[],
    "group_price" INTEGER NOT NULL,
    "person_price" INTEGER NOT NULL,
    "type" VARCHAR(80) NOT NULL,
    "tour_id" INTEGER NOT NULL,
    "tags" TEXT[],
    "categories" TEXT[],
    "discount" INTEGER NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_orderId_key" ON "Transaction"("orderId");

-- AddForeignKey
ALTER TABLE "Tour" ADD CONSTRAINT "Tour_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_tour_id_fkey" FOREIGN KEY ("tour_id") REFERENCES "Tour"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "Activity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_tour_id_fkey" FOREIGN KEY ("tour_id") REFERENCES "Tour"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
