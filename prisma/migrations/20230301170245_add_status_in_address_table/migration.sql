/*
  Warnings:

  - Added the required column `delivery_option` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatusAddress" AS ENUM ('ACTIVE', 'INACTIVE', 'DEFAULT', 'DELETED');

-- AlterTable
ALTER TABLE "address" ADD COLUMN     "status" "StatusAddress" DEFAULT 'DEFAULT';

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "delivery_option" "DeliveryOption" NOT NULL;
