/*
  Warnings:

  - You are about to drop the column `region_id` on the `WebsiteTick` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "WebsiteTick" DROP CONSTRAINT "WebsiteTick_region_id_fkey";

-- AlterTable
ALTER TABLE "WebsiteTick" DROP COLUMN "region_id";
