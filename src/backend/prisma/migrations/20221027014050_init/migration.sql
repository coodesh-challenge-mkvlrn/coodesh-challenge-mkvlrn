-- CreateTable
CREATE TABLE `products` (
    `id` VARCHAR(191) NOT NULL,
    `code` INTEGER NOT NULL,
    `barcode` VARCHAR(191) NOT NULL,
    `status` ENUM('DRAFT', 'TRASH', 'PUBLISHED') NOT NULL DEFAULT 'DRAFT',
    `imported_t` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `url` VARCHAR(191) NOT NULL,
    `product_name` VARCHAR(191) NOT NULL,
    `quantity` VARCHAR(191) NOT NULL,
    `categories` VARCHAR(191) NOT NULL,
    `packaging` VARCHAR(191) NOT NULL,
    `brands` VARCHAR(191) NOT NULL,
    `image_url` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `products_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
