-- CreateEnum
CREATE TYPE "MailStatus" AS ENUM ('pending', 'processing', 'completed', 'error');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "imageUrl" TEXT,
    "credits" INTEGER NOT NULL DEFAULT 30,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "userRefId" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "jobId" TEXT,
    "platform" TEXT NOT NULL,
    "location" TEXT,
    "status" TEXT[],
    "notes" TEXT,
    "jobType" TEXT NOT NULL,
    "appliedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "mailRefId" TEXT NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPreferences" (
    "id" TEXT NOT NULL,
    "userRefId" TEXT NOT NULL,
    "syncFrequency" INTEGER NOT NULL DEFAULT 6,
    "emailNotifications" BOOLEAN NOT NULL DEFAULT true,
    "whatsAppNotifications" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPreferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MailIdLog" (
    "id" TEXT NOT NULL,
    "mailId" TEXT NOT NULL,
    "threadId" TEXT NOT NULL,
    "status" "MailStatus" NOT NULL DEFAULT 'pending',
    "userRefId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MailIdLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkUserId_key" ON "User"("clerkUserId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserPreferences_userRefId_key" ON "UserPreferences"("userRefId");

-- CreateIndex
CREATE UNIQUE INDEX "MailIdLog_mailId_key" ON "MailIdLog"("mailId");

-- CreateIndex
CREATE INDEX "MailIdLog_status_idx" ON "MailIdLog"("status");

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_userRefId_fkey" FOREIGN KEY ("userRefId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_mailRefId_fkey" FOREIGN KEY ("mailRefId") REFERENCES "MailIdLog"("mailId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPreferences" ADD CONSTRAINT "UserPreferences_userRefId_fkey" FOREIGN KEY ("userRefId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MailIdLog" ADD CONSTRAINT "MailIdLog_userRefId_fkey" FOREIGN KEY ("userRefId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
