/*
  Warnings:

  - You are about to alter the column `code` on the `products` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `products` MODIFY `code` VARCHAR(191) NOT NULL;
