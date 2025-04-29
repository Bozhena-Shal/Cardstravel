/*
  Warnings:

  - You are about to drop the `Idea` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Idea";

-- CreateTable
CREATE TABLE "Card" (
    "id" TEXT NOT NULL,
    "nick" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Card_nick_key" ON "Card"("nick");
