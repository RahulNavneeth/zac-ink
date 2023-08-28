/*
  Warnings:

  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "USER_TYPE" AS ENUM ('ADMIN', 'USER');

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_itemId_fkey";

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "type" "USER_TYPE" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "Cart";
