/*
  Warnings:

  - Added the required column `threadId` to the `MailId` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MailId" ADD COLUMN     "threadId" TEXT NOT NULL;
