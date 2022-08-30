-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone_user` VARCHAR(191) NOT NULL,
    `company_id_user` VARCHAR(191) NOT NULL,
    `dateborn` VARCHAR(191) NOT NULL,
    `radiogender` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `deleteAt` DATETIME(3) NULL,

    INDEX `users_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `companys` (
    `id` VARCHAR(191) NOT NULL,
    `reasonsocial` VARCHAR(191) NOT NULL,
    `namefantasy` VARCHAR(191) NOT NULL,
    `CNPJ` VARCHAR(191) NOT NULL,
    `phone_company` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `deleteAt` DATETIME(3) NULL,

    INDEX `companys_reasonsocial_idx`(`reasonsocial`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `address` (
    `id` VARCHAR(191) NOT NULL,
    `cep` VARCHAR(191) NOT NULL,
    `adrees` VARCHAR(191) NOT NULL,
    `number_end` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NULL,
    `company_id_address` VARCHAR(191) NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `deleteAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payments` (
    `id` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `companyId` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `observacion` VARCHAR(191) NOT NULL,
    `date_payment` DATETIME(3) NOT NULL,
    `datedue` DATETIME(3) NOT NULL,
    `typepayment` VARCHAR(191) NOT NULL,
    `status` ENUM('PAYABLE', 'PAIDOUT', 'RECEIVABLE', 'RECEIVED') NOT NULL DEFAULT 'PAYABLE',
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `deleteAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_company_id_user_fkey` FOREIGN KEY (`company_id_user`) REFERENCES `companys`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `address` ADD CONSTRAINT `address_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `address` ADD CONSTRAINT `address_company_id_address_fkey` FOREIGN KEY (`company_id_address`) REFERENCES `companys`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
