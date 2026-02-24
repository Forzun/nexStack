/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Website` table. All the data in the column will be lost.
  - Added the required column `time_added` to the `Website` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Website" DROP COLUMN "createdAt",
ADD COLUMN     "time_added" TIMESTAMP(3) NOT NULL;
