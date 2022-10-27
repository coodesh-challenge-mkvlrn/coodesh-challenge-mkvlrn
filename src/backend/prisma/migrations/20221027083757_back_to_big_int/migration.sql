/*
  Warnings:

  - You are about to alter the column `code` on the `products` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `BigInt`.

*/
-- AlterTable
ALTER TABLE `products` MODIFY `code` BIGINT NOT NULL;
