/*
  Warnings:

  - You are about to drop the column `complete` on the `scans` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `scans` DROP COLUMN `complete`,
    ADD COLUMN `status` ENUM('IN_PROGRESS', 'FAILED', 'SUCCESS') NOT NULL DEFAULT 'IN_PROGRESS';
