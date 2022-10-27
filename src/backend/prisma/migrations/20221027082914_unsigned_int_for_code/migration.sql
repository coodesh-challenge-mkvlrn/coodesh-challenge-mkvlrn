/*
  Warnings:

  - You are about to alter the column `code` on the `products` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `UnsignedInt`.

*/
-- AlterTable
ALTER TABLE `products` MODIFY `code` INTEGER UNSIGNED NOT NULL;
