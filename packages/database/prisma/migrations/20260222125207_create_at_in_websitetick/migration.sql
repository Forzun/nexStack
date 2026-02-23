/*
  Warnings:

  - Added the required column `createdAt` to the `WebsiteTick` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WebsiteTick" ADD COLUMN     "createdAt" TEXT NOT NULL;
