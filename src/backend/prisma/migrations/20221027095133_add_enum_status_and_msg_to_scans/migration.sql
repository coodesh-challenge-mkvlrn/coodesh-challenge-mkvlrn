/*
  Warnings:

  - You are about to alter the column `complete` on the `scans` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum("scans_complete")`.

*/
-- AlterTable
ALTER TABLE `products` MODIFY `status` ENUM('DRAFT', 'TRASH', 'PUBLISHED') NOT NULL DEFAULT 'PUBLISHED';

-- AlterTable
ALTER TABLE `scans` ADD COLUMN `message` TEXT NULL,
    MODIFY `complete` ENUM('IN_PROGRESS', 'FAILED', 'SUCCESS') NOT NULL DEFAULT 'IN_PROGRESS';
