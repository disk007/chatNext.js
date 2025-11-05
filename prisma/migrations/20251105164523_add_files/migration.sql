/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `ChatRoom` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ChatRoom" ADD COLUMN     "files" TEXT;

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "files" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "ChatRoom_code_key" ON "ChatRoom"("code");
