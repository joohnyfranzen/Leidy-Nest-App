/*
  Warnings:

  - You are about to drop the column `code` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `user_from` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `user_to` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the `orders` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `message` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userFromId` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userToId` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_userId_fkey";

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "code",
DROP COLUMN "user_from",
DROP COLUMN "user_to",
ADD COLUMN     "message" TEXT NOT NULL,
ADD COLUMN     "userFromId" INTEGER NOT NULL,
ADD COLUMN     "userToId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "orders";

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" CHAR(70) NOT NULL,
    "type" CHAR(40) NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER,
    "month_date_start" TIMESTAMP(3),
    "month_date_end" TIMESTAMP(3),
    "weekly" BOOLEAN,
    "week_day_start" SMALLINT,
    "week_day_end" SMALLINT,
    "daily" BOOLEAN,
    "weekend" BOOLEAN,
    "holiday" BOOLEAN,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_userFromId_fkey" FOREIGN KEY ("userFromId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_userToId_fkey" FOREIGN KEY ("userToId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
