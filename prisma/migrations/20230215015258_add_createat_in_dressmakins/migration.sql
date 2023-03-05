/*
  Warnings:

  - You are about to drop the `order` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_address_id_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_dressmaking_id_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_users_id_fkey";

-- AlterTable
ALTER TABLE "dressmaking" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "order";
