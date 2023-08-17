/*
  Warnings:

  - Added the required column `password_hash` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_salt` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `password_hash` VARCHAR(191) NOT NULL,
    ADD COLUMN `password_salt` VARCHAR(191) NOT NULL;
