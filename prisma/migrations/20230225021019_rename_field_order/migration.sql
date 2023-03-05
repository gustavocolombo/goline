/*
  Warnings:

  - The `status` column on the `order` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "StatusOrder" AS ENUM ('CANCELED', 'DELIVERED', 'IN_COURSE', 'PAYED', 'AWAITING_PAYMENT');

-- AlterTable
ALTER TABLE "order" DROP COLUMN "status",
ADD COLUMN     "status" "StatusOrder" DEFAULT 'AWAITING_PAYMENT';

-- DropEnum
DROP TYPE "StatusOder";
