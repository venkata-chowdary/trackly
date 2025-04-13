/*
  Warnings:

  - A unique constraint covering the columns `[mailId]` on the table `MailId` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MailId_mailId_key" ON "MailId"("mailId");
