/*
  Warnings:

  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Order";

-- CreateTable
CREATE TABLE "orders" (
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

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
